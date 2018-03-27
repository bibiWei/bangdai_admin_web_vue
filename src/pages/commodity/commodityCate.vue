<style>

</style>
<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>商品分类</BreadcrumbItem>
    </Breadcrumb>
      <Modal
        title="商品分类信息"
        v-model="showCateInfo"
        :mask-closable="false"
        :loading="true"
        width="760px">
        <Form :model="formCate" label-position="top" ref="formCate" :rules="ruleValidate">
          <Row :gutter="10">
            <Col span="8">
            <FormItem label="分类名称" prop="cateName">
              <Input type="text" v-model="formCate.cateName" placeholder="请输入商品分类名称"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="显示顺序" prop="cateOrder">
              <Input type="text" v-model="formCate.cateName" placeholder="请输入显示顺序"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="图标地址" prop="catePhoneUrl">
              <Input type="text" v-model="formCate.catePhoneUrl" placeholder="请输入图标地址"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="8">
            <FormItem label="N个关键词" prop="metaKey">
              <Input type="text" v-model="formCate.metaKey" placeholder="请输入N个关键词"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="是否有效" prop="status">
              <RadioGroup v-model="formCate.status" type="button">
                <Radio label="1">有效</Radio>
                <Radio label="0">无效</Radio>
              </RadioGroup>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="24" >
            <FormItem label="描述" prop="metaDesc">
              <el-input type="textarea" v-model="formCate.metaDesc" placeholder="请输入描述信息"></el-input>
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
      			title: '中药',
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
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-compose-outline',
                            type: 'success'
                        }),
                        style: {
                            marginRight: '30px'
                        },
                        on: {
                            click: () => { this.modify() }
                        }
                    })
                ])
            ]);
        },
        children: [
            {
                title: '中成药',
                expand: true,
                children: [
                    {
                        title: '解表药',
                        expand: true
                    },
                    {
                        title: '清热药',
                        expand: true
                    }
                ]
            },
            {
                title: '中药饮片',
                expand: true,
                children: [
                    {
                        title: '参类',
                        expand: true
                    },
                    {
                        title: '枸杞子',
                        expand: true
                    }
                ]
            }
        ]
    	}],
        buttonProps: {
            type: 'ghost',
            size: 'small',
        },
        formCommoditySearch:{category:''},
        showCateInfo:false,
        formCate: {cateName: '',  cateOrder: '', cateCount: ''}
      }
    },
    methods: {
	    doReset(){
	        this.formCommoditySearch['category'] = '';
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
                            icon: 'ios-plus-empty',
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append2(data) }
                        }
                    }),
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
        	this.showCateInfo = true;
        },
        modalCancel(){
        	this.showCateInfo = false;
        },
        add (){
            this.showCateInfo = false;
        },
    }
}
</script>
