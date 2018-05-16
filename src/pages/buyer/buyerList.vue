<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>求带管理</BreadcrumbItem>
      <BreadcrumbItem>求带列表</BreadcrumbItem>
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
        <FormItem label="求带人">
          <Input placeholder="求带人"></Input>
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
      title="求带详情"
      v-model="showBuyerInfo"
      :mask-closable="false"
      :loading="true"
      width="760px">
      <Form  label-position="top" v-model="buyingForm">
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="求带人">
            <Input v-show="false" v-model="buyingForm.id"></Input>
            <Input type="text" v-model="buyingForm.userName" readonly="readonly"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="求带人手机号码" >
            <Input  v-model="buyingForm.userPhone" readonly="readonly"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="求带物品类型" >
            <Input v-model="buyingForm.mateType" readonly="readonly"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="出发地" >
            <Input v-model="buyingForm.departureAddress" readonly="readonly"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="目的地" >
            <Input v-model="buyingForm.arrivalAddress" readonly="readonly"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="重量(KG)" >
            <Input v-model="buyingForm.weight" readonly="readonly"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="求带价格/RMB" >
            <Input v-model="buyingForm.price" readonly="readonly"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="截止日期" >
            <Input v-model="buyingForm.deadline" readonly="readonly"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24" >
          <FormItem label="备注" prop="remarks">
            <el-input type="textarea" v-model="buyingForm.remarks" readonly="readonly"></el-input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="buyerInfoCancel">取消</Button>
      </div>
    </Modal>
    <Modal v-model="delBuyerInfo" width="460">
      <p slot="header" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        <span>提示信息</span>
      </p>
      <div style="padding-left:20px">
        <span style="font-size:16px">您确定要删除此帮带信息吗</span>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="delBuyerCancel">取消</Button>
        <Button type="error" size="large"  @click="doDelBuyer">删除</Button>
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
          buyingId:0,
          showBuyerInfo:false,
          delBuyerInfo:false,
          buyingForm:{
            id:0,
            userName:'',
            userPhone:'',
            mateType:'',
            departureAddress:'',
            arrivalAddress:'',
            weight:'',
            price:'',
            deadline:''
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
            { title: '截止日期', key: 'deadline', align: 'center'},
            { title: '求带人', key: 'userName', align: 'center'},
            { title: '物品类型', key: 'mateType', align: 'center'},
            { title: '物品重量(KG)', key: 'weight', align: 'center'},
            { title: '求带价格(元)', key: 'price', align: 'center'},
            { title: '操作', key: 'action', width: 130, align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.showBuyer(params.row) } } }, '详情'),
                  h('Button', { props: { type: 'error', size: 'small' },
                    on: { click: () => { this.delBuyer(params.row) } } }, '删除')
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

        doBuyingList(pageNo,pageSize){
          let param = {
            pageNo:pageNo,
            pageSize:pageSize
          }
          this.$api.doBuyingList(param).then(res => {
            this.ListData = [];
            if(res.status == this.$api.SUCCESS){
              this.total = res.result.pagination.total;
              this.ListData = res.result.data;
              for(let data of this.ListData){
                data.deadline = data.deadline.substring(0,19);
                data.departureAddress = data.departureCountry + "-" + data.departureProvince + "-" + data.departureCity;
                data.arrivalAddress = data.arrivalCountry + "-" + data.arrivalProvince + "-" + data.arrivalCity;
              }
            }else{
             // swal(res.message);
            }
          })
        },

        doSearchReset(name){
//          this.scoreSearch['name'] = '';
//          this.scoreSearch['stationName'] = '';
        },

        search(startIndex , endIndex){
        },

        doPageChange(pagenumber) {
          this.doBuyingList(pagenumber, this.pageSize);
        },

        showBuyer(row){
          this.showBuyerInfo = true;
          this.buyingForm = row;
          this.buyingForm.deadline = row.deadline.substring(0,10);
          this.buyingForm.departureAddress = row.departureCountry + "-" + row.departureProvince + "-" + row.departureCity;
          this.buyingForm.arrivalAddress = row.arrivalCountry + "-" + row.arrivalProvince + "-" + row.arrivalCity;
        },
        buyerInfoCancel(){
          this.showBuyerInfo = false;
        },
        dobuyerSave(){
          this.showBuyerInfo = false;
          swal({text: '保存成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.loadData();});
        },

        delBuyer(row){
          this.delBuyerInfo = true;
          this.buyingId = row.id;

        },
        delBuyerCancel(){
          this.delBuyerInfo = false;
        },
        doDelBuyer(){
          this.$api.doBuyingDel(this.buyingId).then(res => {
            if(res.status == this.$api.SUCCESS){
              this.delBuyerInfo = false;
              swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.loadData();});
            }else{
            }
          })
        },
        loadData() {
          this.doBuyingList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
        },
      },
      created(){
        this.doSearchReset();
        this.loadData();
      }
    }
</script>
