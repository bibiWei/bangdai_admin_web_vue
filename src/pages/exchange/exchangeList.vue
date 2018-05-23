<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>汇率管理</BreadcrumbItem>
      <BreadcrumbItem>汇率列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <!--<Col span="7">-->
        <!--<FormItem label="币种">-->
          <!--<Select  filterable  >-->
            <!--<Option :value="0" :key="0">请选择</Option>-->
            <!--<Option :value="1" :key="1">人民币</Option>-->
            <!--<Option :value="2" :key="2">美元</Option>-->
            <!--<Option :value="3" :key="2">日元</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--</Col>-->

        <!--<Col span="3" style="float: right">-->
        <!--<Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>-->
        <!--<Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>-->
        <!--</Col>-->
      </Row>
    </Form>
    <Table border :columns="tagList" :data="ListData"></Table>
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
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '币种',key: 'ccy',align: 'center'},
          { title: '汇率:（100人民币）', key: 'rate',  align: 'center'},
          { title: '更新时间', key: 'updateTime', align: 'center'},
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


      getExchangeList(){
        this.$api.getExchangeList().then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){
            this.ListData = res.result;
            for(var data of this.ListData){
              data.updateTime = "今天"
            }

          }else{
            // swal(res.message);
          }
        })
      },


      search(startIndex , endIndex){
      },
    },
    created(){
      this.doSearchReset()
      this.getExchangeList()
    }
  }
</script>
