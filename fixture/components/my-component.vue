<template>
    <div>hi from my component</div>
</template>

<script>
export default {
    props: {
        customProp: {
            type: Number,
            required: true,
        },
    },
};
</script>
