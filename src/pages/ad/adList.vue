<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>广告管理</BreadcrumbItem>
      <BreadcrumbItem>广告列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="状态">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">发布</Option>
            <Option :value="2" :key="2">未发布</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="创建时间">
          <DatePicker type="date" multiple placeholder="请选择创建时间" style="width: 100%" ></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="有效期">
          <DatePicker type="date" multiple placeholder="请选择有效期" style="width: 100%" ></DatePicker>
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
          { title: '广告',key: 'col_1',align: 'center'},
          { title: '广告类型', key: 'col_2',  align: 'center'},
          { title: '创建时间', key: 'col_3', align: 'center'},
          { title: '有效期', key: 'col_4', align: 'center'},
          { title: '发布状态', key: 'col_5', align: 'center'},

          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '详情'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '发布'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.del(params.row) } } }, '删除')
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"测试广告",
            col_2:"xxx",
            col_3:"2018-12-12",
            col_4:"2018-12-12",
            col_5:"已发布",
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
