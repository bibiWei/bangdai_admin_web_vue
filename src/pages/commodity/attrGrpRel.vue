<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>属性组管理</BreadcrumbItem>
    </Breadcrumb>
    <br/>
    <Row>
      <Col span='24'>
        <Card>
          <Row>
            <Col span='6'>
              <Cascader :data="data" filterable placeholder="请选择分类" style="width: 200px"></Cascader>
            </Col>
            <Col span='6'>
              <Input placeholder="属性组名称" style="width: 200px"></Input>
            </Col>
            <Col span='12'>
              <Button type="primary" >搜索属性组</Button>
              <Button type="primary" @click="modal1 = true">添加属性组</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
      <Modal
          v-model="modal1"
          title="添加属性组信息"
          @on-ok="ok"
          @on-cancel="cancel" width="800px">
          <Card>
            <Form>
            <Row>
              <Col span='12'>
                <FormItem label="属性组名称" label-position='top'>
                  <Input placeholder="属性组名称" style="width: 200px"></Input>
                </FormItem>

              </Col>
              <Col span='12'>
                <FormItem label="商品分类" label-position='left'>
                  <Cascader :data="data" filterable placeholder="请选择分类" style="width: 200px"></Cascader>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span='12'>
                <FormItem label="属性组描述">
                  <Input placeholder="属性组描述" style="width: 200px"></Input>
                </FormItem>
              </Col>
              <Col span='12'>
                <FormItem label="SKU组">
                  <i-switch></i-switch>
                </FormItem>
              </Col>
            </Row>
            <Row justify='center'>
              <Col span='24'>
                <Transfer
                    :data="data3"
                    :target-keys="targetKeys3"
                    :list-style="listStyle"
                    :render-format="render3"
                    :operations="['移除','移入']"
                    :titles="['属性源','已选择']"
                    filterable
                    @on-change="handleChange3">
                    <div :style="{float: 'right', margin: '5px'}">
                        <Button type="ghost" size="small" @click="reloadMockData">刷新</Button>
                    </div>
                </Transfer>

              </Col>

            </Row>
            <br/>
            <Row>
              <Table size='small' highlight-row ref="selectedAtt" :columns="columns1" :data="attVals"></Table>
            </Row>
            <!--
            <FormItem label="选择对应的属性">
              <Select v-model="model12" filterable multiple>
                  <Option v-for="item in AttrList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          -->
          </Form>
          </Card>
      </Modal>

    <Row>
      <Col span='24'>
        <Card>
          <Table :columns="columns10" :data="data9"></Table>
        </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
import attributeAdd from './attribute.vue'

import expandRow from './attrGrpExt.vue'

Vue.component('attribute-add',attributeAdd)

//Vue.component('expandRow',attrGrpExt)

