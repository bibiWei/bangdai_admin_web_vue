<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>审核管理</BreadcrumbItem>
      <BreadcrumbItem>提现申请</BreadcrumbItem>
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
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    components: {},
    data () {
      return {
        value:'',
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
          { title: '账户余额', key: 'col_4', align: 'center'},
          { title: '提现金额', key: 'amount', align: 'center'},
          { title: '提现后金额', key: 'col_6', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              if(params.row.status === 1){
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.doAgree(params.row) } } }, '通过'),
                  h('Button', { props: {  type: 'error', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.doRefuse(params.row) } } }, '驳回'),
                ]);
              }else if (params.row.status === 2){
                return h('div', [
                  h('span', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' ,color:'red'},
                    }, '已通过'),
                ]);
              }else{
                return h('div', [
                  h('span', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  }, '已驳回'),
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
        this.scoreSearch['name'] = '';
        this.scoreSearch['stationName'] = '';
      },


      getWithDrawList(pageNo,pageSize){
        let param = {
          pageNo:pageNo,
          pageSize:pageSize
        }
        this.$api.getWithDrawList(param).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){

            this.ListData = res.result;

          }else{
            // swal(res.message);
          }
        })
      },

      loadData() {
        this.getWithDrawList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
      },
      doRefuse(row){
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
              },
            })
          },
          onOk:() =>{
            if(this.value == ""){
              alert("请您输入驳回理由");
            }else{
              let param = {
                rejectReason:this.value,
                id:row.id
              }
              this.$api.doRejectWithDraw(param).then(res => {
                if(res.status == this.$api.SUCCESS){
                  swal({text: '驳回成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {});
                }else{
                  // swal(res.message);
                }
              })
            }
          }

        })
      },
      doAgree(row){
        var param = {
          id : row.id
        }
        this.$api.doAgreeWithDraw(param).then(res => {
          if(res.status == this.$api.SUCCESS){
            swal({text: '审核成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {});
          }else{
          }
        })

      }
    },
    created(){
      this.doSearchReset()
      this.loadData()
    }
  }
</script>
