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
    <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer show-total
          style="float: right;margin-top: 10px" @on-change="doPageChange"></Page>
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
          { title: '订单编号',key: 'orderNo',align: 'center'},
          { title: '起始地', key: 'departureAddress',  align: 'center'},
          { title: '目的地', key: 'arrivalAddress', align: 'center'},
          { title: '出发时间', key: 'departureDate', align: 'center'},
          { title: '到达时间', key: 'arrivalDate', align: 'center'},
          { title: '帮带人', key: 'taker', align: 'center'},
          { title: '求带人', key: 'buyer', align: 'center'},
          { title: '订单价格/RMB', width:120, key: 'negotiatePrice', align: 'center'},
          { title: '状态', key: 'statusName', align: 'center'},
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

      show(row){
        localStorage.setItem("orderInfo",JSON.stringify(row));
        this.$router.push({path:"/order/orderDetail/" + row.id})
      },
      search(startIndex , endIndex){
      },

      loadData() {
        this.doAllOrderList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
      },
      doPageChange(pagenumber) {
        this.doAllOrderList(pagenumber, this.pageSize);
      },
      doAllOrderList(pageNo,pageSize){
        let param = {
          pageNo:pageNo,
          pageSize:pageSize
        }
        this.$api.getAllOrderList(param).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){
            this.total = res.result.pagination.total;
            this.ListData = res.result.data;
            for(let data of this.ListData){
              data.buyer = data.reqBringVo.userName;
              data.taker = data.helpBringVo.userName;
              data.departureAddress = data.helpBringVo.departureCountry + "-" + data.helpBringVo.arrivalProvince + "-" + data.helpBringVo.departureCity
              data.arrivalAddress = data.helpBringVo.arrivalCountry + "-" + data.helpBringVo.arrivalProvince + "-" + data.helpBringVo.arrivalCity
              data.departureDate = data.helpBringVo.departureDate.substring(0,10);
              data.arrivalDate = data.helpBringVo.arrivalDate.substring(0,10);
              if(data.status === 1){
                data.statusName = "等待确认";
              }else if(data.status === 2){
                data.statusName = "已确认带支付";
              }else if(data.status === 3){
                data.statusName = "已支付";
              }else if(data.status === 4) {
                data.statusName = "待发货";
              }else if(data.status === 5){
                data.statusName = "已完成";
              }
            }
          }else{
            // swal(res.message);
          }
        })
      }
    },
    created(){
      this.doSearchReset();
      this.search();
      this.loadData();
    }
  }
</script>
