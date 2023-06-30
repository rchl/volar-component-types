export type ComponentDefinition = {
    filePath: string;
    pascalName: string;
    wrapComponent?: boolean;
};

type Range = readonly [number, number];

export type RangeMapping = readonly [Range, Range];
