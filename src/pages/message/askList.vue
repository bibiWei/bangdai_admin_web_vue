<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>消息管理</BreadcrumbItem>
      <BreadcrumbItem>咨询列表</BreadcrumbItem>
    </Breadcrumb>
    <Form :label-width="105" style="margin-top: 20px">
      <Row>
        <Col span="7">
          <FormItem label="咨询日期">
            <DatePicker type="date" multiple placeholder="请选择创建时间" style="width: 100%" ></DatePicker>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="咨询人">
            <Input placeholder="咨询人"></Input>
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
    <Modal title="聊天窗口" v-model="isChatShow" width="900px">
      <div id="chatApp">
        <div class="sidebar">

          <Card></Card>
          <List></List>
        </div>
        <div class="main">
          <Message></Message>
          <Text></Text>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  import thor from 'thor-x'
  import { actions } from '../../store/store';
  import Card from '../../components/chat/card.vue';
  import List from '../../components/chat/list.vue';
  import Text from '../../components/chat/text.vue';
  import Message from '../../components/chat/message.vue';
  Vue.use(thor)
  export default {
    components: {
      Card, List, Text, Message
    },
    vuex: {
      actions: actions
    },
    data () {
      return {
        count: 10,
        showChatInfo:true,
        total:0,
        pageSize:10,
        isChatShow:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '标题',key: 'col_1',align: 'center'},
          { title: '咨询人', key: 'col_2',  align: 'center'},
          { title: '咨询时间', key: 'col_3', align: 'center'},
          { title: '咨询消息', key: 'col_4', align: 'center'},
          { title: '状态', key: 'col_5', align: 'center'},
          { title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showChat(params.row) } } }, '聊天'),
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '结束咨询'),
              ]);
            }}
        ],
        ListData: [
          {
            col_1:"第一个标题",
            col_2:"小李",
            col_3:"2018-12-12",
            col_4:"我想问一下如何去中心化",
            col_5:"未读",
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
      showChat(){
        this.isChatShow = true;
      },
      search(startIndex , endIndex){
      },
    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>

<style lang="less" scoped>
  #chatApp {
    margin: 20px auto;
    width: 800px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
      height: 100%;
    }
    .sidebar {
      float: left;
      width: 200px;
      color: #f4f4f4;
      background-color: #2e3238;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
    .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .message {
      height: ~'calc(100% - 160px)';
    }
  }
</style>
