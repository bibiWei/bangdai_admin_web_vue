<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商品管理</BreadcrumbItem>
      <BreadcrumbItem>商品维护</BreadcrumbItem>
    </Breadcrumb>
    <br/>
    <Row>
      <Col span="20">&nbsp;</Col>
      <Col span="2"><Button type="primary" @click="updateProduct()">更新商品</Button></Col>
      <Col span="2"><Button type="primary" @click="addProduct()">添加商品</Button></Col>
    </Row>
    <br/>
    <Form>
    <Modal
      title="添加分类"
      v-model="showAddCate"
      :mask-closable="false"
      :loading="true"
      width="400px">
      <Form :model="formCateMenu" label-position="top">
        <Row>
          <Tree :data="dataCateMenu" show-checkbox style="font-size: 18px" ref="tree"></Tree>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="doCateCancle()">取消</Button>
        <Button type="primary" size="large" @click="doCateBind()">确定</Button>
      </div>
    </Modal>
    <Collapse v-model="value1" @on-change="checkOpen()">

        <Panel name="1" >
            商品基本信息
            <p slot="content">
          <Form ref="formPro" :rules="ruleValidate">
              <Row :gutter="16">

                <Col span="12">
                <FormItem label="参照商品">
                  <Select  filterable @on-change="changeMedicine($event)" v-model="medicine">
                    <Option v-for="item in commodityList" :value="item.commodityId" :key="item.commodityId">{{ item.commodityName }}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col span="10">
                <FormItem label="商品分类">
                    <Input  icon="ios-clock-outline"  v-model="baseInfoForm.cateId" disabled placeholder="请选择产品分类"></Input>

                </FormItem>
                </Col>
                <Col span="2" style="margin-top: 33px">
                  <Button type="primary" @click="showCateList()">+</Button>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="6">
                  <FormItem label="商品类型">
                    <Input  icon="ios-clock-outline"  v-model="baseInfoForm.typeId" disabled></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="监管分类">
                    <Select placeholder="请选择监管分类" filterable v-model="baseInfoForm.suppervisionClass">
                      <Option v-for="item in classList" :value="item.id" :key="item.id">{{ item.className }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="商品品牌" prop="brand">
                    <Select placeholder="请选择商品品牌" filterable v-model="formPro.brand">
                      <Option v-for="item in brandList" :value="item.brandId"  :key="item.brandId">{{ item.brandName }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="商品名称" prop="commodityName">
                  <Input  icon="ios-clock-outline" placeholder="商品名称" v-model="baseInfoForm.commodityName"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="6">
                  <FormItem label="英文名称">
                    <Input  icon="ios-clock-outline" placeholder="英文名称" v-model="baseInfoForm.commodityEngNm"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="商品别名" prop="commodityAlias">
                    <Input  icon="ios-clock-outline" placeholder="商品别名" v-model="baseInfoForm.commodityAlias"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="ERP编码" prop="erpCode">
                    <Input  icon="ios-clock-outline" placeholder="ERP编码" v-model="baseInfoForm.erpCode"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="汉语拼音" >
                  <Input  icon="ios-clock-outline" placeholder="汉语拼音" v-model="baseInfoForm.namePinyin"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="重要提示">
                    <Input  icon="ios-clock-outline" placeholder="重要提示" v-model="baseInfoForm.commondityMemo"></Input>
                  </FormItem>
                </Col>
              </Row>

        </Form>
              <br/>
            </p>
        </Panel>

        <Panel name="2" >
            商品扩展信息
            <p slot="content">
              <Tabs value="name1">
                <TabPane  v-for="item in attrGroup" :label="item.groupName" :name="item.groupName">
                  <Row :gutter="16">
                    <Col span="6" v-for="attr in item.list" >
                      <FormItem :label="attr.attributeName" label-position="top" v-if="attr.inputType == 0">
                        <Input  icon="ios-clock-outline" :placeholder="attr.attributeName" ></Input>
                      </FormItem>
                      <FormItem :label="attr.attributeName" label-position="top" v-else-if="attr.inputType == 1">
                        <Select  filterable multiple >
                          <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    <FormItem :label="attr.attributeName" label-position="top" v-else-if="attr.inputType == 3">
                      <Upload
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">
                          选择文件
                        </Button>
                      </Upload>
                    </FormItem>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </p>
        </Panel>
        <Panel name="3">
            商品SKU及信息
            <p slot="content">
              <Tabs value="name1">
                <TabPane :label="skuLabel" name="name1">
                  <Row :gutter="16">
                    <Col span="6">
                      <FormItem label="包装" label-position="top">
                        <Input placeholder="输入包装"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="规格" label-position="top">
                        <Input placeholder="输入规格"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="批准文号" label-position="top">
                        <Input  placeholder="输入批准文号"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="条形码"  label-position="top">
                        <Input  placeholder="输入条形码"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row :gutter="16">
                    <Col span="6">
                      <FormItem label="SKU编码">
                        <Input  placeholder="编辑SKU编码"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="SKU名称">
                        <Input  placeholder="输入SKU名称"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="当前库存">
                        <Input  placeholder="输入当前库存"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="预警库存">
                        <Input  placeholder="输入预警库存"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row :gutter="16">
                    <Col span="6">
                      <FormItem label="商品价格">
                        <Input  placeholder="输入商品价格"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="市场价格">
                        <Input  placeholder="输入市场价格"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="成本价格">
                        <Input  placeholder="输入成本价格"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="会员价格">
                        <Input  placeholder="输入会员价格"></Input>
                      </FormItem>
                    </Col>

                  </Row>
                  <Row :gutter="16">
                    <Col span="6">
                      <FormItem label="销售单位">
                        <Input  placeholder="输入销售单位" ></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                    </Col>
                    <Col span="6">
                    </Col>
                    <Col span="6">
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <FormItem label="商品详情" label-position="top">
                      </FormItem>
                      <vue-editor v-model="content" style="margin-top: -20px"></vue-editor>
                    </Col>
                  </Row>

                </TabPane>
                <TabPane label="商品轮播图" name="name2">
                  <div class="demo-upload-list" v-for="item in uploadList">
                          <template v-if="item.status === 'finished'">
                              <img :src="item.url">
                              <div class="demo-upload-list-cover">
                                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                              </div>
                          </template>
                          <template v-else>
                              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                          </template>
                      </div>
                      <Upload
                          ref="upload"
                          :show-upload-list="false"
                          :default-file-list="defaultList"
                          :on-success="handleSuccess"
                          :format="['jpg','jpeg','png']"
                          :max-size="2048"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :before-upload="handleBeforeUpload"
                          multiple
                          type="drag"
                          action="//jsonplaceholder.typicode.com/posts/"
                          style="display: inline-block;width:58px;">
                          <div style="width: 58px;height:58px;line-height: 58px;">
                              <Icon type="camera" size="20"></Icon>
                          </div>
                      </Upload>
                      <Modal title="View Image" v-model="visible">
                          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                      </Modal>
                </TabPane>
                <TabPane label="视频" name="name3">
                </TabPane>
              </Tabs>
            </p>
        </Panel>
        <Panel name="4">
          商品价格管理
          <p slot="content">
            <Tabs>
              <TabPane label="区域价格">
                <Button type="primary" @click="addAreaPrice()">+</Button>
                <br/>
                <Row :gutter="16" v-for="item in areaPriceList">
                  <Col span="6">
                    <FormItem label-position="top" label="销售区域">
                      <Cascader  :data="range" filterable style="position:relative;z-index:9900;" placeholder="请选择区域"></Cascader>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label-position="top" label="当前售价" >
                    <Input placeholder="">11</Input>
                  </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label-position="top" label="区域价格" >
                    <Input placeholder="请录入价格"></Input>
                  </FormItem>
                  </Col>
                  <Col span="6">
                  <Button type="error" @click="areaDelete()" style="margin-top: 33px">-</Button>
                  </Col>
                </Row>
              </TabPane>
              <TabPane label="协议价格">
                <Button type="primary" @click="addAgrPrice()">+</Button>
                <br/>
                <Row :gutter="16" v-for="item in agrPriceList">
                  <Col span="6">
                    <FormItem label-position="top" label="协议客户">
                      <Cascader  :data="range" filterable style="position:relative;z-index:9900;" placeholder="请选择客户"></Cascader>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label-position="top" label="当前售价">
                    <Input placeholder="" >11</Input>
                  </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label-position="top" label="协议价格">
                      <Input placeholder="请录入协议价格" ></Input>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <Button type="error" @click="agrDelete()" style="margin-top: 33px">-</Button>
                  </Col>
                </Row>
              </TabPane>
              <TabPane label="...">
              </TabPane>
            </Tabs>
          </p>
        </Panel>
        <Panel name="5">
          商品标签管理
          <p slot="content">
            <Select  filterable multiple style="width:200px;">
              <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
        </Panel>
        <Panel name="6">
          其他信息管理
          <p slot="content">
              <supervision></supervision>
              <Row :gutter="16">
                <Col span="6">
                  <FormItem label="经营范围" label-position="top">
                    <Select v-model="model12" filterable multiple >
                      <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="销售区域" label-position="top">
                    <Cascader  :data="range" filterable ></Cascader>
                  </FormItem>
                </Col>
              </Row>
          </p>
        </Panel>
    </Collapse>
  </Form>
  </div>

</template>

<script>
import { VueEditor } from 'vue2-editor'

import supervision from './supervision.vue'

import swal from 'sweetalert2'

Vue.component('supervision',supervision)

export default {
  components: {
      VueEditor
   },
  data () {
            return {
              ruleValidate: {
                brand: [{required: true, message: '品牌名称不能为空', trigger: 'blur'}],
                commodityAlias: [{required: true, message: '商品别名不能为空', trigger: 'blur'}],
                commodityName: [{required: true, message: '商品名称不能为空', trigger: 'blur'}],
                erpCode: [{required: true, message: 'erp编码不能为空', trigger: 'blur'}],
              },
              dataCateMenu: [],
              typeList:[],
              attrGroup:[],
              classList:[],
              agrPriceList:['1'],
              areaPriceList:['1'],
              showAddCate:false,
              formCateMenu:[],
              baseInfoForm:{
                erpCode:'',
                cateId:'',
                shopId:'',
                typeId:'',
                commodityName:'',
                commodityMemo:'',
                commodityAlias:'',
                commodityEngNm:'',
                namePinyin:'',
                brandId:'',
                suppervisionClass:''
              },
              formPro:{
                brand:'',
              },
                medicine:'',
                content: "<h1>Some initial content</h1>",
                value1: '1',
                data:[],
                commodityList: [],
                brandList: [],
                businessList: [],
                cityList: [],
                label: (h) => {
                    return h('div', [
                        h('span', '基本信息'),

                    ])
                },
                skuLabel: (h) => {
                    return h('div', [
                        h('span', '关键信息'),
                        h('Badge', {
                            props: {
                                count: 3
                            }
                        })
                    ])
                },
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                menuList:[],

            }
        },
        methods: {
            doCateCancle(){
              this.showAddCate = false;
            },
            doCateBind(){

              for(let treeNode of this.$refs['tree'].getCheckedNodes()){
                //menuList.push(treeNode.title);
                this.baseInfoForm.cateId = this.baseInfoForm.cateId + "," + treeNode.title;
              }
              this.getAttrList();
              this.showAddCate = false;
            },
            showCateList(){
              this.$api.doCateList().then(res => {
                if (res.status == "S"){
                  this.dataCateMenu = res.list;
                  this.showAddCate = true;
                }else {
                }
              })
            },
            getProList(){
              this.$api.doProductList().then(res => {
                if (res.status == "S"){
                  this.commodityList = res.result;
                }else {
                }
              })
            },
            getBrandList(){
              this.$api.getBrandList().then(res => {
                if (res.status == "S"){
                  this.brandList = res.result.records;
                }else {
                }
              })
            },

            changeMedicine(id){
              this.$api.getProductById(id).then(res => {
                debugger;
                if (res.status == "S"){
                  this.baseInfoForm = res.result;
                }else {
                }
              })
            },
            getProductTypeByCateId(){
              this.$api.getProductTypeByCateId().then(res => {
                if (res.status == "S"){
                  this.typeList = res.result;
                }else {
                }
              })
            },
            getProductClass(){
              this.$api.getProductClass().then(res => {
                if (res.status == "S"){
                  this.classList = res.list;
                }else {
                }
              })
            },
            getAttrList(typeId){
              this.baseInfoForm.typeId = "测试类型"
              this.$api.getAttrList(typeId).then(res => {
                if (res.status == "S"){
                  this.attrGroup = res.attrGroup;
                }else {
                }
              })
            },
            updateProduct(){
              this.$refs['formPro'].validate((valid) => {
                debugger;
                if (valid) {
                  swal({text: '添加成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {
                  });
                }
              })
            },
            addProduct(){
              swal({text: '添加成功!', type: 'success', showCancelButton: false, width: 300}).then((isConfirm) => {
              });
            },
            checkOpen(){

            },
            addAreaPrice(){
              this.areaPriceList.push('1');
            },
            agrDelete(){
              this.agrPriceList.pop();
            },
            areaDelete(){
              this.areaPriceList.pop();
            },
            addAgrPrice(){
              this.agrPriceList.push('1');
            },

            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;

        },
        created(){
          this.getProList();
          this.getBrandList();
          this.getProductTypeByCateId();
          this.getProductClass();

        }

}
</script>

<style>

    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
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
