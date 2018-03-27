<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>系统管理</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
    </Breadcrumb>
      <Form :model="formUserSearch" :label-width="80" style="margin-top: 20px" ref="formUserSearch" >
        <Row>
          <Col span="20">
            <Col span="8">
            <FormItem label="用户名称">
              <Input v-model="formUserSearch.username" placeholder="请输入用户名称"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="用户类型">
              <Select v-model="formUserSearch.userType" placeholder="请选择用户类型">
                <Option value="">全部</Option>
                <Option value="P">平台用户</Option>
                <Option value="B">企业用户</Option>
                <Option value="C">个人用户</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="状态">
              <Select v-model="formUserSearch.status" placeholder="请选择状态">
                <Option value="">全部</Option>
                <Option value="00">可用</Option>
                <Option value="01">禁用</Option>
              </Select>
            </FormItem>
            </Col>
          </Col>
          <Col span="4">
            <Button type="ghost" style="float:right;margin-left: 10px;" @click="doReset('formUserSearch')">重置</Button>
            <Button type="primary" style="float:right;" @click="search()">查询</Button>
          </Col>
          <Col span="24">
            <Button type="primary" style="float:right;margin-bottom: 10px;" @click="add()">新增</Button>
          </Col>
        </Row>
      </Form>
    <div slot="body">
      <Table border :columns="userList" :data="userData"></Table>
      <Page :total="total" :page-size="pageSize" size="small"  show-elevator show-sizer show-total style="float: right;margin-top: 10px" @on-change="doPageChange" @on-page-size-change="doPageSizeChange"></Page>
      <Modal v-model="delUser" width="460">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>提示信息</span>
        </p>
        <div style="padding-left:20px">
          <span style="font-size:16px">您确定要删除此用户(<span>用户名:{{ delUsername }}</span>)吗？</span>
        </div>
        <div style="margin-top:20px" v-if="'SYS'!=delUserType">
          <Alert type="error" show-icon>删除业务用户,将连同人员信息一并删除</Alert>
        </div>
        <div slot="footer">
          <Button type="text" size="large" @click="deleteCancel">取消</Button>
          <Button type="error" size="large"  @click="doDelUser">删除</Button>
        </div>
      </Modal>

      <Modal
        title="用户信息"
        v-model="showUserInfo"
        :mask-closable="false"
        :loading="true"
        width="760px">
        <Form :model="formUser" label-position="top" ref="formUser" :rules="ruleValidate">
          <Row :gutter="10">
            <Col span="8">
            <FormItem label="用户名" prop="username">
              <Input v-show="false" v-model="formUser.userId"></Input>
              <Input type="text" :disabled="formUser.userId>0" v-model="formUser.username" placeholder="请输入用户名"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="手机号码" prop="mobile">
              <Input v-model="formUser.mobile" placeholder="请输入手机号码" :disabled="formUser.userType=='BIZ'"></Input>
            </FormItem>
            </Col>
            <Col span="8" >
            <FormItem label="电子邮箱" prop="email">
              <Input v-model="formUser.email" placeholder="请输入电子邮箱" :disabled="formUser.userType=='BIZ'"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
          <Col span="4">
          <FormItem label="用户类型" prop="userType">
            <Select v-model="formUser.userType" placeholder="请选择用户类型">
              <Option value="">请选择用户类型</Option>
              <Option value="P">平台用户</Option>
              <Option value="B">企业用户</Option>
              <Option value="C">个人用户</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="状态" prop="status">
            <Select v-model="formUser.status" >
              <Option value="00">可用</Option>
              <Option value="01">禁用</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="姓名" prop="employeeName">
              <Input v-model="formUser.employeeName" placeholder="请输入姓名"></Input>
            </FormItem>
          </Col>
          <Col span="8" v-if="formUser.userType=='B'">
            <FormItem label="所属企业客户" prop="bizId" :required="true">
              <Select v-model="formUser.bizId" >
                <Option v-for="item in bizOptionList" :value="item.bizId" :key="item.bizId">{{item.bizName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4" v-if="formUser.userType=='B'">
            <FormItem label="是否管理员" prop="bizId" :required="true">
              <i-switch size="large" true-value="Y" false-value="N" v-model="formUser.asAdmin">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
              </i-switch>
            </FormItem>
          </Col>
          </Row>
          <Row>
            <Col span="24" >
            <FormItem label="备注" prop="remarks">
              <el-input type="textarea" v-model="formUser.remarks" placeholder="请输入备注信息"></el-input>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="saveUserView">确定</Button>
      </div>
      </Modal>
      <Modal
        title="角色配置"
        v-model="showBindView"
        :mask-closable="false"
        :loading="true"
        @on-ok="doBindRole"
        width="350px">
        <Form :model="formBindRole" label-position="top">
          <Row>
            <Card>
              <p slot="title">业务角色</p>
              <Row class="expand-row">
                <CheckboxGroup v-model="formBindRole.bizRole" size="large">
                  <Checkbox v-for="value in bizRoleList" :label="value.roleId" style="width:100%">
                    <font style="font-size:14px;margin:4px">{{value.roleName}}</font>
                  </Checkbox>
                </CheckboxGroup>
              </Row>
            </Card>
            <Card style="margin-top: 10px">
              <p slot="title">系统角色</p>
              <Row class="expand-row">
                <CheckboxGroup v-model="formBindRole.sysRole" size="large">
                  <Checkbox v-for="value in sysRoleList" :label="value.roleId" style="width:100%">
                  <span style="font-size:14px;margin-right:6px;">{{value.roleName}}</span>
                  </Checkbox>
                </CheckboxGroup>
              </Row>
            </Card>
          </Row>
        </Form>
      </Modal>


      <Modal
        v-model="resetpwd"
        title="重置密码"
        @on-ok="doResetPwd">
        <p style="font-size:16px">您确定要为用户{{formRestPwd.username}}<B>重置密码</B>吗？
        </p>
        <BR/>
        <Form :model="formRestPwd" label-position="top">
          <Row :gutter="10"  v-show="formRestPwd.userType=='SYS'">
            <Col span="24">
            <FormItem label="手机号码 ( 重置密码将以短信形式发送到注册联系手机号码 ) ">
              <Input v-model="formRestPwd.mobile"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="10"  v-show="formRestPwd.userType=='BIZ'">
            <Col span="24">
            <FormItem label="手机号码 ( 重置密码将以短信形式发送到人员信息中的手机号码 ) ">
              <Input v-model="formRestPwd.mobile" :disabled="true" size="large"></Input>
            </FormItem>
            </Col>
          </Row>
        </Form>
    </Modal>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import swal from 'sweetalert2'

  export default {
    data(){
      return {
        formUserSearch:{userType:'',username:'',status:''},addUserInfo:false,
        total:0, pageSize:10, initStartIndex:0, initEndIndex:10,delUserType:null,
        delUser:false, resetpwd:false, delUsername:null, showUserInfo:false, showBindView:false, userId:0,
        bizRoleList:[], sysRoleList:[], formBindRole:{ bizRole:[], sysRole:[]},
        formUser: {
          userId: null,  username: '',   password: '',deletedFlag:'',bizId:null,employeeName:'',
          mobile: '',  email: '', userType: 'P',   remarks: '',  status:'00',orgId:null,asAdmin:'Y'
        },
        formRestPwd:{userId:null , mobile:'',username:'',userType:''},
        userList: [
          {type: 'index',width:55,align: 'center',width:60},
          {title: '用户名',key: 'username',align: 'center'},
          {title: '手机号码',key: 'mobile',align: 'center'},
          {title: '用户类型',key: 'userTypeLabel',align: 'center',width: 100},
          {title: '状态',key: 'statusLabel',align: 'center',width:90},
          {title: '最后更新时间',key: 'updatedDate',align: 'center',width:150},
          {title: '操作',key: 'action', width: 160, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button',{props:{type:'primary',size:'small'},style:{margin:'3px'},on:{click:()=>{this.showBindRole(params.row,'view')}}},'配置角色'),

                 h('Button',{props:{type:'primary',size:'small'},style:{margin:'3px'},on:{click:()=>{this.show(params.row,'view')}}},'详情'),

                h('Button',{props:{type:'primary',size:'small'},style:{margin:'3px'},on:{click:()=>{this.reset(params.row,'view')}}},'重置密码'),

                h('Button',{props:{type:'error',size:'small'},style:{margin:'3px'},on:{click:()=>{this.remove(params.row)}}},'删除')
              ]);
            }
          },
        ],userData: [],bizOptionList:[],
        ruleValidate: {
          username: [
            {required: true, message: '用户名称不能为空', trigger: 'blur' },
            {type: 'string', max: 40, message: '用户名称必须少于40个字符', trigger: 'blur' }
          ],

          mobile:[{required: true, validator:this.$validate.validatePhone, trigger: 'blur'}],
          email:[{type: 'email', max: 40, message: '请输入正确的电子邮箱', trigger: 'blur' }],
          userType:[{required: true, message: '请选择用户类型', trigger: 'blur' }],
          employeeName:[{required: true, message: '姓名不能为空', trigger: 'blur' },
                    {type:"string",max: 20, message: '姓名必须少于20个字符', trigger: 'blur'}],
          status:[{required: true, message: '请选择状态', trigger: 'blur' }],
          remarks:[{type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}]
        },
      }
    },
    methods: {
    doReset(){
        this.formUserSearch['userType'] = '';
        this.formUserSearch['username'] = '';
        this.formUserSearch['status'] = '';
    },

    saveUserView(){
      this.$refs['formUser'].validate(
          (valid) => {if(!valid)return false;
            this.$api.doUserSave(this.formUser).then(res => {
              if(res.status == "S"){
                this.showUserInfo = false;
                swal({text: '保存成功!',type: 'success',showCancelButton: false,width:350}).then((isConfirm)=>{this.search();});
              }else{
                swal({text:res.message,type: 'error',showCancelButton: false,width:350});
              }
            })
      })
    },
    remove (row) {
        this.userId = row.userId;
        this.delUsername = row.username
        this.delUser = true;
        this.delUserType = row.userType
    },
    deleteCancel(){
        this.delUser = false;
    },
    modalCancel() {
          this.showUserInfo = false;
          this.$refs['formUser'].resetFields();
    },
    reset (row) {
        this.resetpwd = true;
        this.formRestPwd.userId = row.userId
        this.formRestPwd.username = row.username
        this.formRestPwd.mobile = row.mobile
        this.formRestPwd.userType = row.userType
    },
    doResetPwd () {
        this.$api.doResetPwd(this.formRestPwd).then(res => {
          if(res.status == "S"){
            swal({text: '密码重置成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.resetpwd = false;});
          }else{
            swal({text: '操作失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
          }
        })
    },
    //showing add user page
    add(){
        this.$refs['formUser'].resetFields();
        this.showUserInfo = true;
        this.formUser = {
          userId: null,  username: '',   password: '',deletedFlag:'',bizId:null,employeeName:'',
          mobile: '',  email: '', userType: 'P',   remarks: '',  status:'00',orgId:-1,asAdmin:'N'
        };
    },
    //show user information
    show(row ,action){
        this.$refs['formUser'].resetFields();
        this.$api.doUserInfo({userId:row.userId}).then(res => {
          if(res.status == "S"){
            this.showUserInfo = true;
            this.formUser = res.result;
          }else{
            swal({text: '操作失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
          }
        })
    },
    showBindRole(row){
        this.bizRoleList = [];
        this.sysRoleList = [];
        this.$api.doUserRoles(true).then(res => {
          if(res.status == "S"){

            this.roleData = [];
            for(let record of res.result.records){
              if(record.roleType == 'SYS'){
                this.sysRoleList.push(record);
              }else{
                this.bizRoleList.push(record);
              }
            }
            this.formBindRole.bizRole = [];
            this.formBindRole.sysRole = [];
            this.$api.doUserRoleInfo({userId:row.userId}).then(res => {
              if(res.status == "S"){
                this.showBindView = true;
                this.userId = row.userId;
                for(let record of res.result){
                  if(record.roleType == 'SYS' || record.roleType == 'BIZ'){
                    this.formBindRole.sysRole.push(record.roleId);
                  }else{
                    this.formBindRole.bizRole.push(record.roleId);
                  }
                }
              }else{
                swal({text: '操作失败['+res.result.error+']',type: 'error',showCancelButton: false,width:300});
              }
            })
          }else{
            swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
          }
        })
    },
    doBindRole(){
        let roleIdList = [...this.formBindRole.bizRole,...this.formBindRole.sysRole];
        let params = {
          userId:this.userId,
          roleList:roleIdList
        };
        this.$api.doBindRoles(params).then(res => {
          if(res.status == "S"){
            this.formBindRole.bizRole = [];
            this.formBindRole.sysRole = [];
            this.showBindView = false;
            swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
          }else{
            swal({text: '操作失败['+res.result.error+']',type: 'error',showCancelButton: false,width:300});
          }
        })
    },

    //delete user
    doDelUser(){
        this.$api.doUserDel({userId:this.userId}).then(res => {
          if(res.status == "S"){
              this.delUser = false;
            swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
          }else{
            swal({text: '操作失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
          }
        })
    },
    //change page number
    doPageChange(pagenumber){
        let startIndex = ( pagenumber - 1 ) * this.pageSize;
        let endIndex = pagenumber * this.pageSize;
        this.search(startIndex,endIndex);
    },
    //change page size
    doPageSizeChange(pageSize){
        this.pageSize = pageSize;
        let startIndex = 0;
        let endIndex = this.pageSize;
        this.search(startIndex,endIndex);
    },
    //wrap parameter and get user list
    search(startIndex,endIndex){
        if(!startIndex) startIndex = this.$table.INIT_START_INDEX;
        if(!endIndex)endIndex = startIndex+this.pageSize
        let lStartIndex = startIndex,lEndIndex = endIndex;
        let params = {
          startIndex:lStartIndex, endIndex:lEndIndex,
          username:this.formUserSearch.username,
          status:this.formUserSearch.status,
          userType:this.formUserSearch.userType
      }

      this.$api.doUserList(params).then(res => {
          if(res.status == "S"){
            this.total = res.result.total;
            this.userData = [];
            for(let record of res.result.records){
              if(record){
                record.userTypeLabel = ("P"==record.userType) ? "平台用户" : (("B"==record.userType) ? "企业用户" : "终端用户")
                record.statusLabel = ("00"==record.status) ? "可用" : "禁用"
              }
              this.userData.push(record);
            }
          }else{
            swal('获取用户列表失败', res.message, 'error');
          }
        })
      },


      getBusinessList(){
        this.$api.getBusinessBaseList({startIndex:0, endIndex:9999,bizName:'',bizType:'',bizContactMan:'',loading:'N'}).then(res => {
            if(res.status == "S"){
                this.bizOptionList = res.result.records;
            }else{
                swal('获取企业信息失败', res.message, 'error');
            }
        })
      },
    },
    //init page data
    created(){this.search();this.getBusinessList()}
  }
</script>
