<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>求带管理</BreadcrumbItem>
      <BreadcrumbItem>求带列表</BreadcrumbItem>
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
        <FormItem label="求带人">
          <Input placeholder="求带人"></Input>
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
      title="求带详情"
      v-model="showBuyerInfo"
      :mask-closable="false"
      :loading="true"
      width="760px">
      <Form  label-position="top" >
        <Row :gutter="10">
          <Col span="8">
          <FormItem label="求带人">
            <Input v-show="false" ></Input>
            <Input type="text" placeholder="请输入求带人"></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="求带人手机号码" >
            <Input placeholder="请输入求带人手机号码" ></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="求带物品类型" >
            <Select  filterable  >
              <Option :value="0" :key="0">请选择</Option>
              <Option :value="1" :key="1">类型一</Option>
              <Option :value="2" :key="2">类型二</Option>
            </Select>
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
          <FormItem label="求带价格/RMB" >
            <Input placeholder="请输入帮带价格" ></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="截止日期" >
            <Input  placeholder="请输入截止日期" ></Input>
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
        <Button type="text" size="large" @click="buyerInfoCancel">取消</Button>
        <Button type="primary" size="large" @click="dobuyerSave">确定</Button>
      </div>
    </Modal>
    <Modal v-model="delBuyerInfo" width="460">
      <p slot="header" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        <span>提示信息</span>
      </p>
      <div style="padding-left:20px">
        <span style="font-size:16px">您确定要删除此帮带信息吗</span>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="delBuyerCancel">取消</Button>
        <Button type="error" size="large"  @click="doDelBuyer">删除</Button>
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
          showBuyerInfo:false,
          delBuyerInfo:false,
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
            { title: '求带人', key: 'col_4', align: 'center'},
            { title: '物品类型', key: 'col_5', align: 'center'},
            { title: '物品重量', key: 'col_6', align: 'center'},
            { title: '求带价格', key: 'col_7', align: 'center'},
            { title: '操作', key: 'action', width: 130, align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.showBuyer(params.row) } } }, '详情'),
                  h('Button', { props: { type: 'error', size: 'small' },
                    on: { click: () => { this.delBuyer(params.row) } } }, '删除')
                ]);
              }}
          ],
          ListData: [
            {
              col_1:"大连",
              col_2:"纽约",
              col_3:"2018-12-12",
              col_4:"小李/13704240988",
              col_5:"衣服",
              col_6:"40KG",
              col_7:"13.2/RMB",
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

        showBuyer(row){
          this.showBuyerInfo = true;
        },
        buyerInfoCancel(){
          this.showBuyerInfo = false;
        },
        dobuyerSave(){
          this.showBuyerInfo = false;
          swal({text: '保存成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
        },

        delBuyer(){
          this.delBuyerInfo = true;

        },
        delBuyerCancel(){
          this.delBuyerInfo = false;
        },
        doDelBuyer(){
          this.delBuyerInfo = false;
          swal({text: '删除成功!',type: 'success',showCancelButton: false,width:300}).then((isConfirm)=>{this.search();});
        }
      },
      created(){
        this.doSearchReset()
        this.search()
      }
    }
</script>
