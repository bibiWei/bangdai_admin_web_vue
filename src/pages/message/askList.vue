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

    <Modal v-model="showChatInfo" width="460">
      <template>
        <div>
          <th-doctortitlebar
            canopen
            :openConfig="openconfig"
            :name="doctorbar.name"
            :position="doctorbar.position"
            :star="doctorbar.star"
            :btn="doctorbar.btn"
            :btnType="doctorbar.btntype"
            :btnCanClick="doctorbar.btncanlick"
            :headImg="otherface"
            @btnCall="topbtncall"
            @headClick="headclick">
            自定义内容
            <div v-for="i in count">{{i}}</div>
          </th-doctortitlebar>
          <th-message
            ref="messgebox"
            :usePulldown="true"
            :pulldownConfig="pulldownconfig"
            :topPadding="120"
            :messageData="messageData"
            :funcList="funclist"
            :bigBtn="bigbtn"
            :showInput="showinput"
            :selfFace="selfface"
            :otherFace="otherface"
            @sendOut="senRequest"
            @galleryCall="gallery"
            @cameraCall="camera"
            @quickCall="quick"
            @bigBtnCall="btncall"
            @faceClick="faceclick"
            @msgClick="msgclick"
            @pulldownCall="pulldowncall">
          </th-message>
          <th-dialog
            :isShow.sync="showdialog"
            :showFrom="dialogfrom"
            :closeOnClickshadow="true"
            @onHide="hidedialog">
          </th-dialog>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  import thor from 'thor-x'
  import { messageData, facelist } from "../../../static/data/testdata";
  Vue.use(thor)
  export default {
    components: {},
    data () {
      return {
        messageData: messageData,
        bigbtn: "",
        showinput: true,
        funclist: ["gallery", "camera", "quick"],
        doctorbar: {
          name: "李成才",
          position: "主治医师",
          star: 5,
          btn: "结束咨询",
          btncanlick: true,
          btntype: "primary"
        },
        count: 10,
        showdialog: false,
        dialogfrom: "bottom",
        selfface: selfface,
        otherface: otherface,
        facelist: facelist,
        openconfig: {
          open: "打开",
          close: "关闭"
        },
        pulldownconfig: {
          default: "<div>下拉刷新</div>",
          up: "<div style='color:red'>下拉刷新</div>",
          down: "<div style='color:blue'>松手刷新</div>",
          loading: "<span style='color:green'>加载中</span>"
        },
        scoreSearch:{
          stationName:'',
          name:''
        },
        showChatInfo:true,
        total:0,
        pageSize:10,
        tagInfo:false,
        delTagRecord:null,
        delTag:false,
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
                  on: { click: () => { this.show(params.row) } } }, '聊天'),
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
        this.scoreSearch['name'] = '';
        this.scoreSearch['stationName'] = '';
      },

      search(startIndex , endIndex){
      },

      replaceImg(word) {
        return word.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, word => {
          let newWord = word.replace(/\[|\]/gi, "");
          let index = this.facelist.indexOf(newWord);
          return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
        });
      },
      senRequest(h) {
        this.messageData.push({
          type: 1,
          text: this.replaceImg(h)
        });
        console.log(h);
      },
      gallery() {
        console.warn("调起了自定义组件");
        this.messageData.push({
          type: 3,
          text: "调起了自定义相册组件"
        });
      },
      camera() {
        this.messageData.push({
          type: 3,
          text: "调起了自定义拍照组件"
        });
      },
      btncall() {
        alert("前往评价了");
        this.doctorbar.btn = "已评价";
        this.doctorbar.btntype = "default";
      },
      topbtncall() {
        this.messageData.push({
          type: 4,
          text: "您已完成咨询，请前往评价"
        });
        this.bigbtn = "前往评价";
        this.showinput = false;
        this.doctorbar.btncanlick = false;
      },
      quick() {
        this.showdialog = true;
      },
      hidedialog() {
        this.showdialog = false;
      },
      faceclick(d) {
        console.log(d);
      },
      msgclick(d) {
        if (d.isimg) alert(d.text);
      },
      headclick() {
        console.log("点击了头像");
      },
      pulldowncall() {
        console.log("pulldown");
        this.messageData.unshift({
          type: 1,
          text: "新增"
        });
        setTimeout(() => {
          this.$refs.messgebox.resetpulldown();
        }, 2000);
      }
    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
