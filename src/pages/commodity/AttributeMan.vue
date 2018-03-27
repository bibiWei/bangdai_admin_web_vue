<<template>

  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>属性管理</BreadcrumbItem>
    </Breadcrumb>
    <br/>
    <Card>
      <Select  filterable style="width:200px;">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>

        <Input placeholder="属性名称" style="width: 200px"></Input>
        <Button type="primary" @click="modal1 = true">搜索</Button>

        <Button type="primary" @click="modal1 = true">添加</Button>

    </Card>
    <Card>

    <Modal
        v-model="modal1"
        title="添加属性信息"
        @on-ok="ok"
        @on-cancel="cancel" width="800px">
          <attribute-add></attribute-add>
    </Modal>

  <Table border :columns="columns7" :data="data6"></Table>
  <br/>
  <Page :total="40" size="small" show-elevator show-sizer></Page>
  </Card>
  </div>


</template>

<script>
import attributeAdd from './attribute.vue'

Vue.component('attribute-add',attributeAdd)

export default {
  data(){
    return{
      switch1: false,
      columns7: [
                    {
                        title: '商品类型',
                        key: 'ctype'
                    },
                    {
                        title: '属性名称',
                        key: 'cname'
                    },
                    {
                        title: '属性编码',
                        key: 'ccode'
                    },
                    {
                        title: '属性类型',
                        key: 'atype'
                    },
                    {
                        title: '选项集合',
                        key: 'valset'
                    },
                    {
                        title: '最大长度',
                        key: 'maxlen'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 170,
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
                                }, '查看'),
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
                                }, '更新'),
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
                        attrId: 100,
                        ctype: '心血管',
                        cname: '剂型',
                        ccode: 'shape',
                        atype: '选择',
                        valset:'片,膏',
                        maxlen: 12,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        attrId: 101,
                        ctype: '心血管',
                        cname: '批准文号',
                        ccode: 'lisence',
                        atype: '录入',
                        valset:'NA',
                        maxlen: 12,
                        address: 'New York No. 1 Lake Park'
                    }
                ],
      typeList:[
        {
            label: '感冒',
            value: '1'
        },
        {
          label: '消化',
          value: '2'
        }
      ],
      modal1: false
    }
  },
  methods: {
      change (status) {
        this.$Message.info('开关状态：' + status);
      },
      show (index) {
                this.$Modal.info({
                    title: '属性详情',
                    content: `Name：${this.data6[index].cname}<br>Age：${this.data6[index].ccode}<br>Address：${this.data6[index].atype}`
                })
            },
      remove (index) {
        this.data6.splice(index, 1);
      },
      ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
  },
  created(){

    
  }
}
</script>

<style>

</style>
