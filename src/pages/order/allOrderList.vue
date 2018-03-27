<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>订单管理</BreadcrumbItem>
      <BreadcrumbItem>全部订单</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
          <FormItem label="起始地">
            <Select  filterable  >
              <Option :value="0" :key="0">请选择</Option>
              <Option :value="1" :key="1">青岛</Option>
              <Option :value="2" :key="2">大连</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="目的地">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">纽约</Option>
            <Option :value="2" :key="2">日本</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="订单编号">
            <Input placeholder="请输入订单编号"></Input>
          </FormItem>
        </Col>
        <Col span="3" style="float: right">
          <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
          <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="帮带人">
            <Input placeholder="请输入帮带人"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="求带人">
            <Input placeholder="请输入求带人"></Input>
          </FormItem>
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
          { title: '起始地', key: 'col_2',  align: 'center'},
          { title: '目的地', key: 'col_3', align: 'center'},
          { title: '出发时间', key: 'col_4', align: 'center'},
          { title: '到达时间', key: 'col_5', align: 'center'},
          { title: '帮带人', key: 'col_6', align: 'center'},
          { title: '求带人', key: 'col_7', align: 'center'},
          { title: '订单价格/RMB', width:120, key: 'col_8', align: 'center'},
          { title: '状态', key: 'col_9', align: 'center'},
          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '详情'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '撤单'),
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"order_0001",
            col_2:"北京",
            col_3:"棉花堡",
            col_4:"2018-12-12",
            col_5:"2018-12-15",
            col_6:"小李",
            col_7:"小王",
            col_8:"22.3",
            col_9:"待支付",
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
