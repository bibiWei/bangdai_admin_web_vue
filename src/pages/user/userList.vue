<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
      <BreadcrumbItem>用户名称</BreadcrumbItem>
    </Breadcrumb>
    <Form  :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
          <FormItem label="账号">
            <Input placeholder="请输入账号"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="手机号码">
            <Input placeholder="请输入用户手机号码"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="用户昵称">
            <Input placeholder="请输入服务站名称"></Input>
          </FormItem>
        </Col>
        <Col span="3" style="float: right">
          <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
          <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>
        </Col>
      </Row>
    </Form>
    <Tabs type="card">
      <TabPane label="全部">
        <Table border :columns="tagList" :data="ListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
      <TabPane label="已审核">
        <Table border :columns="tagList" :data="ListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
      <TabPane label="未审核">
        <Table border :columns="tagList" :data="ListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
      <TabPane label="已驳回">
        <Table border :columns="tagList" :data="ListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
    </Tabs>
    <div>
      <Modal
        title="用户信息"
        v-model="showUserInfo"
        :mask-closable="false"
        :loading="true"
        width="760px">
        <Form  label-position="top" >
          <Row :gutter="10">
            <Col span="8">
              <FormItem label="用户名">
                <Input v-show="false" ></Input>
                <Input type="text" placeholder="请输入用户名"></Input>
              </FormItem>
            </Col>
            <Col span="8" >
            <FormItem label="手机区号">
              <Select  placeholder="请选择手机区号">
                <Option value="">请选择</Option>
                <Option value="P">中国(+86)</Option>
                <Option value="B">美国(+12)</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="手机号码" >
              <Input placeholder="请输入手机号码" ></Input>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="8">
            <FormItem label="昵称" >
              <Input placeholder="请输入昵称" ></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="状态" >
              <Select  >
                <Option value="00">可用</Option>
                <Option value="01">禁用</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="注册时间" >
              <Input  placeholder="2017-12-12" disabled=true></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24" >
            <FormItem label="备注" prop="remarks">
              <el-input type="textarea" placeholder="请输入备注信息"></el-input>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="userInfoCancel">取消</Button>
          <Button type="primary" size="large" @click="doUserSave">确定</Button>
        </div>
      </Modal>
      <Modal v-model="checkUserInfo" width="460">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>提示信息</span>
        </p>
        <div style="padding-left:20px">
          <span style="font-size:16px">您确定要通过审核此用户(<span>用户名:xxxx</span>)吗？</span>
        </div>
        <div slot="footer">
          <Button type="primary" size="large"  @click="doCkeckUser">通过</Button>
          <Button type="error" size="large"  @click="doReCkeckUser">驳回</Button>
        </div>
      </Modal>
      <Modal v-model="delUserInfo" width="460">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>提示信息</span>
        </p>
        <div style="padding-left:20px">
          <span style="font-size:16px">您确定要删除此用户(<span>用户名:xxxx</span>)吗？</span>
        </div>
        <div slot="footer">
          <Button type="text" size="large" @click="delCancel">取消</Button>
          <Button type="error" size="large"  @click="doDelUser">删除</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>
<script>
  import swal from 'sweetalert2'
  export default {
    components: {},
    data () {
      return {
        showUserInfo:false,
        checkUserInfo:false,
        delUserInfo:false,
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
          { title: '账号',key: 'col_1',align: 'center'},
          { title: '手机号', key: 'col_2',  align: 'center'},
          { title: '昵称', key: 'col_3', align: 'center'},
          { title: '注册时间', key: 'col_4', align: 'center'},
          { title: '状态', key: 'col_5', align: 'center'},
          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showUser(params.row) } } }, '详情'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.checkUser(params.row) } } }, '审核'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.delUser(params.row) } } }, '删除')
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"allen",
            col_2:"13704223312",
            col_3:"阿弥斯特丹",
            col_4:"2017-12-23",
            col_5:"未审核",
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
      },
      search(startIndex , endIndex){
      },
      showUser(row){
        this.showUserInfo = true;
      },
      userInfoCancel(){
        this.showUserInfo = false;
      },
      doUserSave(){
        this.showUserInfo = false;
        swal({text: '保存成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
      },
      checkUser(row){
        this.checkUserInfo = true;
      },
      checkCancel(){
        this.checkUserInfo = false;
      },
      doCkeckUser(){
        this.checkUserInfo = false;
        swal({text: '审核成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
      },
      doReCkeckUser(){
        this.checkUserInfo = false;
        swal({text: '驳回成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
      },
      delUser(row){
        this.delUserInfo = true;
      },
      delCancel(){
        this.delUserInfo = false;
      },
      doDelUser(){
        this.delUserInfo = false;
        swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
      }

    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
