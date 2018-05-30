<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>广告管理</BreadcrumbItem>
      <BreadcrumbItem>广告列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
        <FormItem label="状态">
          <Select  filterable  >
            <Option :value="0" :key="0">请选择</Option>
            <Option :value="1" :key="1">发布</Option>
            <Option :value="2" :key="2">未发布</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="创建时间">
            <DatePicker type="date" multiple placeholder="请选择创建时间" style="width: 100%" ></DatePicker>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="有效期">
            <DatePicker type="date" multiple placeholder="请选择有效期" style="width: 100%" ></DatePicker>
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
    <Table border :columns="tagList" :data="ListData"></Table>
    <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer show-total
          style="float: right;margin-top: 10px" @on-change="doPageChange"></Page>
    <Modal title="广告详情" v-model="isAdInfo" width="900px">
      <Form >
        <Row :gutter="16">
          <Col span="6">
            <FormItem label="广告名称" prop="pname">
              <Input type="text"  placeholder="请输入广告名称" ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="广告描述" prop="title">
              <Input type="text"  placeholder="请输入广告描述" ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="排序" prop="title">
              <Input type="text"  placeholder="请输入广告排序" ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="有效期" prop="validTime">
              <DatePicker type="date"  placeholder="请输入有效期" width="100%" format="yyyy/MM/dd"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
          <Col span="11">
          <FormItem label="上传图片">
            <Upload action="www.baidu.com" ref="adUpload"
                    v-show="uploadList.length==0" :show-upload-list="false"
                    :on-success="handleSuccess" :format="['jpg','jpeg','png']">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
          </FormItem>
          </Col>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="22">
          <FormItem label="备注" prop="brandDesc">
            <Input type="textarea"  :rows="5" placeholder="请输入品牌描述信息"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  import Modal from "../../../node_modules/iview/src/components/modal/modal.vue";
  export default {
    components: {Modal},
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
        uploadList:[],
        isAdInfo:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '广告',key: 'title',align: 'center'},
          { title: '广告类型', key: 'col_2',  align: 'center'},
          { title: '创建时间', key: 'col_3', align: 'center'},
          { title: '有效期', key: 'deadline', align: 'center'},
          { title: '发布状态', key: 'col_5', align: 'center'},

          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '详情'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '发布'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.del(params.row) } } }, '删除')
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

      doPageChange(pagenumber) {
        this.doAdList(pagenumber, this.pageSize);
      },

      doAdList(pageNo,pageSize){
        let param = {
          pageNo:pageNo,
          pageSize:pageSize
        }
        this.$api.getAddList(param).then(res => {
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

      show(row){
        this.isAdInfo = true;
      }
    },
    created(){

      this.doAdList(this.$table.INIT_PAGE_NO, this.$table.INIT_PAGE_SIZE);
    }
  }
</script>
