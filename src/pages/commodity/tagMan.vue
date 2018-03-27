<<template>
  <div>
      <Breadcrumb>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>商品管理</BreadcrumbItem>
        <BreadcrumbItem>标签管理</BreadcrumbItem>
      </Breadcrumb>
      <Form :model="tagSearch" :label-width="105" style="margin-top: 20px">
        <Row>
          <Col span="8">
             <FormItem label="标签名称">
                 <Input v-model="tagSearch.tagName" placeholder="请输入标签名称"></Input>
             </FormItem>
          </Col>
          <Col span="16">
            <Button type="primary" style="float:right;margin-left: 10px;" icon="plus-round" @click="add">新增标签</Button>
            <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset">重置</Button>
            <Button type="primary" style="float:right;margin-left: 10px;" @click="search()">查询</Button>

          </Col>
        </Row>
      </Form>
      <Table border :columns="tagList" :data="tagListData"></Table>
      <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>

      <Modal v-model="delTag" width="460">
          <p slot="header" style="color:#f60;text-align:left">
            <Icon type="information-circled"></Icon>
            <span>提示信息</span>
          </p>
          <div style="margin:10px">
              <span style="font-size:16px">您确定要删除此标签信息吗？</span>
            </div>
          <div slot="footer">
            <Button type="text" size="large" @click="deleteCancel">取消</Button>
            <Button type="error" size="large"  @click="doDel">删除</Button>
          </div>
      </Modal>

      <Modal title="标签信息" v-model="tagInfo" :mask-closable="false" width="550px">
        <Form :model="formTag" label-position="top" ref="formTag" :rules="ruleValidate">
          <Row :gutter="10">
            <Col span="24">
              <FormItem label="标签名称" prop="tagName">
                <Input v-model="formTag.tagName"  placeholder="请输入地址名称"></Input>
              </FormItem>
            </Col>
            </Row>
            <Row :gutter="10">
            	<Col span="24" style = "float: right;">
              	<FormItem label="备注" prop="tagRemark">
                	<Input type="textarea" v-model="formTag.tagRemark" :rows="5" placeholder="请输入备注信息"></Input>
              	</FormItem>
            	</Col>
            </Row>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">取消</Button>
            <Button type="primary" size="large" @click="doTagSave">保存</Button>
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
        formTag:{tagId:null,tagName:'',tagRemark:'', updatedTime:'',updatedBy:'',status:'00'},
        tagSearch:{tagName:''},total:0,pageSize:10,tagInfo:false,delTagRecord:null,delTag:false,
        tagList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '标签名称',key: 'tagName',align: 'center'},
          { title: '创建时间', key: 'createdTime',  align: 'center'},
          { title: '创建人编号', key: 'createdBy', align: 'center'},
          { title: '修改时间', key: 'updatedTime', align: 'center'},
          { title: '修改人编号', key: 'updatedBy', align: 'center'},
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
        doSearchReset(name){this.tagSearch['tagName'] = '';},
        modalCancel(){this.tagInfo = false;this.$refs['formTag'].resetFields();},
        clearFormTag() {
            this.$refs['formTag'].resetFields();
            this.formTag={tagId:null,tagName:'',tagRemark:'', updatedTime:'',updatedBy:'',status:'00'};
        },
        doTagSave(){
            this.$refs['formTag'].validate((valid) => {
                if (valid) {
                    this.$api.doTagSave(this.formTag).then(res => {
                        if(res.status == "S"){
                            swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.search();});
                            this.tagInfo = false;
                        }else{
                            swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                        }
                    })
                }
            })
        },
        add(){
            this.$refs['formTag'].resetFields()
            this.tagInfo = true;
            this.clearFormTag();
        },
        deleteCancel(){
            this.delTag = false;
            this.delTagRecord = null;
        },
        search(startIndex , endIndex){
            if(!startIndex) startIndex = this.$table.INIT_START_INDEX;
            if(!endIndex)endIndex = this.$table.INIT_END_INDEX
            let lStartIndex = startIndex;
            let lEndIndex = endIndex;
            let params={startIndex:lStartIndex,endIndex:lEndIndex,tagName:this.tagSearch.tagName}
            this.$api.getTagList(params).then(res => {
              if(res.status == "S"){
                  this.total = res.result.total;
                  this.tagListData = res.result.records;
              }else{
                  swal('获取标签信息失败', res.message, 'error');
              }
            })
        },
        show(row) {
            this.$refs['formTag'].resetFields();
            this.$api.doTagInfo(row.tagId).then(res => {
                if(res.status == "S"){
                    this.tagInfo = true;
                    this.formTag = res.result;
                }else{
                  swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                }
            })
        },
        del(row) {
            this.delTag = true;
            this.delTagRecord = row
        },
        doDel(){
            this.$api.doTagDel(this.delTagRecord.tagId).then(res => {
              if(res.status == "S"){
                  swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300})
                    .then((isConfirm)=>{this.delTag = false;this.search()});
              }else{
                  swal({text: '操作失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
              }
            })
        },

    },
    created(){
          this.doSearchReset()
          this.search()
    }
}
</script>
