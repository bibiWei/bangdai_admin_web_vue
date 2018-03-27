<template>

  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>系统设置</BreadcrumbItem>
      <BreadcrumbItem>部门设置</BreadcrumbItem>
    </Breadcrumb>

    <Row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <Col span="24">
        <Tabs value="tabinfomation" :animated="false" type="card" :value="selectedTab"  @on-click=tabsClickFunc>
          <TabPane label="部门设置" name="dept">

            <div class="ivu-row">
              <div class="wrapper-navigate ivu-col ivu-col-span-6">
                  <s-tree :tree-data = "treeData" @node-click="nodeClick"></s-tree>
              </div>
              <div class="ivu-col ivu-col-span-18">
                  <Row>
                  <Col span="24">

                      <Button icon="plus-round" type="primary" style="float:right;margin:4px;" @click="requestAddEmployee">新增员工</Button>

                      <Button icon="refresh" type="primary" style="float:right;margin:4px;" @click="refreshAll">刷新</Button>
                  </Col>
                  <Col span="24">
                  <Table border :columns="memeberList" :data="memeberListData"></Table>
                  </Col>
                  </Row>
              </div>
            </div>


          </TabPane>
          <TabPane label="角色设置" name="role">
              <Row>
                <Col span="24">
                    <Button icon="plus-round" type="primary" style="float:right;margin:4px;" @click="requestAddRole">新增角色</Button>
                </Col>
                <Col span="24">
                    <Table border :columns="roleList" :data="roleListData"></Table>
                </Col>
              </Row>
          </TabPane>
        </Tabs>
      </Col>
    </Row>


    <Modal
        title="角色信息" v-model="showRoleInfo" :mask-closable="false" width="400px">
        <Form :model="formRole" label-position="top" ref="formRole" :rules="ruleValidate">
          <Row>
            <Col span="24">
            <FormItem label="角色名称" prop="roleName">
              <Input  type="text" v-model="formRole.roleName" :name="formRole.roleName" placeholder="请输入角色名称"></Input>
            </FormItem>
            </Col>
            <Col span="24" >
            <FormItem label="备注" prop="remarks">
              <el-input type="textarea"  placeholder="请输入备注信息" v-model="formRole.remarks"></el-input>
            </FormItem>
            </Col>
          </Row>
        </Form>

        <div slot="footer">
          <Button type="text" size="large" @click="modalRoleCancel">取消</Button>
          <Button type="primary" size="large" @click="doSaveRole">确定</Button>
      </div>
    </Modal>

    <Modal v-model="delRoleInfo" width="460">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>提示信息</span>
        </p>
        <div style="text-align:left;margin:6px">
          <span style="font-size:16px">您确定要删除此角色&nbsp;(&nbsp;<B>角色名称:{{ delRoleRecord==null ? '':delRoleRecord.roleName }}</B>&nbsp;)&nbsp;吗？</span>
        </div>
        <div slot="footer">
        <Button type="text" size="large" @click="cancelDelRoleInfo">取消</Button>
        <Button type="error" size="large"  @click="doDelRoleInfo">删除</Button>
      </div>
    </Modal>


    <Modal v-model="delEmployeeInfo" width="460">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>提示信息</span>
        </p>
        <div style="text-align:left;margin:6px">
          <span style="font-size:16px">您确定要删除此员工&nbsp;(&nbsp;<B>角色名称:{{ delEmployeeRecord==null ? '':delEmployeeRecord.employeeName }}</B>&nbsp;)&nbsp;吗？</span>
        </div>
        <div slot="footer">
        <Button type="text" size="large" @click="cancelDelEmployeeInfo">取消</Button>
        <Button type="error" size="large"  @click="doDelEmployeeInfo">删除</Button>
      </div>
    </Modal>


    <Modal
        title="权限配置"  v-model="showRoleMenu"  :mask-closable="false" width="400px">
        <Form :model="formRoleMenu" label-position="top">
          <Row>
            <Alert type="warning" v-if="emptyMenuList" show-icon>请选择要绑定菜单</Alert>
            <Tree :data="menuData" show-checkbox style="font-size: 18px" ref="tree"></Tree>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="modalRoleMenuCancel">取消</Button>
          <Button type="primary" size="large" @click="doRoleBindMenu">确定</Button>
      </div>
    </Modal>



    <Modal
        title="员工信息" v-model="showEmployeeInfo" :mask-closable="false" width="600px">
        <Form :model="formEmployee" label-position="top" ref="formEmployee" :rules="ruleValidateOfEmployee">
         <Row :gutter="10">
            
            <Col span="12">
            <FormItem label="员工名称" prop="employeeName">
              <Input  type="text" v-model="formEmployee.employeeName" placeholder="请输入员工名称"></Input>
            </FormItem>
            </Col>
            
            <Col span="12">
            <FormItem label="部门" prop="orgId">
                <treeselect :multiple="false" :searchable="false" :load-root-options="loadRootOptions"  :default-expand-level="1"
                   :close-on-select="true" placeholder="请选择部门" v-model="formEmployee.orgId"/>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="登录账户" prop="userName">
              <Input  type="text" v-model="formEmployee.userName" placeholder="请输入登录账户"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="登录密码" prop="userName">
              <Input  type="password" v-model="formEmployee.password" placeholder="请输入登录密码"></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="手机号码" prop="mobile">
              <Input v-model="formEmployee.mobile" placeholder="请输入手机号码"></Input>
            </FormItem>
            </Col>

            <Col span="12">
            <FormItem label="电子邮箱" prop="email">
              <Input v-model="formEmployee.email" placeholder="请输入电子邮箱"></Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="角色" prop="roleIds">
                <Select v-model="formEmployee.roleIds" placeholder="请选择员工角色" multiple>
                  <Option v-for="item in roleListData" :value="item.roleId" :key="item.roleId">{{item.roleName}}</Option>
                </Select>
            </FormItem>
            </Col>
          </Row>
        </Form>

        <div slot="footer">
          <Button type="text" size="large" @click="modalEmployeeCancel">取消</Button>
          <Button type="primary" size="large" @click="doSaveEmployee">确定</Button>
      </div>
    </Modal>
  </div>

