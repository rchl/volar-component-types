import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        {
            name: 'volar',
            input: './src/volar/volar.ts',
        },
        {
            name: 'module',
            input: './src/module/index.ts',
        },
        {
            builder: 'mkdist',
            input: './src/module/templates/',
            outDir: './dist/templates',
        },
    ],
    clean: true,
    outDir: './dist',
    declaration: true,
    externals: [
        '@nuxt/types',
        '@volar/language-core',
        'typescript',
    ],
    rollup: {
        emitCJS: true,
    },
});
