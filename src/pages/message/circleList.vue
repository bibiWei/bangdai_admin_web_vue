<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>消息管理</BreadcrumbItem>
      <BreadcrumbItem>熊圈列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">


      <Row>
        <Col span="7">
        <FormItem label="发布日期">
          <DatePicker type="date" multiple placeholder="请选择创建时间" style="width: 100%" ></DatePicker>
        </FormItem>
        </Col>
        <Col span="3" style="float: right">
        <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
        <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" style="float: right">
        <Button type="primary" style="float:right;margin-left: 10px;" @click="showAdd()">新增</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="tagList" :data="ListData" style="margin-top: 20px"></Table>
    <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer show-total
          style="float: right;margin-top: 10px" @on-change="doPageChange"></Page>
    <Modal title="消息编辑" v-model="isAdd" width="900px" @on-ok="addCircle">
      <Form v-model="circleForm">
        <Row :gutter="16">
          <Col span="24">
          <FormItem label="标题" prop="sort"  >
            <Input type="text"  placeholder="请输入标题名称" v-model="circleForm.title" ></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="发布日期" prop="sort" >
            <DatePicker type="date" :options="options3" placeholder="请选择发布日期" style="width: 100%" v-model="circleForm.issueDate"></DatePicker>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="是否有效" prop="sort" >
            <Select  >
              <Option :value="0" :key="0">请选择</Option>
              <Option :value="1" :key="1">是</Option>
              <Option :value="2" :key="2">否</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8">
          <div>
            <up-Load class="files" :data="item"
                     typeArr="image/png,image/jpg,image/gif,image/jpeg" size="50000000"></up-Load>
          </div>
          </Col>

          <Col span="24">
          <FormItem label="内容" label-position="top" >
            <vue-editor  style="margin-top: 35px" v-model="circleForm.msg"></vue-editor>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal title="评论列表" v-model="isComment" width="900px" @on-ok="addCircle">
      <Table border :columns="commentList" :data="cListData" style="margin-top: 20px"></Table>
    </Modal>
  </div>
</template>

<script>
  import swal from 'sweetalert2'
  import { VueEditor } from 'vue2-editor'
  import uploadImg from '../../components/upload/uploadImg.vue'
  export default {
    components: {
      VueEditor,
      'up-Load':uploadImg
    },
    name: 'circleList',
    data () {
      return {
        item:'',
        circleForm:{
          title:'',
          issueDate:'',
          msg:''
        },
        options3: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        scoreSearch:{
          stationName:'',
          name:''
        },
        isComment:false,
        total:0,
        pageSize:10,
        tagInfo:false,
        delTagRecord:null,
        isAdd:false,
        delTag:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '标题',key: 'title',align: 'center'},
          { title: '创建人', key: 'issuer',  align: 'center'},
          { title: '发布日期', key: 'issueDate', align: 'center'},
          { title: '状态', key: 'col_5', align: 'center'},
          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showEdit(params.row) } } }, '详情'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showComment(params.row) } } }, '查看评论'),
              ]);
            }}
        ],

        commentList:[
          { type: 'index', width: 60,  align: 'center' },
          { title: '评论人',key: 'commentUser',align: 'center'},
          { title: '评论时间', key: 'commentDate',  align: 'center'},
          { title: '发布日期', key: 'comment', align: 'center'}
        ],

        ListData: [

        ],
        cListData:[

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
      getCircleInfo(msgId){
        this.$api.getCircleInfo(msgId).then(res => {
          if(res.status == this.$api.SUCCESS){
            this.circleForm = res.result;
          }else{
          }
        })
      },
      getCommentInfo(msgId){
        this.$api.getCircleInfo(msgId).then(res => {
          if(res.status == this.$api.SUCCESS){
            this.cListData = res.result.commentList;
          }else{

          }
        })
      },
      getCircleList(pageNo,pageSize){
        let param = {
          pageNo:pageNo,
          pageSize:pageSize
        }
        this.$api.getCircleList(param).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){
            this.total = res.result.pagination.total;
            this.ListData = res.result.data;
          }else{
          }
        })
      },
      search(startIndex , endIndex){
      },
      showAdd(){
        this.isAdd = true;
      },
      showEdit(row){
        this.isAdd = true;
        this.getCircleInfo(row.id);
      },

      showComment(row){
        this.isComment = true;
        this.getCommentInfo(row.id);
      },

      loadData() {
        this.getCircleList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
      },
      doPageChange(pagenumber) {
        this.getCircleList(pagenumber, this.pageSize);
      },
      addCircle(){
        this.$api.addCircle(this.circleForm).then(res => {
          this.ListData = [];
          if(res.status == this.$api.SUCCESS){

            this.loadData();
          }else{
            // swal(res.message);
          }
        })
      },
    },
    created(){
      this.doSearchReset();
      this.search();
      this.loadData();
    }
  }
</script>
