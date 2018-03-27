<style>

</style>
<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>模板管理</BreadcrumbItem>
    </Breadcrumb>
      <Form :model="formTemplateSearch" :label-width="80" style="margin-top: 20px" ref="formTemplateSearch" >
        <Row>
          <Col span="20">
            <Col span="8">
            <FormItem label="模板名称">
              <Input type="text" v-model="formTemplateSearch.templateName" placeholder="请输入模板名称"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="模板类型">
              <Select v-model="formTemplateSearch.templateType" placeholder="请选择模板类型">
                <Option value="SYS">商品扩展属性模板</Option>
                <Option value="BIZ">商品SKU模板</Option>
              </Select>
            </FormItem>
            </Col>
          </Col>
          <Col span="4">
            <Button type="ghost" style="float:right;margin-left: 10px;" @click="doReset('formTemplateSearch')">重置</Button>
            <Button type="primary" style="float:right;" @click="search()">查询</Button>
          </Col>
          <Col span="24">
            <Button type="primary" style="float:right;margin-bottom: 10px;" @click="show()">新增</Button>
          </Col>
        </Row>
      </Form>
      <Modal
        title="模板信息"
        v-model="showTemplateInfo"
        :mask-closable="true"
        :loading="true"
        width="700px"
        height="700px">
        <Form ref="formTemplate" :model="formTemplate" :rules="ruleType" :label-width="120">
        <Row :gutter="10">
        <Col span="11">
          <FormItem label="模板名称" prop="templateName">
            <Input type="text" v-model="formTemplate.templateName" placeholder="请输入模板名称"></Input>
          </FormItem>
        </Col>
        <Col span="11">
          <FormItem label="模板类型" prop="templateType">
          <Select v-model="formTemplate.templateType" placeholder="请选择模板类型">
            <Option value="1">商品扩展属性模板</Option>
            <Option value="2">商品SKU模板</Option>
          </Select>
          </FormItem>
        </Col>
        </Row>
        <Row :gutter="10">
        <Col span="11">
            <FormItem label="商品分类">
              <Cascader :data="data" v-model="formTemplate.typeId" trigger="hover" change-on-select placeholder="请选择商品分类"></Cascader>
            </FormItem>
        </Col>
        <Col span="11">
          <FormItem label="是否有效" prop="status">
          <RadioGroup v-model="formTemplate.status" type="button">
            <Radio label="1">有效</Radio>
            <Radio label="0">无效</Radio>
          </RadioGroup>
          </FormItem>
        </Col>
        </Row>
        <Row :gutter="10">
        <Col span="24">
          <FormItem label="属性组" prop="saleableScope">
	        <Transfer
		        :data="data3"
		        :target-keys="targetKeys3"
		        :list-style="listStyle"
		        :render-format="render3"
		        filterable
		        @on-selected-change="handleSelected3"
		        @on-change="handleChange3">
		        <div :style="{float: 'right', margin: '5px'}">
		            <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
		        </div>
	    	</Transfer>
	       </FormItem>
	    </Col>
    	</Row>
    	<Row :gutter="10">
    	<Col span="24">
          <FormItem label="">
            <span >{{ attrPreview }}</span>
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
import expandRow from './attribute-expand.vue';
    export default {
        data () {
            return {
	           data: [{
                    value: 'beijing',
                    label: '中药',
                    children: [
                        {
                            value: 'gugong',
                            label: '中成药',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '解表药',
                                },
                                {
                                    value: 'shizilin',
                                    label: '清热药',
                                }
                            ]
                        },
                        {
                            value: 'tiantan',
                            label: '中药饮片',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '参类',
                                },
                                {
                                    value: 'shizilin',
                                    label: '枸杞子',
                                }
                            ]
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '西药',
                    children: [
                        {
                            value: 'nanjing',
                            label: '抗生素类药品',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '青霉素类',
                                },
                                {
                                    value: 'shizilin',
                                    label: '头孢菌素类',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '消化系统用药',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '助消化',
                                },
                                {
                                    value: 'shizilin',
                                    label: '泻药',
                                }
                            ]
                        }
                    ],
                }],
            	formTemplateSearch:{templateName:'',templateType:''},
        		showTemplateInfo:false,
        		formTemplate: {templateName: ''},
        		attrPreview: '',
        		data3: this.getMockData(),
                targetKeys3: this.getTargetKeys(),
                listStyle: {
                    width: '220px',
                    height: '240px'
                },
                components: { expandRow },
                columns7: [
                	{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '模板类型',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '模板类型',
                        align: 'center',
                        key: 'age'
                    },
                    {
                        title: '模板状态',
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
                        name: '扩展属性模板1',
                        age: '属性模板',
                        address: '有效'
                    },
                    {
                        name: '扩展属性模板2',
                        age: '属性模板',
                        address: '有效'
                    },
                    {
                        name: '商品SKU模板1',
                        age: 'SKU模板',
                        address: '无效'
                    }
                ]
            }
        },
        methods: {
            show (index) {
            	this.showTemplateInfo = true;
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            add (){
            	this.showTemplateInfo = false;
            	this.data6.push({
                    name: '扩展属性模板3',
                    age: '属性模板',
                    address: '有效'
                });
            },
            modalCancel(){
        		this.showTemplateInfo = false;
        	},
        	getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: '属性组 ' + i,
                        description: '描述  ' + i
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key);
            },
            handleChange3 (newTargetKeys) {
                this.targetKeys3 = newTargetKeys;
            },
            render3 (item) {
                return item.label + ' - ' + item.description;
            },
            reloadMockData () {
                this.data3 = this.getMockData();
                this.targetKeys3 = this.getTargetKeys();
            },
            handleSelected3 (newTargetKeys) {
	            let desc = '';
	            for(let i in newTargetKeys){
	            	if(desc == ''){
	            		desc = '"'+this.getMockData()[newTargetKeys[i]].label+'"';
	            	}else{
	            		desc = desc + ' , "' + this.getMockData()[newTargetKeys[i]].label +'"';
	            	}
				}
            	return this.attrPreview = desc;
            }
        }
    }
</script>
