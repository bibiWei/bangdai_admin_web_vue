<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>系统管理</BreadcrumbItem>
      <BreadcrumbItem>角色管理</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="80" style="margin-top: 20px">
      <Row>
        <Col span="20">
        <Col span="8">
        <FormItem label="角色名称">
          <Input v-model="searchForm.roleName" placeholder="请输入角色名称"></Input>
        </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="角色类型">
              <Select v-model="searchForm.roleType" placeholder="请选择角色类型">
                <Option value="0000">全部</Option>
                <Option value="SYS">平台角色</Option>
                <Option value="BIZ">业务角色</Option>
              </Select>
          </FormItem>
        </Col>
          <Col span="8">
            <FormItem label="状态">
                 <Select v-model="searchForm.status" placeholder="请选择状态">
                  <Option value="0000">全部</Option>
	                <Option value="00">可用</Option>
	                <Option value="01">禁用</Option>
	              </Select>
            </FormItem>
          </Col>
        </Col>
        <Col span="4">
          <Button type="ghost" style="float:right;margin-left: 10px" @click="reset()">重置</Button>
          <Button type="primary" style="float:right;" @click="search()">查询</Button>
        </Col>
        <Col span="24">
        <Button type="primary" style="float:right;margin-bottom: 10px" @click="add('action')">新增</Button>
        </Col>
      </Row>
    </Form>
    <div slot="body" >
      <Table border :columns="roleList" :data="roleData"></Table>
      <Page :total="total" :page-size="pageSize" size="small"  show-elevator show-sizer show-total style="float: right;margin-top: 10px" @on-change="doPageChange"  @on-page-size-change="doPageSizeChange"></Page>
      <Modal v-model="delRole" width="460">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>提示信息</span>
        </p>
        <div style="text-align:left;margin:6px">
          <span style="font-size:16px">您确定要删除此角色&nbsp;(&nbsp;<B>角色名称:{{ delRolename }}</B>&nbsp;)&nbsp;吗？</span>
        </div>
        <div slot="footer">
        <Button type="text" size="large" @click="deleteCancel">取消</Button>
        <Button type="error" size="large"  @click="doDelRole">删除</Button>
      </div>
      </Modal>
      <Modal
        title="角色管理"
        v-model="showRoleInfo"
        :mask-closable="false"
        width="400px">
        <Form :model="formRole" label-position="top" ref="formRole" :rules="ruleValidate">
          <Row>
            <Col span="24">
            <FormItem label="角色名称" prop="roleName">
              <Input  type="text" v-model="formRole.roleName" :name="formRole.roleName" placeholder="请输入角色名称"></Input>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="角色类型" prop="roleType">
              <Select v-model="formRole.roleType"  placeholder="请选择角色类型">
                <Option value="SYS">平台角色</Option>
                <Option value="BIZ">业务角色</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="状态" placeholder="请选择状态" prop="status">
              <Select v-model="formRole.status">
                  <Option value="00">可用</Option>
                  <Option value="01">禁用</Option>
              </Select>
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
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="doSaveRole">确定</Button>
      </div>
      </Modal>

      <Modal
        title="权限配置"
        v-model="showRoleMenu"
        :mask-closable="false"
        :loading="true"
        width="400px">
        <Form :model="formRoleMenu" label-position="top">
          <Row>
            <Alert type="warning" v-if="emptyMenuList" show-icon>请选择要绑定菜单</Alert>
            <Tree :data="menuData" show-checkbox style="font-size: 18px" ref="tree"></Tree>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="modalCancel2">取消</Button>
          <Button type="primary" size="large" @click="doRoleBindMenu">确定</Button>
      </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    data(){
      return {

		    searchForm:{roleName:'',status:'',roleType:''},emptyMenuList:false,
        delRole:false, delRolename:'',  showRoleInfo:false, total:0,  pageSize:10, showRoleMenu:false,
        roleList:[
          {type: 'index',width: 55,align: 'center'},
          {title: '角色名',key: 'roleName',align: 'center'},
          {title: '角色类型',key: 'roleTypeLabel',align: 'center'},
          {title: '角色状态',key: 'statusLabel',align: 'center'},
          {title: '最后更新时间', key: 'updatedDate',align: 'center',width: 150},
          { title: '操作',key: 'action',width: 210,align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props:{type: 'primary',size: 'small'},style: {margin: '2px'},on: {click: () => {this.showBindMenu(params.row)}} }, '权限设置'),
                h('Button', {props:{type: 'primary',size: 'small'},style: {margin: '2px'},on: {click: () => {this.show(params.row)}} }, '详情'),
                h('Button', {props:{type: 'error',size: 'small'},style: {margin: '3px'},on: { click: () => { this.remove(params.row)}}}, '删除')
              ]);
            }
          }
        ],
        roleData:[],
        ruleValidate: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            { type: 'string', max: 40, message: '角色名称必须少于40个字符', trigger: 'blur' }
          ],
          roleType: [
            { required: true, message: '角色类型不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          remarks: [
            {type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}
          ]
        },
        formRole:{roleId:null,roleName:'',roleType:'',status:'00',remarks:'',bizId:null},
        editRoleId:null,
        roleId:null,
        menuData:[{expand: true, title: '系统菜单',children: []}],
        formRoleMenu:{ }
      }
    },
    methods: {
      search(){
        this.load();
      },
      doSaveRole(){
        this.$refs['formRole'].validate(
          (valid) => {
              if (valid) {
                  this.$api.doRoleSave(this.formRole).then(res => {
                    if(res.status == "S"){
                      swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.search();});
                      this.showRoleInfo = false;
                    }else{
                      swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
                    }
                  })
              }
        })
      },
      doDelRole(){
        let params = {roleId : this.roleId}
        this.$api.doRoleDel(params).then(res => {
          if(res.status == "S"){
            this.delRole = false;
            swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.search();});
          }else{
            swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
          }
        })
      },

      add(){
        this.showRoleInfo = true;
        this.formRole = {roleId:null,roleName:'',roleType:'',status:'00',remarks:'',bizId:null};
      },

      show(row){
        this.$refs['formRole'].resetFields();
        this.editRoleId = row.roleId;
        this.$api.doRoleInfo({roleId:row.roleId}).then(res => {
          if(res.status == "S"){
            this.showRoleInfo= true;
            this.formRole = res.result;
          }else{
            swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
          }
        })
      },

      showBindMenu(row){this.emptyMenuList = false
        this.editRoleId = row.roleId;
        this.showRoleMenu = true;
        this.copyMenuData = null;
        let copyMenuData = {expand: true, title: '系统菜单',children: []};
        copyMenuData.children = new Array();
        this.menuData = [{expand: true, title: '系统菜单',children: []}];

        this.$api.doRoleMenu(true).then(res => {
          if(res.status == "S"){
            for(let record of res.result){
              record.expand = true;
              copyMenuData.children.push(record);
            }
            this.menuData[0].expand = true;

            this.$api.doRoleMenuById(row.roleId).then(res => {
              if(res.status == "S"){
                for(let record of res.result){
                  for(let secondMenu of copyMenuData.children){
                      for(let thirdMenu of secondMenu.children){
                          if(record.menuId == thirdMenu.id){
                              thirdMenu.checked = true;
                          }
                      }
                  }
                }
                for(let r of copyMenuData.children){
                    this.menuData[0].children.push(r);
                }
              }else{
                swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
              }
            })
          }else{
            swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
          }
        })
      },

      remove (row) {
        this.roleId = row.roleId;
        this.delRolename = row.roleName;
        this.delRole = true;
      },

      doPageChange(pagenumber){
        let startIndex = ( pagenumber - 1 ) * this.pageSize;
        let endIndex = pagenumber * this.pageSize;
        this.doRoleList(startIndex,endIndex);
      },
      //change page size
      doPageSizeChange(pageSize){
          this.pageSize = pageSize;
          let startIndex = 0;
          let endIndex = this.pageSize;
          this.search(startIndex,endIndex);
      },
      search(startIndex,endIndex){
        if(!startIndex) startIndex = this.$table.INIT_START_INDEX;
        if(!endIndex)endIndex = startIndex+this.pageSize
        let lStartIndex = startIndex,lEndIndex = endIndex;
        let params = {
          startIndex:lStartIndex,
          endIndex:lEndIndex,
          roleName:this.searchForm.roleName,
          roleType:this.searchForm.roleType === '0000' ? '' : this.searchForm.roleType,
          status:this.searchForm.status === '0000' ? '' : this.searchForm.status
        }
        this.$api.doRoleList(params).then(res => {
          if(res.status == "S"){
            this.total = res.result.total;
            this.roleData = [];
            for(let record of res.result.records){
            	if(record){
                if(record.roleType == "SYS"){
                  record.roleTypeLabel = "系统角色";
                }
                if(record.roleType == "BIZ"){
                  record.roleTypeLabel = "业务角色";
                }
            		record.statusLabel = ("00"==record.status) ? "可用" : "禁用"
            	}
              	this.roleData.push(record);
            }
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
              if(parentId)
                  menuList.push(parentId);
        }
        if(menuList.length == 0){
            this.emptyMenuList = true;
            return;
        }
        let params = {
            roleId:this.editRoleId,
            menuList:menuList
        };
        this.$api.doRoleBindMenu(params).then(res => {
          if(res.status == "S"){
            this.menuData[0].children = []
            for(let record of res.result){
              this.menuData[0].children.push(record);
            }
            this.showRoleMenu = false;
            swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.search();});
          }else{
            swal({text: '操作失败['+res.result.error+']!',type: 'error',showCancelButton: false,width:300});
          }
        })
      },

      modalCancel() {
         this.showRoleInfo = false;
         this.$refs['formRole'].resetFields();
      },
      modalCancel2() {
         this.emptyMenuList = false;
         this.showRoleMenu = false
      },
      reset(){
        this.searchForm.roleName = "";
        this.searchForm.roleType = "0000";
        this.searchForm.status = "0000";
      },
      deleteCancel(){
        this.roleId = '';
        this.delRolename = '';
        this.delRole = false;
      }
    },
    created(){this.reset()
      this.search();
    }
  }
</script>

