<template>
    <div>
        <nuxt-link to="/">Hello Nuxt</nuxt-link>
        <my-component :custom-prop="1" class="foo" />
        <my-component-no-props class="foo" />
        <my-model v-model="foo" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            foo: 1,
        };
    },
});
</script>
