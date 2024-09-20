# volar-component-types

A module that provides Volar types for auto-discovered components in Nuxt 2.

## Introduction

Nuxt 2, like Nuxt 3, [auto-discovers components](https://v2.nuxt.com/docs/features/component-discovery) but unlike Nuxt 3, it doesn't automatically generate types for those components so [Vue Language Tools (formerly Volar)](https://github.com/vuejs/language-tools) is not able to type-check those unless they are explicitly imported (which defeats the purpose of auto-discovering). This module takes care of registering types for all auto-discovered components so that Volar is aware of those and can type-check them. Does that by generating a plain type definition file with extended types for `GlobalComponents` interface.

## Setup

1. Install `volar-component-types` package:
   ```sh
   # Npm
   npm i -D volar-component-types
   # Yarn
   yarn add -D volar-component-types
   ```
2. Add the module to `buildModules` in `nuxt.config.js`.
   ```js
   export default {
       buildModules: [
          'volar-component-types/nuxt',
       ],
   }
   ```
3. Set following options in `tsconfig.json`:
   ```jsonc
   {
      // other options...
      "include": [
         "./nuxt/types/components.d.ts",
         "./nuxt.config.ts",
         // Also make sure that all pages and components are included, for example:
         "./pages/**/*",
         "./components/**/*",
         // etc...
      ],
      "vueCompilerOptions": {
        "target": 2.7,
        "strictTemplates": true,
      }
   }
   ```
4. Extend `types` array in `tsconfing.json` to augment Nuxt Config with module configuration types.
   ```jsonc
   {
      "compilerOptions": {
         "types": [
            "volar-component-types",
         ]
      }
   }
   ```
5. Run `nuxt dev`.
