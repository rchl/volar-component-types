export type ComponentDefinition = {
    filePath: string;
    pascalName: string;
    exportName: string;
};

type Range = readonly [number, number];

export type RangeMapping = readonly [Range, Range];
