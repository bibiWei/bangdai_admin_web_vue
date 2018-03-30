<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>审核管理</BreadcrumbItem>
      <BreadcrumbItem>机票核查</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="出发地">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">北京</Option>
            <Option :value="2" :key="2">上海</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="目的地">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">纽约</Option>
            <Option :value="2" :key="2">阿拉斯加</Option>
          </Select>
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
    <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
    <Modal title="机票审核" v-model="isTicketInfo" width="900px">
      <Form>
        <Row :gutter="16">
          <Col span="6">
          <FormItem label="出发地" >
            <Input type="text"  placeholder="大连"  disabled></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="目的地" >
            <Input type="text"  placeholder="棉花堡"  disabled></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="出发时间" >
            <Input type="text"  placeholder="2018-12-12"  disabled></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="帮带人" >
            <Input type="text"  placeholder="xxxx"  disabled></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <Row :gutter="16">
        <Col span="24">
        <Card>
          <div style="text-align:center">
            <img src="../../../static/img/pic.jpeg" width="280px">
            <h3>机票照片</h3>
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
        scoreSearch:{
          stationName:'',
          name:''
        },
        total:0,
        pageSize:10,
        tagInfo:false,
        delTagRecord:null,
        delTag:false,
        isTicketInfo:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '起始地',key: 'col_1',align: 'center'},
          { title: '目的地', key: 'col_2',  align: 'center'},
          { title: '截止日期', key: 'col_3', align: 'center'},
          { title: '帮带人', key: 'col_4', align: 'center'},
          { title: '重量要求', key: 'col_5', align: 'center'},
          { title: '帮带价格', key: 'col_6', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showTicket(params.row) } } }, '审核')
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"大连",
            col_2:"纽约",
            col_3:"2018-12-12",
            col_4:"小李/13704240988",
            col_5:"40KG",
            col_6:"13.2/RMB",
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
        this.scoreSearch['name'] = '';
        this.scoreSearch['stationName'] = '';
      },

      search(startIndex , endIndex){
      },
      showTicket(){
        this.isTicketInfo = true;
      },
      doRefuse(){
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
              }
            })
          }
        })
      },
      doAgree(){
        swal({text: '审核成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {});
      }
    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
