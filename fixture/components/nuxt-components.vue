<template>
    <div>
        <client-only>client only</client-only>
        <nuxt />
        <nuxt-child />
        <nuxt-link to="/">Hello Nuxt</nuxt-link>
        <my-component :custom-prop="1" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
