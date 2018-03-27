<style>

</style>
<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>商品类型</BreadcrumbItem>
    </Breadcrumb>
      <Form :model="formTypeSearch" :label-width="80" style="margin-top: 20px" ref="formTypeSearch" >
        <Row>
          <Col span="20">
            <Col span="8">
            <FormItem label="类型名称">
              <Input type="text" v-model="formTypeSearch.typeName" placeholder="请输入类型名称"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="属性模板">
              <Select v-model="formTypeSearch.attributeTemplate" placeholder="请选择扩展属性模板">
                <Option value="SYS">通用商品属性模板</Option>
                <Option value="BIZ">定制商品属性模板</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="SKU模板">
              <Select v-model="formTypeSearch.skuTemplate" placeholder="请选择SKU模板">
                <Option value="SYS">SKY模板1</Option>
                <Option value="BIZ">SKY模板2</Option>
              </Select>
            </FormItem>
            </Col>
          </Col>
          <Col span="4">
            <Button type="ghost" style="float:right;margin-left: 10px;" @click="doReset('formTypeSearch')">重置</Button>
            <Button type="primary" style="float:right;" @click="search()">查询</Button>
          </Col>
          <Col span="24">
            <Button type="primary" style="float:right;margin-bottom: 10px;" @click="show()">新增</Button>
          </Col>
        </Row>
      </Form>
      <Modal
        title="商品类型信息"
        v-model="showTypeInfo"
        :mask-closable="true"
        :loading="true"
        width="760px">
        <Form ref="formType" :model="formType" :rules="ruleType" :label-width="120">
        <Row :gutter="10">
        <Col span="10">
          <FormItem label="类型名称" prop="typeName">
            <Input type="text" v-model="formType.typeName" placeholder="请输入类型名称"></Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="扩展属性模板" prop="templateType">
          <Select v-model="formType.extTemplateId" placeholder="请选择扩展属性模板">
            <Option value="SYS">通用商品属性模板</Option>
            <Option value="BIZ">定制商品属性模板</Option>
          </Select>
          </FormItem>
        </Col>
        </Row>
        <Row :gutter="10">
        <Col span="10">
          <FormItem label="商品SKU模板" prop="typeName">
          <Select v-model="formType.skuTemplateId" placeholder="请选择SKU模板">
            <Option value="SYS">SKY模板1</Option>
            <Option value="BIZ">SKY模板2</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="所属业务范围" prop="businessId">
          <Select v-model="formType.businessId" placeholder="请选择所属业务范围">
            <Option value="1">药品</Option>
            <Option value="2">保健品</Option>
            <Option value="3">医疗器械</Option>
          </Select>
          </FormItem>
        </Col>
        </Row>
        <Row :gutter="10">
        <Col span="10">
          <FormItem label="监管分类限制" prop="supervisionId">
          <RadioGroup v-model="formType.supervisionId" type="button">
            <Radio label="1">有</Radio>
            <Radio label="0">无</Radio>
          </RadioGroup>
          </FormItem>
        </Col>
        <Col span="10">
        <FormItem label="销售区域限制" prop="saleableScope">
          <RadioGroup v-model="formType.saleableScope" type="button">
            <Radio label="1">有</Radio>
            <Radio label="0">无</Radio>
          </RadioGroup>
        </FormItem>
        </Col>
        </Row>
        <Row :gutter="10">
        <Col span="10">
        <FormItem label="是否有效" prop="statue">
          <RadioGroup v-model="formType.statue" type="button">
            <Radio label="1">有效</Radio>
            <Radio label="0">无效</Radio>
          </RadioGroup>
        </FormItem>
        </Col>
        </Row>
    	</Form>
        <div slot="footer">
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="add">确定</Button>
        </div>
      </Modal>
      <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>

<script>
    export default {
        data () {
            return {
            	formTypeSearch:{typeName:'',extTemplateId:'',skuTemplateId:''},
        		showTypeInfo:false,
        		formType: {typeName: ''},
                columns7: [
                    {
                        title: '商品类型',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '商品扩展属性模板',
                        align: 'center',
                        key: 'age'
                    },
                    {
                        title: '商品SKU模板',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: '商品类型1',
                        age: '属性模板A',
                        address: 'SKU模板2'
                    },
                    {
                        name: '商品类型2',
                        age: '属性模板B',
                        address: 'SKU模板1'
                    }
                ]
            }
        },
        methods: {
            show (index) {
            	this.showTypeInfo = true;
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            add (){
            	this.showTypeInfo = false;
            	this.data6.push({
                        name: '商品类型new',
                        age: '属性模板new',
                        address: 'SKU模板new'
                    });
            },
            modalCancel(){
        		this.showTypeInfo = false;
        	}
        }
    }
</script>