</template>
<script  type="text/babel">
  import swal from 'sweetalert2'
  import sTree from "../../components/tree";
  import Treeselect from '@riophae/vue-treeselect'
  import {mapGetters} from 'vuex'
  import eventbus from "../../../static/util/eventbus.js";
  export default {
    components:{sTree,Treeselect},
    computed: mapGetters({
        userInfo: 'userInfo',
    }),
    data(){
      return {treeData: [], selectedTab:'dept',showRoleInfo:false,delRoleInfo:false,delRoleRecord:null,
        delEmployeeInfo:false,delEmployeeRecord:null,
        showRoleMenu:false,emptyMenuList:false,formRoleMenu:{ },editRoleId:null,showEmployeeInfo:false,
        menuData:[{expand: true, title: '系统菜单',children: []}],
        memeberList:[
          {title: '账号',key: 'userName',align: 'center'},
          {title: '员工姓名',key: 'employeeName',align: 'center'},
          {title: '部门',key: 'orgName',align: 'center'},
          {title: '角色名称', key: 'roleName',align: 'center',
            render: (h, params) => {              
                let roleNames = "";
                for(let name of params.row.roleNameList){
                    roleNames += (roleNames==''?"":",")+name
                }
                return roleNames
            }},
          { title: '操作',key: 'action',width: 130,align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props:{type: 'primary',size: 'small'},style: {margin: '3px'},on: { click: () => { this.showEmployee(params.row)}}}, '详情'),
                h('Button', {props:{type: 'error',size: 'small'},style: {margin: '3px'},on: { click: () => { this.requestDelEmployee(params.row)}}}, '删除')
              ]);
            }
          }
        ],memeberListData:[],
        roleList:[
          {type: 'index',width:70,align: 'center'},
          {title: '角色名',key: 'roleName',align: 'center'},
          {title: '备注', key: 'remarks',align: 'center'},
          { title: '操作',key: 'action',align: 'center',width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {props:{type: 'primary',size: 'small'},style: {margin: '2px'},on: {click: () => {this.showBindMenu(params.row)}} }, '权限设置'),
                h('Button', {props:{type: 'error',size: 'small'},style: {margin: '3px'},on: { click: () => { this.requestDelBizRole(params.row)}}}, '删除')
              ]);
            }
          }
        ],
        roleListData:[],
        formRole:{roleId:null,roleName:'',roleType:'BIZ',status:'00',remarks:'',bizId:null},
        ruleValidate: {
            roleName: [
              { required: true, message: '角色名称不能为空', trigger: 'blur' },
              { type: 'string', max: 40, message: '角色名称必须少于40个字符', trigger: 'blur' }
            ],
            remarks: [
              {type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}
            ]
        },

        formEmployee:{username:'',employeeName:'',remarks:'',roleIds:[],orgId:null,bizId:null,userId:'',mobile:'',email:''},
        ruleValidateOfEmployee: {
            employeeName: [
              { required: true, message: '员工姓名不能为空', trigger: 'blur' },
              { type: 'string', max: 40, message: '员工姓名必须少于40个字符', trigger: 'blur' }
            ],
            orgId: [
              {required: true, message: '部门不能为空', trigger: 'blur' }
            ],
            userName: [
              { required: true, message: '用户名称不能为空', trigger: 'blur' },
              { type: 'string', max: 40, message: '用户名称必须少于40个字符', trigger: 'blur' }
            ],
            mobile: [
              { required: true, validator:this.$validate.validatePhone, trigger: 'blur' }
            ],
            email: [
              { type: 'email', max: 40, message: '请输入正确的电子邮箱', trigger: 'blur' }
            ],
            roleIds: [{validator:(rule, value, callback) => {
              if(this.formEmployee.roleIds.length>0){callback();}else{callback(new Error('请选择员工角色'));}
            }, trigger:'change'}],
            remarks: [
              {type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}
            ]
        },
      }
    },
    methods: {
      loadRootOptions(callback){
          setTimeout(() => callback(null,this.treeData), 100)
      },
      
      requestAddEmployee(){
          let params = {startIndex:0,endIndex:99999,bizId:this.userInfo.bizId,roleName:'',roleType:'',status:'00',loading:'N'}
          this.$api.doRoleList(params).then(res => {
              if(res.status == "S"){
                  this.roleListData = res.result.records
                  this.showEmployeeInfo = true;this.$refs['formEmployee'].resetFields();
                  this.formEmployee={username:'',employeeName:'',remarks:'',roleIds:[],orgId:null,bizId:null,userId:'',mobile:'',email:''}
              }else{
                  swal({text: '获取角色列表操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
          })        
      },
      tabsClickFunc(tabIndex){this.selectedTab = tabIndex;if(tabIndex == "role")this.getBizRole()},
      requestAddRole(){
          this.showRoleInfo = true;this.$refs['formRole'].resetFields();
          this.formRole={roleId:null,roleName:'',roleType:'BIZ',status:'00',remarks:'',bizId:null}
      },
      nodeClick(node){
          //console.log(node);
      },
      searchForOrganization(){
          this.$api.getOrganizationList({startIndex:0,endIndex:99999}).then(res => {
              if(res.status == "S"){
                 var rootElement = {
                    "name": "企业商家部门分类", label:"企业商家部门分类",
                    id:'-1',
                    "isParent": true, "isOpen": true, "hasParent": true,
                    "openedIcon": "fa fa-folder-open-o", "closedIcon": "fa fa-folder-o", 
                    "buttons": [{"title": "Add", "icon": "fa fa-plus","click":"addNode"}]
                 };
                 rootElement.children = this.trasferOrganization(res.result.records , '-1');
                 this.treeData = [rootElement]       
              }else{
                  swal('获取部门信息失败', res.message, 'error');
              }
          })
      },

      trasferOrganization(array , pid){
          var childrenArray = new Array();
          for(var i = 0 ; i <array.length ; i++){
              var ele = array[i];
              if(ele.parentId == pid){
                  var node = {"id":ele.orgId+"", "name": ele.orgName ,"label": ele.orgName , parentId:pid}
                  let childrenelements = this.trasferOrganization(array , ele.orgId);
                  let length = (childrenelements.length)
                  node.children = childrenelements
                  if(node.children && node.children.length > 0){
                      node.isOpen = true
                      node.openedIcon = "fa fa-folder-open-o"
                      node.closedIcon = "fa fa-folder-o" 
                      node.isParent = true 
                  }else{
                      node.isOpen = false
                      node.icon = "fa fa-file";
                  }
                  node.hasParent = true
                  node.buttons = [{"title": "Add", "icon": "fa fa-plus","click":"addNode"},
                    {"title": "Edit", "icon": "fa fa-edit","click":"editNode"},
                    {"title": "Del", "icon": "fa fa-trash","click":"delNode"}]
                  childrenArray.push(node);
              }
          }
          return childrenArray;
      },
      renderOrgnization(h, { root, node, data }) {
        return h('span',{style: {display: 'inline-block',width: '100%'}}, [
            h('span', [
                h('Icon', {props: {type: 'ios-folder-outline'},style: {marginRight: '8px'}}),
                h('span', data.title)
            ]),
            h('span', {style: {display: 'inline-block',float: 'right',marginRight: '32px'}})
        ]);
      },
      modalRoleCancel() {
          this.showRoleInfo = false;this.$refs['formRole'].resetFields();
          this.formRole={roleId:null,roleName:'',roleType:'BIZ',status:'00',remarks:'',bizId:this.userInfo.bizId}
      },
      doSaveRole(){
          this.$refs['formRole'].validate((valid) => {
                if (valid) {
                    this.formRole.bizId = this.userInfo.bizId;
                    this.$api.doRoleSave(this.formRole).then(res => {
                      if(res.status == "S"){
                        swal({text: '角色信息保存成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.getBizRole()});
                        this.showRoleInfo = false;
                      }else{
                        swal({text: '角色信息保存失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                      }
                    })
                } 
          })
      },
      getBizRole(){
          let params = {startIndex:0,endIndex:99999,bizId:this.userInfo.bizId,roleName:'',roleType:'',status:'00',loading:'N'}
          this.$api.doRoleList(params).then(res => {
              if(res.status == "S"){
                  this.roleListData = res.result.records
              }else{
                  swal({text: '获取角色列表失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
          })
      },
      getBizEmployee(){
          let params = {startIndex:0,endIndex:99999,bizId:this.userInfo.bizId,loading:'N'}
          this.$api.getEmployeeList(params).then(res => {
              if(res.status == "S"){
                  this.memeberListData = res.result.records
              }else{
                  swal({text: '获取员工列表失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
          })
      },
      requestDelBizRole(row) {this.delRoleRecord = row;this.delRoleInfo = true;},
      requestDelEmployee(row){this.delEmployeeRecord = row;this.delEmployeeInfo = true;},
      cancelDelRoleInfo(){this.delRoleRecord = null ;this.delRoleInfo = false;}, 
      cancelDelEmployeeInfo(){this.delEmployeeRecord = null ;this.delEmployeeInfo = false;},      
      doDelRoleInfo(){
          let params = {roleId : this.delRoleRecord.roleId}
          this.$api.doRoleDel(params).then(res => {
            if(res.status == "S"){
              this.delRoleInfo = false;
              swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.getBizRole();this.delRoleRecord = null});
            }else{
              swal({text: '删除失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
            }
          })
      },
      doDelEmployeeInfo(){
          this.$api.doEmployeeDel(this.delEmployeeRecord.employeeId).then(res => {
            if(res.status == "S"){
              this.delEmployeeInfo = false;
              swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.getBizEmployee();this.delEmployeeRecord = null});
            }else{
              swal({text: '删除失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
            }
          })
      },
      modalRoleMenuCancel() {this.emptyMenuList = false;this.showRoleMenu = false},
      showBindMenu(row){
          this.emptyMenuList = false;
          this.editRoleId = row.roleId;
          this.showRoleMenu = true;
          let copyMenuData = {expand: true, title: '系统菜单',children: []};
          copyMenuData.children = new Array();
          this.menuData = [{expand: true, title: '系统菜单',children: []}];

          this.$api.doRoleMenuByBizId(this.userInfo.bizId).then(res => {
            if(res.status == "S"){
              for(let record of res.result){record.expand = true;copyMenuData.children.push(record);}
              this.menuData[0].expand = true;
              this.$api.doRoleMenuById(row.roleId).then(res => {
                if(res.status == "S"){
                  for(let record of res.result){
                    for(let secondMenu of copyMenuData.children){
                        if(secondMenu.children)
                        for(let thirdMenu of secondMenu.children){if(record.menuId == thirdMenu.id){thirdMenu.checked = true;}}
                    }
                  }
                  for(let r of copyMenuData.children){this.menuData[0].children.push(r);}
                }else{
                    swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
                }
              })
            }else{
                swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
            }
          })
      },

      doRoleBindMenu(){
          let menuList = [];
          for(let treeNode of this.$refs['tree'].getCheckedNodes()){
                menuList.push(treeNode.id);
                var parentId = this.$tree.getParentNode(treeNode.id , this.menuData[0].children);
                if(parentId)menuList.push(parentId);
          }
          if(menuList.length == 0){this.emptyMenuList = true; return;}
          let params = {roleId:this.editRoleId,menuList:menuList};
          this.$api.doRoleBindMenu(params).then(res => {
            if(res.status == "S"){
              this.menuData[0].children = []
              for(let record of res.result){this.menuData[0].children.push(record);}
              this.showRoleMenu = false;
              swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.editRoleId=null});
            }else{
              swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
            }
          })
      },
      modalEmployeeCancel(){
        this.showEmployeeInfo = false;this.$refs['formEmployee'].resetFields();
        this.formEmployee={username:'',employeeName:'',remarks:'',roleIds:[],orgId:null,bizId:null,userId:'',mobile:'',email:''};
      },
      doSaveEmployee(){
          this.$refs['formEmployee'].validate((valid) => {
                if (valid) {
                    this.formEmployee.bizId = this.userInfo.bizId
                    this.$api.doEmployeeSave(this.formEmployee).then(res => {
                    if(res.status == "S"){
                        swal({text: '员工信息添加成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.getBizEmployee()});
                        this.modalEmployeeCancel()
                    }else{
                        swal({text: '员工信息添加失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                    }
                  })
                } 
          })
      },
      refreshAll(){this.searchForOrganization();this.getBizEmployee()},

      //show user information
      showEmployee(row){
          this.showEmployeeInfo = true;this.$refs['formEmployee'].resetFields();
          let params = {startIndex:0,endIndex:99999,bizId:this.userInfo.bizId,roleName:'',roleType:'',status:'00',loading:'N'}
          this.$api.doRoleList(params).then(res => {
              if(res.status == "S"){
                  this.roleListData = res.result.records
                  this.$api.doEmployeeInfo(row.employeeId).then(res => {
                    if(res.status == "S"){
                        this.showEmployeeInfo = true;
                        this.formEmployee = res.result;
                    }else{
                      swal({text: '获取员工信息失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
                    }
                  })

              }else{
                  swal({text: '获取角色列表操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
          }) 
      },
    },
    created(){this.refreshAll()},
    mounted(){
        eventbus.$on('treeupdatedevent',this.searchForOrganization)
    }
  }
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>
