<style>
    .demo-upload-list{
        display: inline-block;
        width: 100px;
        height:100px;
        text-align: center;
        line-height:100px;
        border: 1px solid transparent;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 8px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 10px;
    }
</style>

<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商家管理</BreadcrumbItem>
      <BreadcrumbItem href="/biz/sales/baseList">商家信息管理</BreadcrumbItem>
      <BreadcrumbItem>商家信息维护</BreadcrumbItem>
    </Breadcrumb>
    <BR/>
      <Tabs value="tabinfomation" :animated="false" :value="selectedTab" style="height:800px"  @on-click=tabsClickFunc>
      <TabPane label="商家基本信息" name="base">
      <Form :model="formSalesBizBase"  label-position="top" ref="formSalesBizBase" :rules="formSalesBizBaseRuleValidate">
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="企业名称" prop="bizCorpName">
              <Input v-model="formSalesBizBase.bizCorpName"  placeholder="请输入商家企业名称" ></Input>
            </FormItem>
          </Col>

          <Col span="4">
            <FormItem label="法定代表人" prop="bizCorpBoss">
              <Input v-model="formSalesBizBase.bizCorpBoss"  placeholder="请输入法定代表人" ></Input>
            </FormItem>
          </Col>

          <Col span="4">
            <FormItem label="注册资金" prop="bizCorpInitAsset">
              <Input v-model="formSalesBizBase.bizCorpInitAsset"  placeholder="请输入注册资金" ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="企业经营地址" prop="bizCorpBizAddr">
              <Input v-model="formSalesBizBase.bizCorpBizAddr"  placeholder="请输入企业经营地址" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="商家名称" prop="bizName">
              <Input v-show="false" v-model="formSalesBizBase.bizId"></Input>
              <Input v-model="formSalesBizBase.bizName"  placeholder="请输入商家名称" ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="商家联系人" prop="bizContactMan">
              <Input v-model="formSalesBizBase.bizContactMan"  placeholder="请输入商家联系人" ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="联系电话(手机号码)" prop="bizTel">
              <Input v-model="formSalesBizBase.bizTel"  placeholder="请输入联系电话" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="联系邮箱" prop="bizEmail">
              <Input v-model="formSalesBizBase.bizEmail"  placeholder="请输入联系邮箱" ></Input>
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
            <FormItem label="邮编" prop="bizPostcode">
              <Input v-model="formSalesBizBase.bizPostcode"  placeholder="请输入邮编" ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="街区地址" prop="bizAddr">
              <Input v-model="formSalesBizBase.bizAddr"  placeholder="请输入街区地址" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
            <Col span="24" style = "float: right;">
              <FormItem label="备注" prop="bizRemark">
                <Input type="textarea" v-model="formSalesBizBase.bizRemark" :rows="3" placeholder="请输入备注信息"></Input>
              </FormItem>
            </Col>
        </Row>
        </Form>
        </TabPane>
        <TabPane label="经营范围" name="range">
            <Form :model="formSalesBizCorp"  label-position="top" ref="formSalesBizScope">
            <Row :gutter="10">
              <Col span="8">
                <FormItem label="经营范围" prop="corpName">
                  <Select v-model="formSalesBizCorp.businessScope" :multiple="true" placeholder="请选择经营范围">
                      <Option v-for="item in bizScopeList" :value="item.refKey">{{item.refValue}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            </Form>
        </TabPane>

        <TabPane label="企业资质" name="cert">
            <Form :model="formSalesBizLicense"  label-position="top" ref="formSalesBizLicense">
              <Row :gutter="10">
              <Col span="12">
              <div style="background:#eee;padding: 20px;">
                <Card :bordered="false">
                    <p slot="title">营业执照</p>
                    <a href="#" slot="extra">
                        <Checkbox v-model="formSalesBizLicense.validated" size="large">营业执照是否合格</Checkbox>
                    </a>
                    <p>
                    <div class="demo-upload-list" v-for="item in licenseUploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleViewOfLicense(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemoveOfLicense(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload v-if="licenseUploadList.length == 0"
                        ref="uploadOfLicense" :show-upload-list="false"  :default-file-list="defaultListOfLicense"
                        :on-success="handleSuccessOfLicense" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorOfLicense" :on-exceeded-size="handleMaxSizeOfLicense"
                        :before-upload="handleUploadOfLicense"
                        action="//jsonplaceholder.typicode.com/posts/"  style="display:inline-block">
                        <div style="width:150px;line-height:50px;text-align:center">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>上传营业执照</p>
                        </div>
                    </Upload>
                    <Modal title="营业执照" v-model="visible">
                        <img :src="'http://image.woshipm.com/wp-files/2017/04/x7qc4pIXrUXSpHYdRUfL.jpg'" v-if="visible" style="width: 100%">
                    </Modal>
                    </p>
                  </Card>
                </div>
                </Col>


                <Col span="12">
                <div style="background:#eee;padding: 20px;">
                <Card :bordered="false">
                    <p slot="title">税务登记证</p>
                    <a href="#" slot="extra">
                        <Checkbox v-model="formSalesBizTax.validated" size="large">税务登记证是否合格</Checkbox>
                    </a>
                    <p>
                    <div class="demo-upload-list" v-for="item in taxUploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleViewOfTax(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemoveOfTax(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload v-if="taxUploadList.length == 0"
                        ref="uploadOfTax" :show-upload-list="false"  :default-file-list="defaultListOfTax"
                        :on-success="handleSuccessOfTax" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorOfTax" :on-exceeded-size="handleMaxSizeOfTax"
                        :before-upload="handleUploadOfTax"
                        action="//jsonplaceholder.typicode.com/posts/"  style="display:inline-block">
                        <div style="width:150px;line-height:50px;text-align:center">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>上传税务登记证照片</p>
                        </div>
                    </Upload>
                    <Modal title="税务登记证照片" v-model="visible">
                        <img :src="'http://image.woshipm.com/wp-files/2017/04/x7qc4pIXrUXSpHYdRUfL.jpg'" v-if="visible" style="width: 100%">
                    </Modal>
                    </p>
                  </Card>
                </div>
                </Col>
                </Row>

                <Row :gutter="10">
                <Col span="12">
                <div style="background:#eee;padding: 20px">
                <Card :bordered="false">
                    <p slot="title">法人代表身份证</p>
                    <a href="#" slot="extra">
                        <Checkbox v-model="formSalesBizIdCard.validated" size="large">身份证是否合格</Checkbox>
                    </a>
                    <p>
                    <div class="demo-upload-list" v-for="item in idcardUploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleViewOfIdCard(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemoveOfIdCard(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload v-if="idcardUploadList.length == 0"
                        ref="uploadOfIdCard" :show-upload-list="false"  :default-file-list="defaultListOfIdCard"
                        :on-success="handleSuccessOfIdCard" :format="['jpg','jpeg','png']" :max-size="2048"
                        :on-format-error="handleFormatErrorOfIdCard" :on-exceeded-size="handleMaxSizeOfIdCard"
                        :before-upload="handleUploadOfIdCard"
                        action="//jsonplaceholder.typicode.com/posts/"  style="display:inline-block">
                        <div style="width:150px;line-height:50px;text-align:center">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>上传法人代表身份证</p>
                        </div>
                    </Upload>
                    <Modal title="法人代表身份证" v-model="visible">
                        <img :src="'http://image.woshipm.com/wp-files/2017/04/x7qc4pIXrUXSpHYdRUfL.jpg'" v-if="visible" style="width: 100%">
                    </Modal>
                    </p>
                  </Card>

                </div>
                </Col>
                </Row>
            </Form>
        </TabPane>

        <TabPane label="账户与权限" name="admin">
            <Form :model="formSalesBizAccount"  label-position="top" ref="formSalesBizAccount" :rules="formSalesBizAccountRuleValidate">
            <Row :gutter="10">
              <Col span="8">
                <FormItem label="商家权限角色" prop="bizRoleId">
                  <Select v-model="formSalesBizAccount.bizRoleId">
                      <Option v-for="item in bizRoleList" :value="item.roleId">{{item.roleName}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col span="8">
                <FormItem label="管理员账户" prop="username">
                  <Input v-model="formSalesBizAccount.username"  placeholder="请输入管理员账户" ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col span="8">
                <FormItem label="管理员登录密码" prop="password">
                  <Input type="password" v-model="formSalesBizAccount.password"  placeholder="请输入管理员登录密码" ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col span="8">
                <FormItem label="确认登录密码" prop="confirmPassword">
                  <Input type="password" v-model="formSalesBizAccount.confirmPassword"  placeholder="请输入确认登录密码" ></Input>
                </FormItem>
              </Col>
            </Row>
            </Form>
        </TabPane>
        <Button type="primary" slot="extra" style="margin:4px" @click="saveBizSales()">保存商家信息</Button>
        </Tabs>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  import areaselect from '../../../components/area-select.vue';
  export default {
    components: {areaselect},
    data () {
        const addressChecker = (rule, value, callback) => {
              if (this.distpicker!=null && this.distpicker.length>0) {
                  callback();
              }else{callback(new Error('所在省 / 市 / 区 不能为空'));}
        };
      return {
        formSalesBizBase:{
            bizId:'', bizName:'',bizContactMan:'',bizTel:'',bizEmail:'',roleId:'',bizAddr:'',
            bizPostcode:'',bizRemark:'',bizStatus:'00',bizType:'SALES',businessScope:[],bizCorpName:'',
            bizCorpBoss:'',bizCorpBizAddr:'',bizCorpInitAsset:'',createdBy:'',createdDate:null
        },
        formSalesBizCorp:{businessScope:''},

        formSalesBizAccount:{userId:'',username:'',password:'',confirmPassword:'',bizRoleId:'' , userType:'B'},
        formSalesBizLicense:{fileUrl:'',file: null , status:false,validated:false},
        formSalesBizTax:{fileUrl:'',file: null , status:false,validated:false},
        formSalesBizIdCard:{fileUrl:'',file: null , status:false,validated:false},

        salesBizInfo:false,distpicker:[],bizRoleList: [],bizScopeList:[],selectedTab:'base',
        formSalesBizBaseRuleValidate: {
            bizCorpName: [{required: true, message: '企业名称不能为空', trigger: 'blur'}],
            bizCorpBoss: [{type: 'string', max: 20, message: '法定代表人不能超过20个字符', trigger: 'blur' }],
            bizCorpInitAsset:[{ type: 'string', max: 20, message: '注册资金不能超过20个字符', trigger: 'blur' }],
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
            distpicker: [{validator:addressChecker, trigger: 'change' }],
            bizAddr:[{required: true, message: '街区地址不能为空', trigger: 'blur'}],
            bizPostcode:[{required: true, message: '商家联系人不能为空', trigger: 'blur'}],
        },

        formSalesBizAccountRuleValidate: {
            bizRoleId: [{validator:(rule, value, callback) => {
              if(this.formSalesBizAccount.bizRoleId){callback();}else{callback(new Error('商家权限角色不能为空'));}
            }, trigger:'change'}],
            username:[{required: true, message: '管理员账户不能为空', trigger: 'blur'}],
            password:[{required: true, message: '管理员登录密码不能为空', trigger: 'blur'}],
            confirmPassword: [{validator:(rule, value, callback) => {
              if(this.formSalesBizAccount.password==this.formSalesBizAccount.confirmPassword){callback();}else{
              callback(new Error('两次输入密码不一致'));}
            }, trigger: 'change' }]
        },




        defaultListOfLicense: [
          {'name': 'x7qc4pIXrUXSpHYdRUfL','url': 'http://image.woshipm.com/wp-files/2017/04/x7qc4pIXrUXSpHYdRUfL.jpg'}
        ],
        defaultListOfTax: [
          {'name': 'x7qc4pIXrUXSpHYdRUfL','url': 'http://image.woshipm.com/wp-files/2017/04/x7qc4pIXrUXSpHYdRUfL.jpg'}
        ],
        defaultListOfIdCard: [
          {'name': 'x7qc4pIXrUXSpHYdRUfL','url': 'http://image.woshipm.com/wp-files/2017/04/x7qc4pIXrUXSpHYdRUfL.jpg'}
        ],
        imgName: '',visible: false,licenseUploadList:[],idcardUploadList:[],taxUploadList:[],

      }
    },
    methods: {
        tabsClickFunc(tabIndex){this.selectedTab = tabIndex},
        handleMaxSizeOfLicense(file) {
            swal({text: '营业执照照片太大，上传文件最大不能超过2M', type: 'error',showCancelButton: false,width:300});
        },
        handleMaxSizeOfTax(file) {
            swal({text: '税务登记证照片太大，上传文件最大不能超过2M', type: 'error',showCancelButton: false,width:300});
        },
        handleMaxSizeOfIdCard(file) {
            swal({text: '法人代表身份证照片太大，上传文件最大不能超过2M', type: 'error',showCancelButton: false,width:300});
        },
        handleFormatErrorOfLicense(file){//"['jpg','jpeg','png']"
            swal({text:"营业执照照片格式不支持，上传图片格式必须为'jpg'、'jpeg'或'png'", type: 'error',showCancelButton: false,width:300});
        },
        handleFormatErrorOfTax(file){//"['jpg','jpeg','png']"
            swal({text:"税务登记证照片格式不支持，上传图片格式必须为'jpg'、'jpeg'或'png'", type: 'error',showCancelButton: false,width:300});
        },
        handleFormatErrorOfIdCard(file){//"['jpg','jpeg','png']"
            swal({text:"法人代表身份证照片格式不支持，上传图片格式必须为'jpg'、'jpeg'或'png'", type: 'error',showCancelButton: false,width:300});
        },
        handleUploadOfLicense(){return true;},handleUploadOfTax(){return true;},handleUploadOfIdCard(){return true;},
        handleSuccessOfLicense(res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleSuccessOfTax(res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleSuccessOfIdCard(res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleView (name) {this.imgName = name;this.visible = true;},
        handleRemoveOfLicense(file) {
            const fileList = this.$refs.uploadOfLicense.fileList;
            this.$refs.uploadOfLicense.fileList.splice(fileList.indexOf(file), 1);
        },
        handleRemoveOfTax(file) {
            const fileList = this.$refs.uploadOfTax.fileList;
            this.$refs.uploadOfTax.fileList.splice(fileList.indexOf(file), 1);
        },
        handleRemoveOfIdCard(file) {
            const fileList = this.$refs.uploadOfIdCard.fileList;
            this.$refs.uploadOfIdCard.fileList.splice(fileList.indexOf(file), 1);
        },


        clearSalesBizInfo(){
            this.formSalesBizBase = {
                bizId:'', bizName:'',bizContactMan:'',bizTel:'',bizEmail:'',roleId:'',bizAddr:'',
                bizPostcode:'',bizRemark:'',bizStatus:'00',bizType:'SALES'
            };
        },
        saveBizSales(){
            let validResult = false
            this.$refs['formSalesBizBase'].validate((valid) => {validResult = valid;});
            if(!validResult){
                this.selectedTab = 'base'
                this.$Message.error('商家基本信息填写错误');
                return false;
            }
            this.$refs['formSalesBizAccount'].validate((valid) => {validResult = valid;});
            if(!validResult){
                this.selectedTab = 'admin'
                this.$Message.error('账户与权限填写错误');
                return false;
            }

            this.formSalesBizBase.bizProvince = this.distpicker[0]
            this.formSalesBizBase.bizCity = this.distpicker[1]
            this.formSalesBizBase.bizDistrict = this.distpicker[2]
            this.formSalesBizBase.roleId = this.formSalesBizAccount.bizRoleId;

            this.$api.doBusinessSave({business:this.formSalesBizBase,businessAdmin:this.formSalesBizAccount}).then(res => {
                if(res.status == "S"){
                  swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.showBizSales(res.result.bizId); this.salesBizInfo = false;this.clearSalesBizInfo();});
                }else{
                  swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                }
            })

        },
        showBizSales(id){
            this.$api.doBusinessBaseInfo(id).then(res => {
              if(res.status == "S"){
                  this.formSalesBizBase = res.result;
                  this.distpicker.push(this.formSalesBizBase.bizProvince)
                  this.distpicker.push(this.formSalesBizBase.bizCity)
                  this.distpicker.push(this.formSalesBizBase.bizDistrict)
              }else{
                  swal({text: '查询商户信息失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
            })
        },

        getBizRoleList(){
            this.$api.getBizRoleList('BIZ').then(res => {
                if(res.status == "S"){
                    this.bizRoleList = res.result.records;
                }
            })
        },
        getBizScopeList(){
            this.$api.getParamCategory('BUSINESS_SCOPE').then(res => {
                if(res.status == "S"){
                    this.bizScopeList = res.result;
                }
            })
        }

    },
    created(){
        if(this.$route.params.id){
            this.showBizSales(this.$route.params.id);
        }
        this.getBizScopeList();
        this.getBizRoleList();
    },
    mounted (){
        this.licenseUploadList = this.$refs.uploadOfLicense.fileList;
    }
  }
</script>
