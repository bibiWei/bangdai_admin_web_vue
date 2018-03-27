<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>品牌管理</BreadcrumbItem>
    </Breadcrumb>
      <Modal v-model="delBrand" width="460">
          <p slot="header" style="color:#f60;text-align:left">
            <Icon type="information-circled"></Icon>
            <span>提示信息</span>
          </p>
          <div style="margin:10px">
              <span style="font-size:16px">您确定要删除此品牌 [ {{delBrandRecord.brandName}} ] 吗？</span>
            </div>
          <div slot="footer">
            <Button type="text" size="large" @click="deleteCancel">取消</Button>
            <Button type="error" size="large"  @click="doDel">删除</Button>
          </div>
      </Modal>
      <Modal title="品牌信息" v-model="showBrandInfo" width="780px" :mask-closable="false">
        <Form ref="formBrand" :model="formBrand" :label-width="90" :rules="ruleValidate">
          <Row :gutter="10">
    	        <Col span="11">
      	          <FormItem label="品牌名称" prop="brandName">
      	             <Input type="text" v-model="formBrand.brandName" placeholder="请输入品牌名称"></Input>
      	          </FormItem>
    	        </Col>
    	        <Col span="11">
      	          <FormItem label="生产厂家" prop="manufacture">
      	             <Input type="text" v-model="formBrand.manufacture" placeholder="请输入生产厂家"></Input>
      	          </FormItem>
    	        </Col>
	        </Row>
	        <Row :gutter="10">
    	        <Col span="11">
      	          <FormItem label="官网地址" prop="siteUrl">
      	             <Input type="text" v-model="formBrand.siteUrl" placeholder="请输入官网地址"></Input>
      	          </FormItem>
    	        </Col>
              <Col span="11">
      	          <FormItem label="品牌LOGO">
                      <Upload :action="action" ref="logoupload" :headers="authHeader"
                        v-show="uploadList.length==0" :show-upload-list="false"
                        :on-success="handleSuccess" :format="['jpg','jpeg','png']">
                          <Button type="ghost" icon="ios-cloud-upload-outline">上传品牌LOGO</Button>
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
  	      </Row>
          <Row :gutter="10" v-show="false">
            <Col span="22">
              <FormItem label="路径" prop="brandDesc">
                {{formBrand.brandLogo}}
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="22">
              <FormItem label="备注" prop="brandDesc">
                <Input type="textarea" v-model="formBrand.brandDesc" :rows="5" placeholder="请输入品牌描述信息"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">取消</Button>
            <Button type="primary" size="large" @click="doBrandSave">确定</Button>
        </div>
      </Modal>
      <Modal title="品牌LOGO" v-model="visible">
          <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <Row :gutter="10">
      <Button icon="plus-round" type="primary" size="small" @click="add" style="float:right">添加新品牌</Button>
      </Row>
      <Collapse v-model="selectedPanel" accordion>
        <Panel v-for="(brandList, initName) in brandListWithGroup">
          <font style="font-size:14px;font-weight:700;color:#007799;padding-left:5px;">[{{initName}}]</font>
          <p slot="content">
            <Row class="expand-row">
              <Tag v-for="brand in brandList" :key="brand.brandId" :name="brand.brandName"
                                  style="margin-right:80px;" closable @on-close="del(brand)">
                    <a @click="show(brand.brandId)">{{ brand.brandName }}</a>
              </Tag>
          </Row>
          </p>
        </Panel>
    </Collapse>
  </div>
</template>

