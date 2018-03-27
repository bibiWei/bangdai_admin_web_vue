<style>

</style>
<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>监管分类</BreadcrumbItem>
    </Breadcrumb>
      <Modal
        title="监管分类信息"
        v-model="showBizScopeInfo"
        :mask-closable="false"
        :loading="true"
        width="760px">
        <Form ref="formSupervision" :model="formSupervision" :rules="ruleType" :label-width="120">
          <Row :gutter="10">
	        <Col span="11">
	          <FormItem label="监管分类名称" prop="supervisionName">
	            <Input type="text" v-model="formSupervision.supervisionName" placeholder="请输入监管分类名称"></Input>
	          </FormItem>
	        </Col>
	        <Col span="11">
	          <FormItem label="是否有效" prop="status">
	          <RadioGroup v-model="formSupervision.status" type="button">
	            <Radio label="1">有效</Radio>
	            <Radio label="0">无效</Radio>
	          </RadioGroup>
	          </FormItem>
	        </Col>
	      </Row>
          <Row :gutter="10">
	        <Col span="24">
	          <FormItem label="商品列表" prop="saleableScope">
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
      <Tree :data="data5" :render="renderContent"></Tree>
  </div>
</template>

<script>
  import Vue from "vue";
  import swal from 'sweetalert2'
  export default {
    data(){
      return {
      		data5: [{   
      			title: '监管分类',
                expand: true,
                render: (h, { root, node, data }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-folder-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty',
                            type: 'primary'
                        }),
                        style: {
                            width: '55px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    })
                ])
            ]);
        },
        children: [
            {
                title: '普通药',
                expand: false
            },
            {
                title: '保健品',
                expand: false
            },
            {
                title: '医疗器械',
                expand: false
            },
            {
                title: '中药材',
                expand: false
            }
        ]
    	}],
        buttonProps: {type: 'ghost', size: 'small'},
        showBizScopeInfo:false,
        attrPreview: '',
	    data3: this.getMockData(),
        targetKeys3: this.getTargetKeys(),
        listStyle: {
	        width: '220px',
	        height: '240px'
        },
        formSupervision: {supervisionName:'', status:''}
      }
    },
    methods: {
	    doReset(){
	        for(let field in this.formSupervisionSearch){
            	this.formSupervisionSearch[field] = '';
            }
	    },
	    renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-compose-outline',
                            type: 'success'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.modify() }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty',
                            type: 'error'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: '一级分类',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        append2 (data) {
            const children = data.children || [];
            children.push({
                title: '新建分类',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        modify(){
        	this.showBizScopeInfo = true;
        },
        modalCancel(){
        	this.showBizScopeInfo = false;
        },
        add (){
            this.showBizScopeInfo = false;
        },
        getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: '商品 ' + i,
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