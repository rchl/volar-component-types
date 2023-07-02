<template>
    <div></div>
</template>

<script>
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
