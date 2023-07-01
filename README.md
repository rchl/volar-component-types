# volar-component-types

A module that provides Volar types for auto-discovered components in Nuxt 2.

## Introduction

Nuxt 2 [auto-discovers components](https://v2.nuxt.com/docs/features/component-discovery) like Nuxt 3 but unlike Nuxt 3, it doesn't automatically generate types for those components so [Vue Language Tools (formerly Volar)](https://github.com/vuejs/language-tools) is not able to type-check those unless they are explicitly imported (which defeats the purpose of auto-discovering). This module takes care of registering types for all auto-discovered components so that Volar is aware of those and can type-check them. Instead of generating a plain type definition file, it uses an experimental Volar feature (`experimentalAdditionalLanguageModules`) for that so that "Go to definition" in also supported properly in the editor (not even Nuxt 3 supports that).

## Setup

1. Add the module to `buildModules` in `nuxt.config.js`.
   ```js
   export default {
       buildModules: [
          'volar-component-types/nuxt',
       ],
   }
   ```
2. Set following options in `tsconfig.json`:
   ```jsonc
   {
      // other options...
      "vueCompilerOptions": {
        "target": 2.7,
        "strictTemplates": true,
        "experimentalAdditionalLanguageModules": ["volar-component-types"],
      }
   }
   ```
3. Extend `types` array in `tsconfing.json` to augment Nuxt Config with module configuration types.
   ```jsonc
   {
      "compilerOptions": {
         "types": [
            "volar-component-types/nuxt",
         ]
      }
   }
   ```
4. Run `nuxt dev`.

This module generates a `./.nuxt/components/volar-component-data.json` file relative to the `tsconfig.json` and the Volar Language Module expects to find it there. The location of the generated file is currently not configurable.
