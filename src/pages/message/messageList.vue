<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>消息管理</BreadcrumbItem>
      <BreadcrumbItem>消息列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="发布日期">
          <DatePicker type="date" multiple placeholder="请选择创建时间" style="width: 100%" ></DatePicker>
        </FormItem>
        </Col>
        <Col span="3" style="float: right">
          <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
          <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" style="float: right">
          <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">新增</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="tagList" :data="ListData" style="margin-top: 20px"></Table>
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
          { title: '标题',key: 'col_1',align: 'center'},
          { title: '创建人', key: 'col_2',  align: 'center'},
          { title: '创建时间', key: 'col_3', align: 'center'},
          { title: '推送日期', key: 'col_4', align: 'center'},
          { title: '状态', key: 'col_5', align: 'center'},
          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '详情'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '推送'),
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"第一个标题",
            col_2:"xxx",
            col_3:"2018-12-12",
            col_4:"2018-12-13",
            col_5:"已推送",
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
    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
