import path from 'upath';
import { parseLocationMappings } from './parse';
import type { ComponentDefinition, RangeMapping } from './types';

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

export function generateComponentTypes(components: ComponentDefinition[], rootDir: string): [string, RangeMapping[]] {
    const definitions = components
        .map(component => `${component.pascalName}: typeof import('./${path.relative(rootDir, component.filePath)}').${component.exportName};`)
        .join('\n');

    const code = TEMPLATE.replace('/*IMPORTS*/', indent(8, definitions));
    const mappings = parseLocationMappings(code);

    return [code, mappings];
}
