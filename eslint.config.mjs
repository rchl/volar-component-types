import base from 'eslint-config-rchl-base';
import typescript from 'eslint-config-rchl-typescript';
import vue from 'eslint-config-rchl-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            'dist/',
            '**/.nuxt/',
            'src/module/templates/*.ejs',
            '**/*.vue.js',
            '**/*.vue.ts',
        ],
    },
    ...base,
    ...typescript,
    ...vue,
];
