<template>
    <div>{{ msg }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    model: {
        prop: 'msg',
        event: 'update',
    },
    props: {
        msg: {
            type: Number,
            required: true,
        },
    },
});
</script>
