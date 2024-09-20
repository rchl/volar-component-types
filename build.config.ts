import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        {
            name: 'main',
            input: './src/index.ts',
        },
        {
            builder: 'mkdist',
            input: './src/templates/',
            outDir: './dist/templates',
        },
    ],
    clean: true,
    outDir: './dist',
    declaration: true,
    externals: [
        '@nuxt/types',
        'typescript',
        'vue',
        'vue-client-only',
        'vue-router',
    ],
    rollup: {
        emitCJS: true,
    },
});
