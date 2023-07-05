<template>
    <div class="custom">
        <nuxt-link to="/">Hello Nuxt</nuxt-link>
        <my-component :custom-prop="1" class="foo" />
        <my-component-no-props class="custom" />
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

<style lang="scss">
.custom {
    color: blue;
}
</style>
