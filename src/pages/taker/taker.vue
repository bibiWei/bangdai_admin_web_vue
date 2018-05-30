<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>帮带管理</BreadcrumbItem>
      <BreadcrumbItem>帮带列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="出发地">
          <Cascader :data="data" v-model="value1"></Cascader>

        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="目的地">
          <Cascader :data="data" v-model="value2"></Cascader>
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
    <Modal
      title="帮带详情"
      v-model="showTakerInfo"
      :mask-closable="false"
      :loading="true"
      width="760px">
      <Form  label-position="top" v-model="takingForm">
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="帮带人">
            <Input v-show="false" v-model="takingForm.id"></Input>
            <Input type="text"  v-model="takingForm.userName"></Input>
          </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="帮带人手机号码" >
              <Input v-model="takingForm.userPhone"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="帮带人物品类型" >
              <Input  v-model="takingForm.mateType"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="始发地" >
            <Input v-model="takingForm.departureAddress"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="目的地" >
            <Input v-model="takingForm.arrivalAddress"></Input>
          </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="重量(KG)" >
              <Input  v-model="takingForm.weight"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="帮带价格/RMB" >
              <Input v-model="takingForm.price" ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="出发日期" >
              <Input v-model="takingForm.departureDate"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="到达日期" >
              <Input v-model="takingForm.arrivalDate"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="机票认证" >
              <Input  v-model="takingForm.ticketVerifiedName"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24" >
          <FormItem label="备注" prop="remarks">
            <el-input type="textarea" v-model="takingForm.remarks"></el-input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="takerInfoCancel">取消</Button>
      </div>
    </Modal>
    <Modal v-model="delTakerInfo" width="460">
      <p slot="header" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        <span>提示信息</span>
      </p>
      <div style="padding-left:20px">
        <span style="font-size:16px">您确定要删除此帮带信息吗</span>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="delTakerCancel">取消</Button>
        <Button type="error" size="large"  @click="doDelTaker">删除</Button>
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
        takingId:0,
        showTakerInfo:false,
        delTakerInfo:false,
        takingForm:{
          id:0,
          userName:'',
          userPhone:'',
          mateType:'',
          price:'',
          remarks:'',
          weight:'',
          arrivalDate:'',
          departureDate:'',
          arrivalAddress:'',
          departureAddress:'',
          ticketVerified:0,
          ticketVerifiedName:''
        },
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
          { title: '起始地',key: 'departureAddress',align: 'center'},
          { title: '目的地', key: 'arrivalAddress',  align: 'center'},
          { title: '出发日期', key: 'departureDate', align: 'center'},
          { title: '到达日期', key: 'arrivalDate', align: 'center'},
          { title: '帮带人', key: 'userName', align: 'center'},
          { title: '重量要求(KG)', key: 'weight', align: 'center'},
          { title: '帮带价格', key: 'price', align: 'center'},
          { title: '机票认证', key: 'ticketVerified', align: 'center',
            render: (h, params) => {return params.row.ticketVerified === 1?"已认证":"未认证";}},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showTaker(params.row) } } }, '详情'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.delTaker(params.row) } } }, '删除')
              ]);
            }}
        ],
        ListData: [
        ],
        ruleValidate: {
        },
        value1: [],
        value2: [],
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }]
      }
    },
    methods: {
      doPageChange(pagenumber) {
        this.doTakingList(pagenumber, this.pageSize);
      },
      doTakingList(pageNo,pageSize){
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
      doSearchReset(name){
        this.scoreSearch['name'] = '';
        this.scoreSearch['stationName'] = '';
      },
      search(startIndex , endIndex){
      },
      showTaker(row){
        this.showTakerInfo = true;
        this.takingForm = row;
        if(this.takingForm.ticketVerified === 0){
          this.takingForm.ticketVerifiedName = "未认证";
        }else{
          this.takingForm.ticketVerifiedName = "未认证";
        }

      },
      takerInfoCancel(){
        this.showTakerInfo = false;
      },
      dotakerSave(){
        this.showTakerInfo = false;
        swal({text: '保存成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.loadData();});
      },
      delTaker(row){
        this.delTakerInfo = true;
        this.takingId = row.id;
      },
      delTakerCancel(){
        this.delTakerInfo = false;
      },
      doDelTaker(){
        this.delTakerInfo = false;
        this.$api.doTakingDel(this.takingId).then(res => {
          if(res.status == this.$api.SUCCESS){
            this.delTakerInfo = false;
            swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.loadData();});
          }else{
          }
        })
      },
      loadData() {
        this.doTakingList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
      },

    },
    created(){
      this.doSearchReset();
      this.loadData();
    }
  }
</script>
