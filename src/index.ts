import path from 'upath';
import type { Module } from '@nuxt/types';
import type { ComponentDefinition } from './types';
import { generateComponentTypes } from './generate';
import './types/nuxt.d.ts';

export default <Module> function VolarComponentTypesModule() {
    const { nuxt } = this;

    const templatesDir = path.join(__dirname, 'templates');
    const outputDir = path.join(this.options.buildDir, 'types');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nuxt.hook('components:extend', (components: ComponentDefinition[]) => {
        // Auto-discovered components.
        const definitions = components
            .map(component => ({
                filePath: component.filePath,
                pascalName: component.pascalName,
                exportName: 'default',
            }));

        // Lazy* variants of components.
        definitions.push(
            ...definitions.map(component => ({ ...component, pascalName: `Lazy${component.pascalName}` })),
        );

        const code = generateComponentTypes(definitions, outputDir);

        this.addTemplate({
            src: path.resolve(templatesDir, 'components.d.ts.ejs'),
            fileName: path.join(outputDir, 'components.d.ts'),
            options: { code },
        });
    });
};
