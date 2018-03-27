<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商家管理</BreadcrumbItem>
      <BreadcrumbItem>商家信息管理</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formSearch" :label-width="80" style="margin-top: 20px">
      <Row>
        <Col span="20">
          <Col span="8">
            <FormItem label="商家名称">
              <Input v-model="formSearch.bizName" placeholder="请输入商家名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商家联系人">
              <Input v-model="formSearch.bizContactMan" placeholder="请输入商家联系人"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input v-model="formSearch.bizTel" placeholder="请输入联系人电话"></Input>
            </FormItem>
          </Col>
        </Col>
        <Col span="4">
          <Button type="ghost" style="float:right;margin-left:10px;" @click="doReset()">重置</Button>
          <Button type="primary" style="float:right" @click="search()">查询</Button>
        </Col>
        <Col span="24">
          <Button type="primary" style="float:right;margin-bottom:10px;" @click="addSalesBiz()" >新增</Button>
        </Col>
      </Row>
    </Form>

    <Table border :columns="salesBizList" :data="salesBizData"></Table>
    <Page :total="total" :page-size="pageSize" size="small"  show-elevator show-sizer show-total style="float: right;margin-top: 10px" @on-change="doPageChange"   @on-page-size-change="doPageSizeChange"></Page>



    <Modal v-model="frezzSalesBiz" width="460">
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="information-circled"></Icon>
            <span>提示信息</span>
        </p>
        <div style="margin:10px">
            <span style="font-size:16px">您确定要冻结此商户吗？</span>
        </div>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelFreezeSalesBiz()">取消</Button>
          <Button type="error" size="large"  @click="confirmFreezeSalesBiz()">冻结</Button>
        </div>
    </Modal>

    <Modal v-model="cancelFrezzeSalesBiz" width="460">
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="information-circled"></Icon>
            <span>提示信息</span>
        </p>
        <div style="margin:10px">
            <span style="font-size:16px">您确定要解除冻结此商户吗？</span>
        </div>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelCancelFreezeSalesBiz()">取消</Button>
          <Button type="error" size="large"  @click="confirmCancelFreezeSalesBiz()">解除冻结</Button>
        </div>
    </Modal>


    <Modal v-model="deleteSalesBiz" width="460">
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="information-circled"></Icon>
            <span>提示信息</span>
        </p>
        <div style="margin:10px">
            <span style="font-size:16px">您确定要删除此商户吗？</span>
        </div>
        <div slot="footer">
          <Button type="text" size="large" @click="cancelDeleteSalesBiz()">取消</Button>
          <Button type="error" size="large"  @click="confirmDeleteSalesBiz()">删除</Button>
        </div>
    </Modal>



    <Modal
      title="商家信息" v-model="salesBizInfo" width="850px">
      <Form :model="formSalesBiz"  label-position="top" ref="formSalesBiz" :rules="formSalesBizRuleValidate">
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="商家名称" prop="bizName">
              <Input v-show="false" v-model="formSalesBiz.bizId"></Input>
              <Input v-model="formSalesBiz.bizName"  placeholder="请输入商户名称" ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="商家联系人" prop="bizContactMan">
              <Input v-model="formSalesBiz.bizContactMan"  placeholder="请输入商家联系人" ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="联系电话(手机号码)" prop="bizTel">
              <Input v-model="formSalesBiz.bizTel"  placeholder="请输入联系电话" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="联系邮箱" prop="bizEmail">
              <Input v-model="formSalesBiz.bizEmail"  placeholder="请输入联系邮箱" ></Input>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem label="所在省 / 市 / 区" prop="distpicker">
                <areaselect ref="areaselect" :level="2" type="text" v-model='distpicker' placeholder="请选择省/市/区"></areaselect>
            </FormItem>
           </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="商家权限角色" prop="roleId">
              <Select v-model="formSalesBiz.roleId">
                  <Option v-for="item in bizRoleList" :value="item.roleId">{{item.roleName}}</Option>
              </Select>
            </FormItem>
          </Col>
            </FormItem>
          </Col>
           <Col span="8">
            <FormItem label="街区地址" prop="bizAddr">
              <Input v-model="formSalesBiz.bizAddr"  placeholder="请输入街区地址" ></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="邮编" prop="bizPostcode">
              <Input v-model="formSalesBiz.bizPostcode"  placeholder="请输入邮编" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
            <Col span="24" style = "float: right;">
              <FormItem label="备注" prop="bizRemark">
                <Input type="textarea" v-model="formSalesBiz.bizRemark" :rows="3" placeholder="请输入备注信息"></Input>
              </FormItem>
            </Col>
        </Row>
        </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancelUpdateSalesBiz()">取消</Button>
        <Button type="primary" size="large"  @click="saveSalesBiz()">保存</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import swal from 'sweetalert2'
  import areaselect from '../../../components/area-select.vue';
  export default {
    components: {areaselect},
    data () {
        const roleIdChecker = (rule, value, callback) => {
              if (this.formSalesBiz.roleId) {
                  callback();
              }else{callback(new Error('商家权限角色不能为空'));}
        };

        const addressChecker = (rule, value, callback) => {
              if (this.distpicker!=null && this.distpicker.length>0) {
                  callback();
              }else{callback(new Error('所在省 / 市 / 区 不能为空'));}
        };
      return {
        total:0,pageSize:10, formSearch:{bizName:'',bizType:'S',bizContactMan:'',bizTel:''},
        frezzSalesBizRecord:null,frezzSalesBiz:false,
        formSalesBiz:{
            bizId:'', bizName:'',bizContactMan:'',bizTel:'',bizEmail:'',roleId:'',bizAddr:'',
            bizPostcode:'',bizRemark:'',bizStatus:'00',bizType:'S'
        },cancelFrezzeSalesBiz:false,cancelFrezzeSalesBizRecord:null,
        salesBizInfo:false,distpicker:[],deleteSalesBiz:false,deleteSalesBizRecord:null,
        salesBizList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '商家编号', key: 'bizId', align: 'center',width:90,},
          { title: '商家名称', key: 'bizName', align: 'center' },
          { title: '商家联系人', key: 'bizContactMan', align: 'center' },
          { title: '联系电话', key: 'bizTel', align: 'center' },
          { title: '状态',align: 'center' ,width: 70 ,render:(h,params) => {return params.row.bizStatus === '00' ? "可用":"冻结"}},
          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.show(params.row) } } }, '详情'),
                  h('Button', { props: { type: params.row.bizStatus === '01' ?'ghost':'error', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { params.row.bizStatus === '01' ? this.requestCancelFreezeSalesBiz(params.row):this.requestFreezeSalesBiz(params.row) } } }, params.row.bizStatus === '01' ?'解冻':'冻结'),
                  h('Button', { props: { type: 'error', size: 'small' },
                    on: { click: () => { this.requestDeleteSalesBiz(params.row) } } }, '删除')
                ]);
            }
          }
        ],salesBizData: [],bizRoleList: [],
        formSalesBizRuleValidate: {
          bizName: [{required: true, message: '商户名称不能为空', trigger: 'blur'}],
          bizContactMan:[{required: true, message: '商家联系人不能为空', trigger: 'blur'}],
          bizTel: [
            {required: true, message: '联系电话(手机号码)不能为空', trigger: 'blur' },
            {validator:this.$validate.validatePhone, trigger: 'blur' }
          ],
          bizEmail: [
            {required: true, message: '联系邮箱不能为空', trigger: 'blur' },
            {validator:this.$validate.validateEmail, trigger: 'blur' }
          ],
          roleId: [{validator:roleIdChecker, trigger:'change'}],
          distpicker: [{validator:addressChecker, trigger: 'change' }],
          bizAddr:[{required: true, message: '街区地址不能为空', trigger: 'blur'}],
          bizPostcode:[{required: true, message: '商家联系人不能为空', trigger: 'blur'}],
        },
      }
    },
    methods: {
        search(startIndex,endIndex){
            let params = {
                startIndex:startIndex?startIndex : 0,
                endIndex:endIndex ? endIndex : this.pageSize,
                bizName:this.formSearch.bizName,bizType:'S',
                bizContactMan:this.formSearch.bizContactMan,
            }
            this.$api.getBusinessBaseList(params).then(res => {
                this.salesBizData = [];
                if(res.status == "S"){
                  this.total = res.result.total;
                  this.salesBizData = res.result.records;
                }else{
                  swal('获取商户列表信息失败', res.message, 'error');
                }
            })
        },
        clearSalesBizInfo(){
            this.formSalesBiz = {
                bizId:'', bizName:'',bizContactMan:'',bizTel:'',bizEmail:'',roleId:'',bizAddr:'',
                bizPostcode:'',bizRemark:'',bizStatus:'00',bizType:'S'
            };
        },
        //change page number
        doPageChange(pagenumber){
            let startIndex = ( pagenumber - 1 ) * this.pageSize;
            let endIndex = pagenumber * this.pageSize;
            this.doCustomerList(startIndex,endIndex);
        },
        //change page size
        doPageSizeChange(pageSize){
            this.pageSize = pageSize;
            let startIndex = 0;
            let endIndex = this.pageSize;
            this.search(startIndex,endIndex);
        },

        show (row) {
            /**this.$refs['formSalesBiz'].resetFields();
            this.$api.doBusinessBaseInfo(row.bizId).then(res => {
              if(res.status == "S"){
                  this.salesBizInfo = true;
                  this.formSalesBiz = res.result;
                  this.distpicker.push(this.formSalesBiz.bizProvince)
                  this.distpicker.push(this.formSalesBiz.bizCity)
                  this.distpicker.push(this.formSalesBiz.bizDistrict)
              }else{
                  swal({text: '查询商户信息失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
            })**/

            this.$router.push('/biz/sales/base/'+row.bizId)
        },

        addSalesBiz(){
            this.$router.push('/biz/sales/base')
            //this.salesBizInfo = true;
            //this.$refs["formSalesBiz"].resetFields();
            //this.clearSalesBizInfo();
        },

        saveSalesBiz(){
            let validResult = false
            this.$refs['formSalesBiz'].validate((valid) => {validResult = valid;});
            if(!validResult)return false;

            this.formSalesBiz.bizProvince = this.distpicker[0]
            this.formSalesBiz.bizCity = this.distpicker[1]
            this.formSalesBiz.bizDistrict = this.distpicker[2]


            this.$api.doBusinessBaseSave(this.formSalesBiz).then(res => {
                if(res.status == "S"){
                  swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.search();});
                  this.salesBizInfo = false;this.clearSalesBizInfo();
                }else{
                  swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                }
            })

        },

        requestFreezeSalesBiz(row) {
            this.frezzSalesBiz = true;this.frezzSalesBizRecord = row;
        },

        requestCancelFreezeSalesBiz(row) {
            this.cancelFrezzeSalesBiz = true;this.cancelFrezzeSalesBizRecord = row;
        },

        requestDeleteSalesBiz(row) {
            this.deleteSalesBiz = true;this.deleteSalesBizRecord = row;
        },

        confirmFreezeSalesBiz(){
            //01 == freeze
            this.$api.freezeSalesBiz(this.frezzSalesBizRecord.bizId ,"01").then(res => {
                  if(res.status == "S"){
                      swal({text: '冻结成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
                      this.cancelFreezeSalesBiz();
                  }else{
                      swal('冻结商家失败', res.message, 'error');
                  }
              })
        },
        confirmCancelFreezeSalesBiz(){
            //01 == freeze
            this.$api.freezeSalesBiz(this.cancelFrezzeSalesBizRecord.bizId ,"00").then(res => {
                  if(res.status == "S"){
                      swal({text: '解除冻结成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
                      this.cancelCancelFreezeSalesBiz();
                  }else{
                      swal('解除冻结商家失败', res.message, 'error');
                  }
              })
        },

        confirmDeleteSalesBiz(){
            this.$api.doBusinessBaseDel(this.deleteSalesBizRecord.bizId).then(res => {
                  if(res.status == "S"){
                      swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
                      this.cancelDeleteSalesBiz();
                  }else{
                      swal('删除商家失败', res.message, 'error');
                  }
              })
        },

        cancelFreezeSalesBiz(){this.frezzSalesBiz = false;this.frezzSalesBizRecord=null},
        cancelCancelFreezeSalesBiz(){this.cancelFrezzeSalesBiz = false;this.cancelFrezzeSalesBizRecord=null},
        cancelDeleteSalesBiz(){this.deleteSalesBiz = false;this.deleteSalesBizRecord=null},

        cancelUpdateSalesBiz(){
            this.salesBizInfo = false ;
            this.formSalesBiz = {
                bizId:'', bizName:''
            }
        },

        getBizRoleList(){
            this.$api.getBizRoleList('BIZ').then(res => {
                if(res.status == "S"){
                    this.bizRoleList = res.result.records;
                }
            })
        }

    },
    created(){
      	this.search();
        this.getBizRoleList();
    }
  }
</script>
