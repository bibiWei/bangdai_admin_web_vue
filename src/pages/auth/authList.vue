<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>审核管理</BreadcrumbItem>
      <BreadcrumbItem>身份认证</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
          <FormItem label="账号">
            <Input placeholder="请输入账号"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="手机号">
            <Input placeholder="请输入手机号"></Input>
          </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="昵称">
          <Input placeholder="请输入昵称"></Input>
        </FormItem>
        </Col>
        <Col span="3" style="float: right">
        <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
        <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="tagList" :data="ListData"></Table>
    <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
    <Modal title="查看" v-model="isAuthInfo" width="900px">
      <Tabs value="name1">
        <TabPane :label="idAuth" name="name1">
          <Form v-model="authInfoForm">
            <Row :gutter="16">
              <Col span="6">
                <FormItem label="身份证号码"  >
                  <Input type="text"  v-model="authInfoForm.certNo" readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="姓名" >
                  <Input type="text"  v-model="authInfoForm.name" readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="性别" >
                  <Input type="text" v-model="authInfoForm.gender" readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="年龄" >
                  <Input type="text" v-model="authInfoForm.age" readonly="readonly"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Row :gutter="16">
            <Col span="24">
              <Card>
                <div style="text-align:center">
                  <img :src="authInfoForm.certPicUrl" width="280px">
                  <h3>身份证正面</h3>
                </div>
              </Card>
            </Col>

          </Row>
          <Row :gutter="100" style="margin-top: 3em;text-align: center">
            <Col span="12">
              <Button type="success" long style="width: 80%" @click="doAgree()">通过</Button>
            </Col>
            <Col span="12">
              <Button type="error" long style="width: 80%" @click="doRefuse()">驳回</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane :label="pshAuth" name="name2">
          <Form>
            <Row :gutter="16">
              <Col span="6">
              <FormItem label="护照号码" >
                <Input type="text"  readonly="readonly"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="姓名" >
                <Input type="text"  readonly="readonly"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="性别" >
                <Input type="text"  readonly="readonly"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="年龄" >
                <Input type="text"  readonly="readonly"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
              <Card>
                <div style="text-align:center">
                  <img src="../../../static/img/pic.jpeg" width="280px">
                  <h3>护照首页</h3>
                </div>
              </Card>
              </Col>
              <Col span="12">
              <Card>
                <div style="text-align:center">
                  <img src="../../../static/img/pic.jpeg" width="280px">
                  <h3>护照尾页</h3>
                </div>
              </Card>
              </Col>
            </Row>
            <Row :gutter="100" style="margin-top: 3em;text-align: center">
              <Col span="12">
                <Button type="success" long style="width: 80%">通过</Button>
              </Col>
              <Col span="12">
                <Button type="error" long style="width: 80%">驳回</Button>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane :label="foreAuth" name="name3">
          <Row :gutter="16">
            <Col span="12">
            <Card>
              <div style="text-align:center">
                <img src="../../../static/img/pic.jpeg" width="280px">
                <h3>外卡正面</h3>
              </div>
            </Card>
            </Col>
            <Col span="12">
            <Card>
              <div style="text-align:center">
                <img src="../../../static/img/pic.jpeg" width="280px">
                <h3>外卡背面</h3>
              </div>
            </Card>
            </Col>
          </Row>
          <Row :gutter="100" style="margin-top: 3em;text-align: center">
            <Col span="12">
              <Button type="success" long style="width: 80%">通过</Button>
            </Col>
            <Col span="12">
              <Button type="error" long style="width: 80%">驳回</Button>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
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
        authId:0,
        rejectValue:'',
        authInfoForm:{
          certNo:'',
          name:'',
          gender:'',
          age:'',
          certPicUrl:'',
          certType:'',
          id:'',
          photoIdUrl:'',
          rejectReason:'',
          status:'',
          userId:''


        },
        scoreSearch:{
          stationName:'',
          name:''
        },
        total:0,
        pageSize:10,
        tagInfo:false,
        delTagRecord:null,
        isAuthInfo:false,
        idAuth: (h) => {
          if(this.authInfoForm.status == 3){
            return h('div', [
              h('span', '身份证认证'),
              h('Badge', {
                props: {
                  count: '已驳回',
                }
              })
            ])
          }
          if(this.authInfoForm.status == 2){
            return h('div', [
              h('span', '身份证认证'),
              h('Badge', {
                props: {
                  count: '已认证',
                }
              })
            ])
          }
          if(this.authInfoForm.status == 1){
            return h('div', [
              h('span', '身份证认证'),
              h('Badge', {
                props: {
                  count: '未认证',
                }
              })
            ])
          }

        },
        pshAuth: (h) => {
          return h('div', [
            h('span', '护照认证'),
            h('Badge', {
              props: {
                count: '未认证'
              }
            })
          ])
        },
        foreAuth: (h) => {
          return h('div', [
            h('span', '外籍认证'),
            h('Badge', {
              props: {
                count: '未认证',
              }
            })
          ])
        },

        delTag:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '账号',key: 'col_1',align: 'center'},
          { title: '手机号', key: 'col_2',  align: 'center'},
          { title: '昵称', key: 'name', align: 'center'},
          { title: '创建日期', key: 'col_4', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showAuth(params.row) } } }, '查看')
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

      doAuthList(){
        let param = {
          pageNo:1,
          pageSize:10
        }

        this.$api.doAuthList(param).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){
            this.ListData = res.result;
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
      showAuth(row) {
        this.isAuthInfo = true;
        this.authId = row.id;
        this.doAuthDetail(row.id);
      },

      doAuthDetail(id){
        this.$api.doAuthDetail(id).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){
             this.authInfoForm = res.result;
             debugger;
          }else{
            // swal(res.message);
          }
        })
      },


      doRefuse(){

        if(this.authInfoForm.status !== 1){

        }
        this.$Modal.confirm({
          onOk: () =>{
            this.$api.doAuthReject(this.authId,this.rejectValue).then(res => {
              if(res.status == this.$api.SUCCESS){
                this.isAuthInfo = false;
                swal({text: '驳回成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {});
              }else{
                // swal(res.message);
              }
            })
          },
          render: (h) => {
            return h('Input', {
              props: {
                type:'textarea',
                value: this.value,
                autofocus: true,
                placeholder: '请输入驳回理由'
              }, on: {
                input: (val) => {
                  this.rejectValue = val;
                }
              }
            })
          }
        })
      },
      doAgree(){
        this.$api.doAuthPass(this.authId).then(res => {
          if(res.status == this.$api.SUCCESS){
            this.isAuthInfo = false;
            swal({text: '审核成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {});
          }else{
            // swal(res.message);
          }
        })

      }
    },
    created(){
      this.doSearchReset()
      this.search()
      this.doAuthList()
    }
  }
</script>
