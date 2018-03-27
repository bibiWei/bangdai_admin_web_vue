<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>审核打分</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="scoreSearch" :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
          <FormItem label="服务站名称">
            <Input v-model="scoreSearch.stationName" placeholder="请输入服务站名称"></Input>
          </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="姓名">
          <Input v-model="scoreSearch.name" placeholder="请输入姓名"></Input>
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
        <Table border :columns="tagList" :data="tagListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
      <TabPane label="已审核">
        <Table border :columns="tagList" :data="tagListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
      <TabPane label="未审核">
        <Table border :columns="tagList" :data="tagListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
      <TabPane label="未通过">
        <Table border :columns="tagList" :data="tagListData"></Table>
        <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>
      </TabPane>
    </Tabs>

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
          { title: '打分时间',key: 'tagName',align: 'center'},
          { title: '服务站', key: 'createdTime',  align: 'center'},
          { title: '维修单号', key: 'createdBy', align: 'center'},
          { title: '工号', key: 'updatedTime', align: 'center'},
          { title: '姓名', key: 'updatedBy', align: 'center'},
          { title: '得分', key: 'updatedBy', align: 'center'},
          { title: '状态', key: 'updatedBy', align: 'center'},
          { title: '处理时间', key: 'updatedBy', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '详情'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.del(params.row) } } }, '删除')
              ]);
            }}
        ], tagListData: [],
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
//        if(!startIndex) startIndex = this.$table.INIT_START_INDEX;
//        if(!endIndex)endIndex = this.$table.INIT_END_INDEX
//        let lStartIndex = startIndex;
//        let lEndIndex = endIndex;
//        let params={startIndex:lStartIndex,endIndex:lEndIndex,tagName:this.tagSearch.tagName}
//        this.$api.getTagList(params).then(res => {
//          if(res.status == "S"){
//            this.total = res.result.total;
//            this.tagListData = res.result.records;
//          }else{
//            swal('获取标签信息失败', res.message, 'error');
//          }
//        })
      },
    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
