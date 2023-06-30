import type { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
    rootDir: __dirname,
    telemetry: false,
    components: true,
    buildModules: [
        '../dist/module.mjs',
    ],
    volarComponentTypes: {
        debug: true,
    },
};

export default config;
