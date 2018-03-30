<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>订单管理</BreadcrumbItem>
      <BreadcrumbItem>订单详情</BreadcrumbItem>
    </Breadcrumb>
    <Card style="margin-top: 30px">
      <h4 slot="title">
        <Icon type="android-archive"></Icon>
        订单详情
      </h4>

      <Row :gutter="16" class="font-bold">
        <Col span="24">
          <Col span="2" style="text-align: right">
            <span >订单编号:</span>
          </Col>
          <Col span="4">
          <span>0000019233232</span>
          </Col>
        </Col>
        <Col span="24" style="margin-top: 10px">
          <Col span="2" style="text-align: right">
            <span >订单状态:</span>
          </Col>
          <Col span="4">
            <span>等待付款</span>
          </Col>
        </Col>
        <Col span="24" style="margin-top: 10px">
          <Col span="2" style="text-align: right">
            <span >订单金额:</span>
          </Col>
          <Col span="4">
            <span class="price-font">222.3/RMB</span>
          </Col>
        </Col>
      </Row>

      <div style="margin-left: 100px;margin-right: 100px;margin-top: 50px">
        <Steps :current="1" >
          <Step title="已下单" content="xxxxxx"></Step>
          <Step title="已支付" content="xxxxxx"></Step>
          <Step title="已发货" content="xxxxxx"></Step>
          <Step title="已完成" content="xxxxxx"></Step>
        </Steps>
      </div>
      <Card :bordered="false" class="top-20">
        <p slot="title">物流详情</p>
        <Tabs value="name1" >
          <TabPane label="求带人" name="name1">
            <Card :bordered="false" class="top-20">
              <p slot="title">联系信息</p>
            </Card>
          </TabPane>
          <TabPane label="帮带人" name="name2">

          </TabPane>
        </Tabs>
      </Card>


    </Card>
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

<style>
  .font-bold{
    font-weight: bold;
  }
  .price-font{
    color: red;
  }
  .top-20{
    margin-top: 20px;
  }
</style>
