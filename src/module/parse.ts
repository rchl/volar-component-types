import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { RangeMapping } from './types';

export function parseLocationMappings(code: string): RangeMapping[] {
    const ast = parse(code, {
        sourceType: 'module',
        plugins: [
            ['typescript', { dts: true }],
        ],
    });

    const mappings: RangeMapping[] = [];

    traverse(ast, {
        TSInterfaceDeclaration(path) {
            const declarationNode = path.node;
            if (declarationNode.id.name !== 'GlobalComponents') {
                return;
            }
            for (const propertyNode of declarationNode.body.body) {
                if (propertyNode.type !== 'TSPropertySignature' || propertyNode.key.type !== 'Identifier') {
                    continue;
                }
                const keyNode = propertyNode.key;
                if (!keyNode.start || !keyNode.end) {
                    continue;
                }
                const sourceRange = [keyNode.start, keyNode.end] as const;
                if (!propertyNode.typeAnnotation) {
                    continue;
                }
                const typeAnnotationNode = propertyNode.typeAnnotation.typeAnnotation;
                if (typeAnnotationNode.type !== 'TSTypeQuery') {
                    continue;
                }
                const { exprName } = typeAnnotationNode;
                if (exprName.type !== 'TSImportType') {
                    continue;
                }
                const { argument } = exprName;
                if (!argument.start || !argument.end) {
                    continue;
                }
                const targetRange = [argument.start, argument.end] as const;
                mappings.push([sourceRange, targetRange]);
            }
        },
    });

    return mappings;
}
