import path from 'upath';
import type { ComponentDefinition } from './types';

const TEMPLATE = `// @ts-nocheck Required for tsc which does not understand .vue imports (should not be needed with vetur 2.x)
import 'vue';

declare module 'vue' {
    export interface GlobalComponents {
/*IMPORTS*/
    }
}
`;

export function generateComponentTypes(components: ComponentDefinition[], rootDir: string): string {
    const definitions = components
        .map(component => `${component.pascalName}: typeof import('./${path.relative(rootDir, component.filePath)}').${component.exportName};`)
        .join('\n');

    return TEMPLATE.replace('/*IMPORTS*/', indent(8, definitions));
}

function indent(level: number, code: string): string {
    return code
        .split('\n')
        .map(line => ''.padStart(level) + line)
        .join('\n');
}
