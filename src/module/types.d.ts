import type { VirtualFile } from '@volar/language-core';

export type ComponentDefinition = {
    filePath: string;
    pascalName: string;
    exportName: string;
};

type Range = readonly [number, number];

export type RangeMapping = readonly [Range, Range];

type CodeMapping = {
    code: string;
    mappings: RangeMapping[];
};

type MirrorBehaviorMapping = VirtualFile['mirrorBehaviorMappings'];

