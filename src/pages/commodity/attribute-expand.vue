<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
    	<Row class="expand-row">
            <Col span="4">
                <span class="expand-key">药品类型</span>
            </Col>
            <Col span="4">
                <span class="expand-key">前台显示 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">选择输入</span>
            </Col>
            <Col span="4">
                <span class="expand-key">字符 </span>
            </Col>
            <Col span="4">
                <span class="expand-key">必填项 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">属性描述 </span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="4">
                <span class="expand-key">剂型</span>
            </Col>
            <Col span="4">
                <span class="expand-key">前台显示 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">选择输入</span>
            </Col>
            <Col span="4">
                <span class="expand-key">字符 </span>
            </Col>
            <Col span="4">
                <span class="expand-key">必填项 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">属性描述 </span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="4">
                <span class="expand-key">毛重</span>
            </Col>
            <Col span="4">
                <span class="expand-key">前台显示 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">手工输入 </span>
            </Col>
            <Col span="4">
                <span class="expand-key">字符 </span>
            </Col>
            <Col span="4">
                <span class="expand-key">非必填 </span><Icon type="close-circled" size="16" color="red"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">属性描述 </span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="4">
                <span class="expand-key">规格</span>
            </Col>
            <Col span="4">
                <span class="expand-key">前台显示 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">手工输入 </span>
            </Col>
            <Col span="4">
                <span class="expand-key">数字</span>
            </Col>
            <Col span="4">
                <span class="expand-key">必填项 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">属性描述 </span>
            </Col>
        </Row>
        <Row class="expand-row">
        	<Col span="4">
                <span class="expand-key">成分</span>
            </Col>
            <Col span="4">
                <span class="expand-key">前台显示 </span><Icon type="close-circled" size="16" color="red"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">手工输入</span>
            </Col>
            <Col span="4">
                <span class="expand-key">数字</span>
            </Col>
            <Col span="4">
                <span class="expand-key">必填项 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">属性描述 </span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="4">
                <span class="expand-key">性状</span>
            </Col>
            <Col span="4">
                <span class="expand-key">前台显示 </span><Icon type="close-circled" size="16" color="red"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">手工输入</span>
            </Col>
            <Col span="4">
                <span class="expand-key">数字 </span>
            </Col>
            <Col span="4">
                <span class="expand-key">必填项 </span><Icon type="checkmark-circled" size="16" color="green"></Icon>
            </Col>
            <Col span="4">
                <span class="expand-key">属性描述 </span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>