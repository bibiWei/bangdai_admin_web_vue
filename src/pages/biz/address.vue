<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>系统设置</BreadcrumbItem>
      <BreadcrumbItem>仓库地址管理</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formSearch" :label-width="105" style="margin-top: 20px">
      <Row>
      <Col span="20">
        <Col span="8">
           <FormItem label="地址名称">
               <Input v-model="formSearch.addrName" placeholder="请输入地址名称"></Input>
           </FormItem>
        </Col>
        <Col span="8">
            <FormItem label="联系人">
                <Input v-model="formSearch.addrPerson" placeholder="请输入联系人"></Input>
            </FormItem>
        </Col>
        <Col span="8">
            <FormItem label="联系电话">
              <Input v-model="formSearch.addrMobile" placeholder="请输入联系电话"></Input>
            </FormItem>
        </Col>
      </Col>
        <Col span="4">
          <Button type="ghost" style="float:right;margin-left: 10px;" @click="doSearchReset()">重置</Button>
          <Button type="primary" style="float:right;" @click="search()">查询</Button>
        </Col>
        <Col span="24">
        <Button type="primary" style="float:right;margin-bottom: 10px;" @click="add()">新增</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="addressList" :data="addressListData"></Table>
    <Page :total="total" size="small" show-elevator show-sizer style="float: right;margin-top: 10px"></Page>

    <Modal v-model="delAddress" width="460">
      <p slot="header" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        <span>提示信息</span>
      </p>
      <div style="margin:10px">
          <span style="font-size:16px">您确定要删除此地址信息吗？</span>
        </div>
      <div slot="footer">
        <Button type="text" size="large" @click="deleteCancel">取消</Button>
        <Button type="error" size="large"  @click="doDel">删除</Button>
      </div>
    </Modal>

    <Modal
      title="地址信息" v-model="addressInfo" :mask-closable="false" width="850px">
      <Form :model="formAddress" label-position="top" ref="formAddress" :rules="ruleValidate">
        <Row :gutter="10">
          <Col span="8">
            <FormItem label="地址名称" prop="addrName">
              <Input v-model="formAddress.addrName"  placeholder="请输入地址名称"></Input>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem label="所在省 / 市 / 区" prop="areaSelectProp" :required="true">
                <areaselect ref="areaselect" :level="2" type="text" v-model='distpicker' placeholder="请选择省/市/区"></areaselect>
            </FormItem>
           </Col>
          </Row>
          <Row :gutter="10">
            <Col span="4">
              <FormItem label="联系人" prop="addrPerson">
                <Input v-model="formAddress.addrPerson"  placeholder="请输入联系人"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="联系人手机号码" prop="addrMobile">
                <Input v-model="formAddress.addrMobile"  placeholder="请输入联系人手机号码"></Input>
              </FormItem>
            </Col>
          <Col span="12">
            <FormItem label="街区地址" prop="addrOther">
              <Input v-model="formAddress.addrOther"  placeholder="请输入街区地址"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="邮编" prop="addrPostcode">
              <Input v-model="formAddress.addrPostcode"  placeholder="请输入地址邮编"></Input>
            </FormItem>
          </Col>
          </Row>
          <Row :gutter="10">
          	<Col span="24" style = "float: right;">
            	<FormItem label="备注" prop="addrRemark">
              	<Input type="textarea" v-model="formAddress.addrRemark" :rows="2" placeholder="请输入备注信息"></Input>
            	</FormItem>
          	</Col>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="doAddressSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import areaselect from '../../components/area-select.vue';
  import swal from 'sweetalert2'
  export default {
    components: {areaselect},
    data () {
      return {
		    delAddress:false,delAddressRecord:null,addressInfo:false,total:0,pageSize:10,
        formAddress:{addrId:null,bizId:null,addrType:'01',addrCode:'',addrName:'', addrProvince:'',addrCity:'',addrDistrict:'',
        addrOther:'',addrPostcode:'',addrPerson:'',addrMobile:'',addrRemark:'',deletedFlag:'N'},distpicker:[],
        formSearch:{addrName:'',addrMobile:'', addrPerson:''},
        addressList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '地址名称', key: 'addrName', align: 'center'  },
          { title: '省 / 市 / 区',key: 'pcd',align: 'center' , width:260},
          { title: '街区地址', key: 'addrOther',  align: 'center'},
          { title: '联系人', key: 'addrPerson', align: 'center'},
          { title: '联系电话', key: 'addrMobile', align: 'center'},
          { title: '操作', key: 'action', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                  on: { click: () => { this.show(params.row) } } }, '详情'),
                h('Button', { props: { type: 'error', size: 'small' },
                  on: { click: () => { this.del(params.row) } } }, '删除')
              ]);
          }}
        ], addressListData: [],
        ruleValidate: {
          addrName: [{required: true, message: '地址名称不能为空', trigger: 'blur'}],
          areaSelectProp:[{validator:(rule, value, callback) => {if(this.distpicker.length != 3)
            {callback(new Error('请选择省 / 市 / 区'));}callback();},trigger:'blur'}],
          addrPerson:[{required: true, message: '联系人不能为空', trigger: 'blur' },
            {type:"string",max: 20, message: '联系人必须少于20个字符', trigger: 'blur'}],
          addrMobile:[{required: true, validator:this.$validate.validatePhone , trigger: 'blur' },
            {type:"string",max: 20, message: '联系人手机号码必须少于20个字符', trigger: 'blur'}],
          addrOther:[{required: true, message: '街区地址不能为空', trigger: 'blur' },
            {type:"string",max: 200, message: '街区地址必须少于200个字符', trigger: 'blur'}],
          addrPostcode: [{type:"string",max: 20,validator:this.$validate.validatePostCode, trigger: 'blur'}],
          addrRemark:[{type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}]
        },
      }
    },
    methods: {
      doSearchReset(name){
          this.formSearch['addrMobile'] = '';
          this.formSearch['addrName'] = '';
          this.formSearch['addrPerson'] = '';
      },
      clearFormAddress() {
          this.$refs['formAddress'].resetFields();
          this.formAddress={addrId:null,bizId:null,addrType:'01',addrCode:'',addrName:'', addrProvince:'',addrCity:'',addrDistrict:'',
          addrOther:'',addrPostcode:'',addrPerson:'',addrMobile:'',addrRemark:'',deletedFlag:'N'};
      },
      modalCancel() {
          this.addressInfo = false;
          this.$refs['formAddress'].resetFields();
      },
      show(row) {
          this.$refs['formAddress'].resetFields();
          this.$api.doAddressInfo(row.addrId).then(res => {
              if(res.status == "S"){
                  this.addressInfo = true;
                  this.formAddress = res.result;
                  this.distpicker = new Array();
                  this.distpicker[0] = (this.formAddress.addrProvince)
                  this.distpicker[1] = (this.formAddress.addrCity)
                  this.distpicker[2] = (this.formAddress.addrDistrict)
              }else{
                swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
          })
      },
      del(row) {
          this.delAddress = true;
          this.delAddressRecord = row
      },
      doDel(){
        this.$api.doAddressDel(this.delAddressRecord.addrId).then(res => {
          if(res.status == "S"){
              swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300})
                .then((isConfirm)=>{this.delAddress = false;this.search()});
          }else{
              swal({text: '操作失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
          }
        })
      },
      deleteCancel(){
          this.delAddress = false;
          this.delAddressRecord = null;
      },
      add(){
          this.distpicker = new Array()
          this.$refs['formAddress'].resetFields()
          this.addressInfo = true;
          this.clearFormAddress();
      },
      doAddressSave(){
        this.$refs['formAddress'].validate((valid) => {
            if (valid) {
                this.formAddress.addrProvince = this.distpicker[0]
                this.formAddress.addrCity = this.distpicker[1]
                this.formAddress.addrDistrict = this.distpicker[2]
                this.$api.doAddressSave(this.formAddress).then(res => {
                    if(res.status == "S"){
                        swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{this.search();});
                        this.addressInfo = false;
                    }else{
                        swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                    }
                })
            }
        })
      },
      search(startIndex , endIndex){
        if(!startIndex) startIndex = this.$table.INIT_START_INDEX;
        if(!endIndex)endIndex = this.$table.INIT_END_INDEX
        let lStartIndex = startIndex;
        let lEndIndex = endIndex;
        let params = {
            startIndex:lStartIndex,endIndex:lEndIndex,
            addrName:this.formSearch.addrName,
            addrPerson:this.formSearch.addrPerson,
            addrMobile:this.formSearch.addrMobile
        }
        this.$api.getAddressList(params).then(res => {
          if(res.status == "S"){
            this.total = res.result.total;
            this.addressListData = [];
            for(let record of res.result.records){
                if(record){record.pcd = record.addrProvince+" / "+record.addrCity+" / "+record.addrDistrict}
                this.addressListData.push(record);
            }
          }else{
              swal('获取地址信息失败', res.message, 'error');
          }
        })
      }
    },
    created(){
        this.doSearchReset()
    	  this.search();
    }
  }
</script>
