module.exports = {
    root: true,
    extends: [
        'eslint-config-rchl-vue',
        'eslint-config-rchl-typescript',
    ],
    ignorePatterns: [
        '!.eslintrc.js',
        '!.release-it.cjs',
        'dist/**/*',
        'src/module/templates/*.*',
    ],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
        {
            files: ['*.vue'],
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
};
