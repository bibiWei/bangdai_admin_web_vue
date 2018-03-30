<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>评价管理</BreadcrumbItem>
      <BreadcrumbItem>评价列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="评价类型">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">帮带人评价</Option>
            <Option :value="2" :key="2">求带人评价</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="求带人">
          <Input placeholder="请输入求带人"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="帮带人">
          <Input placeholder="请输入帮带人"></Input>
        </FormItem>
        </Col>
        <Col span="3" style="float: right">
        <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
        <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="tagList" :data="ListData"></Table>
    <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    components: {},
    data () {
      return {
        scoreSearch:{
          stationName:'',
          name:''
        },
        total:0,
        pageSize:10,
        tagInfo:false,
        delTagRecord:null,
        delTag:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '订单编号',key: 'col_1',align: 'center'},
          { title: '评价类型', key: 'col_2',  align: 'center'},
          { title: '帮带人', key: 'col_3', align: 'center'},
          { title: '求带人', key: 'col_4', align: 'center'},
          { title: '评价时间', key: 'col_5', align: 'center'},
          { title: '评价', key: 'col_6', align: 'center',width:200,
            render: (h, params) => {
              return h('div', [
                h('Rate',
                  {
                    props: {
                      disabled:true,
                      allowHalf:true,
                      showText:true,
                      value:3.8
                    },
                    style: {
                      disabled:true
                    },
                  }, '3.2')
              ]);
            }
          },
          { title: '状态', key: 'col_7', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.doPush(params.row) } } }, '发布'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.del(params.row) } } }, '删除')
              ]);
            }
          }
        ],
        ListData: [
          {
            col_1:"order_00001",
            col_2:"帮带评价求带",
            col_3:"小李",
            col_4:"小王",
            col_5:"2018-12-12",
            col_6:"40KG",
            col_7:"已发布",
          }
        ],
        ruleValidate: {
          tagName: [{required: true, message: '标签名称不能为空', trigger: 'blur'}],
          tagRemark:[{type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}]
        },
      }
    },
    methods: {
      doSearchReset(name){
        this.scoreSearch['name'] = '';
        this.scoreSearch['stationName'] = '';
      },

      search(startIndex , endIndex){
      },
      doPush(row){
        swal({text: '发布成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {});
      }
    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