export default {
  components: { expandRow },
  data(){
    return{
      switch1: false,
      attCols:[],
      attVals:[],
      data:[{
          value: '1',
          label: '中西药',
          children: [
              {
                  value: '11',
                  label: '五官科',
                  children: [
                      {
                          value: '111',
                          label: '麻黄',
                      }
                  ]
              },
              {
                  value: '12',
                  label: '神经科',
                  children: [
                      {
                          value: '121',
                          label: '麻黄',
                      }
                  ]
              },
              {
                  value: '13',
                  label: '消化科',
                  children: [
                      {
                          value: '131',
                          label: '麻黄',
                      }
                  ]
              }
          ]
      }, {
          value: '2',
          label: '中药饮片',
          children: [
              {
                  value: '21',
                  label: '解表药',
                  children: [
                      {
                          value: '211',
                          label: '麻黄',
                      }
                  ]
              },
              {
                  value: '22',
                  label: '泄下药',
                  children: [
                      {
                          value: '221',
                          label: '大黄',
                      },
                      {
                          value: '222',
                          label: '亚麻子',
                      }
                  ]
              }
          ],
      }],
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
      AttrList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        }

      ],
      model12: [],
      columns1: [
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
                  }
                ],
                data1: [

                    {
                      ctype: 'John Brown',
                      cname: '营业执照',
                      ccode: 'lisence',
                      atype: '录入',
                      valset:'NA',
                      maxlen: 12,
                      address: 'New York No. 1 Lake Park'
                    },
                    {
                      ctype: 'John Brown',
                      cname: '生产许可证',
                      ccode: 'manufacture',
                      atype: '上传',
                      valset:'--',
                      maxlen: 12,
                      address: 'New York No. 1 Lake Park'
                    }
                ],
                columns33: [
                    {
                        type: 'index',
                        width: 20,
                        align: 'right'
                    },
                    {
                        title: '属性组',
                        key: 'name'
                    }
                ],
                data11: [
                    {
                        name: '企业资质',
                        age: 18
                    },
                    {
                        name: '生产许可',
                        age: 24
                    },
                    {
                        name: '企业介绍',
                        age: 30
                    },
                    {
                        name: '药妆信息',
                        age: 26
                    }
                ],
                columns333: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data111: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                modal1: false,
                modal2: false,
                data3: this.getMockData(),
                targetKeys3: this.getTargetKeys(),
                listStyle: {
                    width: '250px',
                    height: '300px'
                },
                columns10: [
                              {
                                  type: 'expand',
                                  width: 50,
                                  render: (h, params) => {
                                      return h(expandRow, {
                                          props: {
                                              row: params.row,
                                              columns1: this.columns1,
                                              data1: params.row.data1
                                          }
                                      })
                                  }
                              },
                              {
                                  title: '属性组名称',
                                  key: 'name'
                              },
                              {
                                  title: '属性组描述',
                                  key: 'age'
                              },
                              {
                                  title: '商品类型',
                                  key: 'ctype'
                              },
                              {
                                  title: '是否SKU',
                                  key: 'cbrand'
                              },
                              {
                                  title: '英文名称',
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
                                                      this.show(params.row)
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
                          data9: [
                              {
                                  name: '企业资质',
                                  age: '感冒类',
                                  ctype:'处方药',
                                  cbrand: '葵花',
                                  address: 'New York No. 1 Lake Park',
                                  job: 'Data engineer',
                                  interest: 'badminton',
                                  birthday: '1991-05-14',
                                  book: 'Steve Jobs',
                                  movie: 'The Prestige',
                                  music: 'I Cry',
                                  data1: [

                                      {
                                        ctype: 'John Brown',
                                        cname: '营业执照',
                                        ccode: 'lisence',
                                        atype: '录入',
                                        valset:'NA',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      },
                                      {
                                        ctype: 'John Brown',
                                        cname: '生产许可证',
                                        ccode: 'manufacture',
                                        atype: '上传',
                                        valset:'--',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      }
                                  ]
                              },
                              {
                                  name: '生产许可',
                                  age: '消化类',
                                  ctype:'非处方药',
                                  cbrand: '修正',
                                  address: 'London No. 1 Lake Park',
                                  job: 'Data Scientist',
                                  interest: 'volleyball',
                                  birthday: '1989-03-18',
                                  book: 'My Struggle',
                                  movie: 'Roman Holiday',
                                  music: 'My Heart Will Go On',
                                  data1: [

                                      {
                                        ctype: 'John Brown',
                                        cname: '营业执照',
                                        ccode: 'lisence',
                                        atype: '录入',
                                        valset:'NA',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      },
                                      {
                                        ctype: 'John Brown',
                                        cname: '生产许可证',
                                        ccode: 'manufacture',
                                        atype: '上传',
                                        valset:'--',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      }
                                  ]
                              },
                              {
                                  name: '企业介绍',
                                  age: '止疼类',
                                  ctype:'非处方药',
                                  cbrand: '国药',
                                  address: 'Sydney No. 1 Lake Park',
                                  job: 'Data Product Manager',
                                  interest: 'tennis',
                                  birthday: '1992-01-31',
                                  book: 'Win',
                                  movie: 'Jobs',
                                  music: 'Don’t Cry',
                                  data1: [

                                      {
                                        ctype: 'John Brown',
                                        cname: '营业执照',
                                        ccode: 'lisence',
                                        atype: '录入',
                                        valset:'NA',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      },
                                      {
                                        ctype: 'John Brown',
                                        cname: '生产许可证',
                                        ccode: 'manufacture',
                                        atype: '上传',
                                        valset:'--',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      }
                                  ]
                              },
                              {
                                  name: '药妆信息',
                                  age: '五官类',
                                  ctype:'处方药',
                                  cbrand: '葵花',
                                  address: 'Ottawa No. 2 Lake Park',
                                  job: 'Data Analyst',
                                  interest: 'snooker',
                                  birthday: '1988-7-25',
                                  book: 'A Dream in Red Mansions',
                                  movie: 'A Chinese Ghost Story',
                                  music: 'actor',
                                  data1: [

                                      {
                                        ctype: 'John Brown',
                                        cname: '营业执照',
                                        ccode: 'lisence',
                                        atype: '录入',
                                        valset:'NA',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      },
                                      {
                                        ctype: 'John Brown',
                                        cname: '生产许可证',
                                        ccode: 'manufacture',
                                        atype: '上传',
                                        valset:'--',
                                        maxlen: 12,
                                        address: 'New York No. 1 Lake Park'
                                      }
                                  ]
                              }
                          ]
    }
  },
  methods: {

        show(row){

          console.log(123);

          console.log(row);

          this.$Message.info(row.job);

        },

          ok () {
              this.$Message.info('Clicked ok');
          },
          cancel () {
              this.$Message.info('Clicked cancel');
          },
          getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'The desc of content  ' + i,
                        disabled: Math.random() * 3 < 1
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
                console.log(newTargetKeys);
                this.targetKeys3 = newTargetKeys;
                console.log(this.targetKeys3);
                console.log(this.data1);
                //this.$refs['selectedAtt'].columns = this.columns1;
                //this.$refs['selectedAtt'].data=this.data1;
                //this.attCols.push(this.columns1);
                this.attVals = this.data1;
            },
            render3 (item) {
                return item.label + ' - ' + item.description;
            },
            reloadMockData () {
                this.data3 = this.getMockData();
                this.targetKeys3 = this.getTargetKeys();
            }
  },
  created(){

  }

}
</script>

<style>

</style>
