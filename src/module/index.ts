import path from 'upath';
import type { Module } from '@nuxt/types';
import { parseLocationMappings } from './parse';
import type { ComponentDefinition, RangeMapping } from './types';

type ModuleConfiguration = {
    debug: boolean;
};

declare module '@nuxt/types' {
    interface NuxtOptions {
        volarComponentTypes?: Partial<ModuleConfiguration>;
    }
}

export default <Module<ModuleConfiguration>> function VolarComponentTypesModule() {
    const { nuxt, options } = this;
    const moduleOptions = options.volarComponentTypes ?? {};

    nuxt.hook('components:extend', (components: ComponentDefinition[]) => {
        // Auto-discovered components.
        const data: ComponentDefinition[] = components.map(component => {
            return {
                filePath: component.filePath,
                pascalName: component.pascalName,
                exportName: 'default',
            };
        });
        // Built-in components.
        // data.push(...['NuxtLink', 'Transition'].map(pascalName => {
        //     return {
        //         filePath: path.resolve(this.options.buildDir, 'components', 'volar-nuxt-types'),
        //         pascalName,
        //         exportName: pascalName,
        //     };
        // }));
        // Lazy* variants of components.
        data.push(...data.map(component => ({ ...component, pascalName: `Lazy${component.pascalName}` })));

        const [code, mappings] = generateComponentTypes(data, this.options.rootDir);

        this.addTemplate({
            src: path.resolve(__dirname, 'templates', 'component-data.ejs'),
            fileName: './components/volar-component-data.json',
            options: { code, mappings },
        });
        this.addTemplate({
            src: path.resolve(__dirname, 'templates', 'nuxt-types.d.ts'),
            fileName: './components/volar-nuxt-types.d.ts',
            options: { code, mappings },
        });

        if (moduleOptions.debug) {
            this.addTemplate({
                src: path.resolve(__dirname, 'templates', 'component-types.d.ts.ejs'),
                fileName: path.resolve(this.options.rootDir, 'volar-component-types.d.ts'),
                options: { code },
            });
        }
    });
};

const TEMPLATE = `import 'vue';

declare module 'vue' {
    export interface GlobalComponents {
/*IMPORTS*/
    }
}
`;

function indent(level: number, code: string): string {
    return code
        .split('\n')
        .map(line => ''.padStart(level) + line)
        .join('\n');
}

function generateComponentTypes(components: ComponentDefinition[], rootDir: string): [string, RangeMapping[]] {
    const definitions = components
        .map(component => `${component.pascalName}: typeof import('./${path.relative(rootDir, component.filePath)}').${component.exportName};`)
        .join('\n');

    const code = TEMPLATE.replace('/*IMPORTS*/', indent(8, definitions));
    const mappings = parseLocationMappings(code);

    return [code, mappings];
}
