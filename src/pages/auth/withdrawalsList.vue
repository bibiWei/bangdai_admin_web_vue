<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>审核管理</BreadcrumbItem>
      <BreadcrumbItem>提现申请</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="账号">
          <Input placeholder="请输入账号"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="手机号">
          <Input placeholder="请输入手机号"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="昵称">
          <Input placeholder="请输入昵称"></Input>
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
          { title: '账号',key: 'col_1',align: 'center'},
          { title: '手机号', key: 'col_2',  align: 'center'},
          { title: '昵称', key: 'col_3', align: 'center'},
          { title: '账户余额', key: 'col_4', align: 'center'},
          { title: '提现金额', key: 'col_5', align: 'center'},
          { title: '提现后金额', key: 'col_6', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '审核'),
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"cosSean",
            col_2:"18766312029",
            col_3:"小李",
            col_4:"3000",
            col_5:"2000",
            col_6:"1000",
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
