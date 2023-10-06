import path from 'upath';
import type { Module } from '@nuxt/types';
import type { ComponentDefinition } from './types';
import { generateComponentTypes } from './generate';

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
