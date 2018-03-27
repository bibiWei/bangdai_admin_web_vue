<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <br/>
        <Tabs value="">
          <TabPane label="SKU" icon ="clipboard" name="tab1">
          </TabPane>
          <TabPane label="SKU2" icon ="clipboard" name="">
          </TabPane>
          <TabPane label="SKU3" icon ="clipboard" name="">
          </TabPane>
        </Tabs>
    </div>
</template>
<script>

    export default {
        props: {
            row: Object
        }
    };
</script>
