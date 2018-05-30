<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>审核管理</BreadcrumbItem>
      <BreadcrumbItem>机票核查</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="出发地">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">北京</Option>
            <Option :value="2" :key="2">上海</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="目的地">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">纽约</Option>
            <Option :value="2" :key="2">阿拉斯加</Option>
          </Select>
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
    <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer show-total
          style="float: right;margin-top: 10px" @on-change="doPageChange"></Page>
    <Modal title="机票审核" v-model="isTicketInfo" width="900px">
      <Form v-model="ticketInfo">
        <Row :gutter="16">
          <Col span="6">
          <Input v-show="false" v-model="ticketInfo.id"></Input>
          <FormItem label="出发地" >

            <Input type="text"    readonly="readonly" v-model="ticketInfo.departureAddress"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="目的地" >
            <Input type="text"    readonly="readonly" v-model="ticketInfo.arrivalAddress"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="出发时间" >
            <Input type="text"   readonly="readonly" v-model="ticketInfo.departureDate"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="帮带人" >
            <Input type="text"   readonly="readonly" v-model="ticketInfo.userName"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <Row :gutter="16">
        <Col span="24">
        <Card>
          <div style="text-align:center">
            <img :src="ticketInfo.ticketPicUrl" width="280px" >
            <h3>机票照片</h3>
          </div>
        </Card>
        </Col>
      </Row>
      <Row :gutter="100" style="margin-top: 3em;text-align: center" v-show="isCheckShow">
        <Col span="12">
        <Button type="success" long style="width: 80%" @click="doAgree()">通过</Button>
        </Col>
        <Col span="12">
        <Button type="error" long style="width: 80%" @click="doRefuse()">驳回</Button>
        </Col>
      </Row>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    components: {},
    data () {
      return {
        isCheckShow:true,
        ticketInfo:{
          id:'',
          departureAddress:'',
          arrivalAddress:'',
          departureDate:'',
          userName:'',
          ticketPicUrl:''
        },
        total:0,
        pageSize:10,
        tagInfo:false,
        delTagRecord:null,
        delTag:false,
        isTicketInfo:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '起始地',key: 'departureAddress',align: 'center'},
          { title: '目的地', key: 'arrivalAddress',  align: 'center'},
          { title: '出发日期', key: 'departureDate', align: 'center'},
          { title: '抵达日期', key: 'arrivalDate', align: 'center'},
          { title: '帮带人', key: 'userName', align: 'center'},
          { title: '重量要(kg)', key: 'weight', align: 'center'},
          { title: '帮带价格(RMB)', key: 'price', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              if(params.row.ticketVerified == 1){
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.showTicket(params.row) } } }, '审核')
                ]);
              }else{
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.showTicket(params.row) } } }, '详情')
                ]);
              }

            }
          }
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

      },

      doPageChange(pagenumber) {
        this.getTicketList(pagenumber, this.pageSize);
      },

      getTicketList(pageNo,pageSize){
        let param = {
          pageNo:pageNo,
          pageSize:pageSize
        }
        this.$api.doTakingList(param).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){
            this.total = res.result.pagination.total;
            this.ListData = res.result.data;
            for(let data of this.ListData){
              data.departureAddress = data.departureCountry + "-" + data.arrivalProvince + "-" + data.departureCity
              data.arrivalAddress = data.arrivalCountry + "-" + data.arrivalProvince + "-" + data.arrivalCity
              data.departureDate = data.departureDate.substring(0,19);
              data.arrivalDate = data.arrivalDate.substring(0,19);
            }
          }else{
            // swal(res.message);
          }
        })
      },

      search(startIndex , endIndex){
      },
      showTicket(row){
        this.isTicketInfo = true;
        this.getTicketInfo(row.id);

      },

      getTicketInfo(id){
        this.$api.getTakingInfo(id).then(res => {
          if(res.status == this.$api.SUCCESS){
            if(res.result.ticketVerified == 2){
              this.isCheckShow = false;
            }
            var data = res.result;
            this.ticketInfo.departureAddress = data.departureCountry + "-" + data.arrivalProvince + "-" + data.departureCity
            this.ticketInfo.arrivalAddress = data.arrivalCountry + "-" + data.arrivalProvince + "-" + data.arrivalCity
            this.ticketInfo.departureDate = data.departureDate.substring(0,19);
            this.ticketInfo.userName = data.userName;
            this.ticketInfo.id = data.id;
            this.ticketInfo.ticketPicUrl = data.ticketPicUrl;
          }else{
            // swal(res.message);
          }
        })
      },
      doRefuse(){
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                type:'textarea',
                value: this.value,
                autofocus: true,
                placeholder: '请输入驳回理由'
              },
              on: {
                input: (val) => {
                  this.value = val;
                }
              }
            })
          },
          onOk:() =>{
            if(this.value == ""){
              alert("请您输入驳回理由");
            }else{
              let param = {
                rejectReason:this.value,
                id:this.ticketInfo.id
              }
              this.$api.doRejectTicket(param).then(res => {
                if(res.status == this.$api.SUCCESS){
                  this.isTicketInfo = false;
                  swal({text: '驳回成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {this.loadData()});
                }else{
                  // swal(res.message);
                }
              })
            }
          }
        })
      },
      doAgree(){

        this.$api.doTicketAgree(this.ticketInfo.id).then(res => {
          if(res.status == this.$api.SUCCESS){
            swal({text: '审核成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {this.loadData()});
            this.isTicketInfo = false;
          }else{
          }
        })

      },
      loadData() {
        this.getTicketList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
      },
    },
    created(){
      this.doSearchReset()
      this.loadData()
    }
  }
</script>
