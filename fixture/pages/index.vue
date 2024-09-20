<template>
    <div class="custom">
        <my-component :custom-prop="1" />
        <!-- <my-component class="foo" /> -->
        <my-component-no-props class="custom" />
        <my-model v-model="foo" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            foo: 1,
        };
    },
});
</script>
