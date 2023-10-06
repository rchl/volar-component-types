<template>
    <div>hi from my component</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        customProp: {
            type: Number,
            required: true,
        },
    },
});
</script>
