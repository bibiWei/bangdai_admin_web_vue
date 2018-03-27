<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>在售商品</BreadcrumbItem>
    </Breadcrumb>
    <br/>
    <Card>
      <Row>
        <Col span='6'>
          <Cascader :data="commodityCate" filterable placeholder="请选择商品分类" style="width: 200px"></Cascader>
        </Col>
        <Col span='6'>
          <Input placeholder="商品名称" style="width: 200px"></Input>

        </Col>
        <Col span='12'>
          <Button type="primary" >搜索商品</Button>
          <Button type="primary" @click="modal1 = true">添加商品</Button>
        </Col>
      </Row>
    </Card>
    <Card>
      <Table :columns="columns10" :data="data9"></Table>
      <br/>
      <Page :total="40" size="small" show-elevator show-sizer></Page>
    </Card>

  </div>
</template>

<script>

import expandRow from './table-expand.vue';
export default {
  components: { expandRow },
  data(){
    return{
      commodityCate:[],
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
      columns10: [
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
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '商品分类',
                        key: 'age'
                    },
                    {
                        title: '商品类型',
                        key: 'ctype'
                    },
                    {
                        title: '品牌',
                        key: 'cbrand'
                    },
                    {
                        title: '英文名称',
                        key: 'address'
                    },

                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
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
                                            this.$router.push({path:"/commodity/commodityMaint"});
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
                                }, '删除'),
                              h('Button', {
                                props: {
                                  type: 'error',
                                  size: 'small'
                                },
                                style: {
                                  marginLeft: '5px'
                                },
                                on: {
                                  click: () => {

                                  }
                                }
                              }, '下架')
                            ]);
                        }
                    }
                ],
                data9: [
                    {
                        name: '999感冒灵',
                        age: '感冒类',
                        ctype:'处方药',
                        cbrand: '葵花',
                        address: 'New York No. 1 Lake Park',
                        job: 'Data engineer',
                        interest: 'badminton',
                        birthday: '1991-05-14',
                        book: 'Steve Jobs',
                        movie: 'The Prestige',
                        music: 'I Cry'
                    },
                    {
                        name: '健胃消食片',
                        age: '消化类',
                        ctype:'非处方药',
                        cbrand: '修正',
                        address: 'London No. 1 Lake Park',
                        job: 'Data Scientist',
                        interest: 'volleyball',
                        birthday: '1989-03-18',
                        book: 'My Struggle',
                        movie: 'Roman Holiday',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: '云南白药喷雾剂',
                        age: '止疼类',
                        ctype:'非处方药',
                        cbrand: '国药',
                        address: 'Sydney No. 1 Lake Park',
                        job: 'Data Product Manager',
                        interest: 'tennis',
                        birthday: '1992-01-31',
                        book: 'Win',
                        movie: 'Jobs',
                        music: 'Don’t Cry'
                    },
                    {
                        name: '通窍鼻炎康',
                        age: '五官类',
                        ctype:'处方药',
                        cbrand: '葵花',
                        address: 'Ottawa No. 2 Lake Park',
                        job: 'Data Analyst',
                        interest: 'snooker',
                        birthday: '1988-7-25',
                        book: 'A Dream in Red Mansions',
                        movie: 'A Chinese Ghost Story',
                        music: 'actor'
                    }
                ]

    }
  }

}
</script>

<style>

    .expand-row{
        margin-bottom: 16px;
    }


</style>
