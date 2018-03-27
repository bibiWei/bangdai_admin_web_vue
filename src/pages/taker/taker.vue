<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>帮带管理</BreadcrumbItem>
      <BreadcrumbItem>帮带列表</BreadcrumbItem>
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
    <Modal
      title="帮带详情"
      v-model="showTakerInfo"
      :mask-closable="false"
      :loading="true"
      width="760px">
      <Form  label-position="top" >
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="帮带人">
            <Input v-show="false" ></Input>
            <Input type="text" placeholder="请输入帮带人"></Input>
          </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="帮带人手机号码" >
              <Input placeholder="请输入帮带人手机号码" ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="帮带人物品类型" >
              <Input placeholder="请输入帮带人物品" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="出发地" >
              <Select  filterable  >
                <Option :value="0" :key="0">请选择</Option>
                <Option :value="1" :key="1">北京</Option>
                <Option :value="2" :key="2">上海</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="目的地" >
            <Select  filterable  >
              <Option :value="0" :key="0">请选择</Option>
              <Option :value="1" :key="1">纽约</Option>
              <Option :value="2" :key="2">新西兰</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="重量" >
              <Input  placeholder="请输入重量" ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="帮带价格/RMB" >
              <Input placeholder="请输入帮带价格" ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="截止日期" >
              <Input  placeholder="请输入截止日期" ></Input>
            </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="机票认证" >
            <Select  filterable  >
              <Option :value="1" :key="1">已认证</Option>
              <Option :value="2" :key="2">未认证</Option>
            </Select>
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
        <Button type="text" size="large" @click="takerInfoCancel">取消</Button>
        <Button type="primary" size="large" @click="dotakerSave">确定</Button>
      </div>
    </Modal>
    <Modal v-model="delTakerInfo" width="460">
      <p slot="header" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        <span>提示信息</span>
      </p>
      <div style="padding-left:20px">
        <span style="font-size:16px">您确定要删除此帮带信息吗</span>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="delTakerCancel">取消</Button>
        <Button type="error" size="large"  @click="doDelTaker">删除</Button>
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
        showTakerInfo:false,
        delTakerInfo:false,
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
          { title: '起始地',key: 'col_1',align: 'center'},
          { title: '目的地', key: 'col_2',  align: 'center'},
          { title: '截止日期', key: 'col_3', align: 'center'},
          { title: '帮带人', key: 'col_4', align: 'center'},
          { title: '重量要求', key: 'col_5', align: 'center'},
          { title: '帮带价格', key: 'col_6', align: 'center'},
          { title: '机票认证', key: 'col_7', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.showTaker(params.row) } } }, '详情'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.delTaker(params.row) } } }, '删除')
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
            col_7:"未认证",
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
      showTaker(row){
        this.showTakerInfo = true;
      },
      takerInfoCancel(){
        this.showTakerInfo = false;
      },
      dotakerSave(){
        this.showTakerInfo = false;
        swal({text: '保存成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
      },
      delTaker(row){
        this.delTakerInfo = true;
      },
      delTakerCancel(){
        this.delTakerInfo = false;
      },
      doDelTaker(){
        this.delTakerInfo = false;
        swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});

      }

    },
    created(){
      this.doSearchReset()
      this.search()
    }
  }
</script>