<script>
  import Vue from "vue";
  import swal from 'sweetalert2'
  export default {
    data(){
      return {
        formBrand: {brandId:null,brandName:'',brandDesc:'',brandLogo:'',manufacture:'',siteUrl:'',status:'00',initialName:''},
        ruleValidate: {
            brandName: [{required: true, message: '品牌名称不能为空', trigger: 'blur'}],
            manufacture: [{required: true, message: '生产厂家不能为空', trigger: 'blur'}],
            siteUrl: [
              {type:"string",max: 400, message: '品牌官网地址必须少于100个字符', trigger: 'blur'},
              {validator:(rule, value, callback) => {if(value == '')return callback()
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                                  + "?(([0-9a-z_!~*'()\.&=+$%-]+: )?[0-9a-z_!~*'()\.&=+$%-]+@)?" //ftp的user@
                                  + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                                  + "|" // 允许IP和DOMAIN（域名）
                                  + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                                  + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
                                  + "[a-z]{2,6})" // first level domain- .com or .museum
                                  + "(:[0-9]{1,4})?" // 端口- :80
                                  + "((/?)|" // a slash isn't required if there is no file name
                                  + "(/[0-9a-z_!~*'()\.;?:@&=+$,%#-]+)+/?)$";
                var re=new RegExp(strRegex);
                (!re.test(value))?callback(new Error('请输入正确的品牌官网地址')):callback();
              },trigger:'blur'}
            ],
            tagRemark:[{type:"string",max: 400, message: '备注名称必须少于400个字符', trigger: 'blur'}]
        },uploadList:[],imgUrl: '',visible: false,action:'',authHeader:null,showBrandInfo:false,
        selectedPanel:null,brandListWithGroup:{},delBrand:false,delBrandRecord:{brandName:''},
      }
    },
    methods: {
          handleView (url) {
              this.imgUrl = url;
              this.visible = true;
          },
          handleRemove (file) {
              const fileList = this.$refs.logoupload.fileList;
              this.$refs.logoupload.fileList.splice(fileList.indexOf(file), 1);
              this.formBrand.brandLogo = ""
          },
          handleSuccess (res, file) {console.log(file)
              if(res.status == "S"){
                file.url = res.result.url;
                file.name = res.result.name;
                this.formBrand.brandLogo = res.result.url
              }else{
                  swal({text: '品牌LOGO添加失败，请重试['+res.message+']!',type: 'error',showCancelButton: false,width:300});
              }
          },
          doBrandSave(){
              this.$refs['formBrand'].validate((valid) => {
                  if (valid) {
                      this.$api.doBrandSave(this.formBrand).then(res => {
                          if(res.status == "S"){
                              swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300}).then((s)=>{
                              this.$refs.logoupload.fileList.splice(0, 1);this.search();});
                              this.showBrandInfo = false;
                          }else{
                              swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                          }
                      })
                  }
              })
          },
          modalCancel(){
              this.showBrandInfo = false;
              this.$refs.logoupload.fileList.splice(0, 1);
          },
          deleteCancel(){
              this.delBrand = false;
              this.delBrandRecord = {brandName:''};
          },
          search(){
              this.$api.getBrandlistWithGroup({}).then(res => {
                if(res.status == "S"){
                    this.brandListWithGroup = res.result
                }else{
                    swal('获取标签信息失败', res.message, 'error');
                }
              })
          },
          show(brandId) {
              this.clear()
              this.$refs['formBrand'].resetFields();
              this.$api.doBrandInfo(brandId).then(res => {
                  if(res.status == "S"){
                      this.showBrandInfo = true;
                      this.formBrand = res.result;
                      var file = {percentage:100 , response:{status: "S", message: "操作成功"},status:"finished"};
                      var url = this.formBrand.brandLogo;
                      file.url = url
                      file.name = url.substr(url.lastIndexOf('/'));
                      file.uid = new Date().getTime()
                      if(url != null && url != '')
                      this.$refs.logoupload.fileList.push(file);
                  }else{
                    swal({text: '操作失败['+res.message+']!',type: 'error',showCancelButton: false,width:300});
                  }
              })
          },
          del(brand) {
              this.delBrand = true;
              this.delBrandRecord = brand
          },
          clear(){
              this.$refs.logoupload.fileList.splice(0, this.$refs.logoupload.fileList.length);
              this.formBrand={brandId:null,brandName:'',brandDesc:'',brandLogo:'',manufacture:'',siteUrl:'',status:'00',initialName:''}
          },
          add(){
              this.showBrandInfo = true;
              this.clear()
          },
          doDel(){
              this.$api.doBrandDel(this.delBrandRecord.brandId).then(res => {
                if(res.status == "S"){
                    swal({text: '操作成功!',type: 'success',showCancelButton: false,width:300})
                      .then((isConfirm)=>{this.delBrand = false;this.search()});
                }else{
                    swal({text: '操作失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
                }
              })
          },

    },
    mounted(){
        this.uploadList = this.$refs.logoupload.fileList;
        this.action=this.$api.brandUploadURL;
        this.authHeader = {"platform_token":localStorage.getItem("platform_token")}
        this.search()
    }
}
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
