<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Table size='small' highlight-row ref="currentRowTable" :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>

    export default {
        props: {
            row: Object,
            columns1: Array,
            data1:Array

        }
    };
</script>
