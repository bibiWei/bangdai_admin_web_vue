<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>商家管理</BreadcrumbItem>
      <BreadcrumbItem>商家信息管理</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formSearch" :label-width="80" style="margin-top: 20px">
      <Row>
        <Col span="20">
          <Col span="8">
            <FormItem label="商家名称">
              <Input v-model="formSearch.bizName" placeholder="请输入商家名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商家联系人">
              <Input v-model="formSearch.bizContactMan" placeholder="请输入商家联系人"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input v-model="formSearch.bizTel" placeholder="请输入联系人电话"></Input>
            </FormItem>
          </Col>
        </Col>
        <Col span="4">
          <Button type="ghost" style="float:right;margin-left:10px;" @click="doReset()">重置</Button>
          <Button type="primary" style="float:right" @click="search()">查询</Button>
        </Col>
        <Col span="24">
          <Button type="primary" style="float:right;margin-bottom:10px;" @click="add()" >新增</Button>
        </Col>
      </Row>
    </Form>

    <Table border :columns="customerList" :data="customerData"></Table>
    <Page :total="total" :page-size="pageSize" size="small"  show-elevator show-sizer show-total style="float: right;margin-top: 10px" @on-change="doPageChange"   @on-page-size-change="doPageSizeChange"></Page>

  </div>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    data () {
        const bizTypeChecker = (rule, value, callback) => {
              if (value!=null && value.length>0) {
                  callback();
              }else{callback(new Error('客户类型不能为空'));}
        };
        const validateMobilePhone = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入联系电话'));
              } else {
                if (!/^1(3|4|5|7|8)\d{9}$/.test(value) && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
                  callback(new Error('请输入正确的电话/手机号码'));
                }
                callback();
              }
        };
      return {
        total:0,pageSize:10, formSearch:{bizName:'',bizType:''},
        formBiz:{
            bizId:'', bizName:''
        },

        bizTypeList:[{'refKey':'0000','refValue':'全部'},{'refKey':'B','refValue':'采购商'},{'refKey':'S','refValue':'供应商'},{'refKey':'P','refValue':'系统平台'}],


        customerList: [
          { type: 'index', width: 60,  align: 'center' },
          { title: '客户编号', key: 'customerCode', align: 'center' , width: 150},
          { title: '客户名称', key: 'customerName', align: 'center' },
          { title: '客户类型',align: 'center',
            render: (h, params) => {
              var cusType = (params.row.buyer === 'Y' ?  "采购客户 ":"");
              cusType += (params.row.warehouser === 'Y' ? "仓储客户 ":"");
              cusType += (params.row.saler === 'Y' ? "供应商客户":"");
              return cusType;}},
          { title: '状态',align: 'center' ,width: 70 ,
            render: (h, params) => {return params.row.status === '00' ? "可用": "不可用";}},
          { title: '客户来源',align: 'center' ,width: 90,
            render: (h, params) => {
              for(let record of this.sourceList){if(params.row.source === record.refKey){return record.refValue;}}
           }},
          { title: '操作', key: 'action', width: 210, align: 'center',
            render: (h, params) => {
              if(params.row.userInfo == null && params.row.source != 'B2B'){
                return h('div', [
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.showMemberinfo(params.row) } } }, '设置主账户'),
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.show(params.row) } } }, '详情'),
                  h('Button', { props: { type: 'error', size: 'small' },
                    on: { click: () => { this.del(params.row) } } }, '删除')
                ]);
              }else{
                return h('div', [
                  h('Button', { props: {  type: 'ghost', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.showMemberinfo(params.row) } } }, '查看主账户'),
                  h('Button', { props: {  type: 'primary', size: 'small' }, style: { marginRight: '5px' },
                    on: { click: () => { this.show(params.row) } } }, '详情'),
                  h('Button', { props: { type: 'error', size: 'small' },
                    on: { click: () => { this.del(params.row) } } }, '删除')
                ]);
              }

            }
          }
        ],
        customerData: []
      }
    },
    methods: {
        search(startIndex,endIndex){
            let params = {
                startIndex:startIndex?startIndex : 0,
                endIndex:endIndex ? endIndex : this.pageSize,
                bizName:this.formSearch.bizName,
                bizType:this.formSearch.bizType === '0000' ? '' : this.formSearch.bizType
            }
            this.$api.getBusinessBaseList(params).then(res => {
              this.customerData = [];
              if(res.status == "S"){
                this.total = res.result.total;
                this.customerData = res.result.records;
              }else{
                swal('获取客户列表失败', res.message, 'error');
              }
            })
        },

        //change page number
        doPageChange(pagenumber){
            let startIndex = ( pagenumber - 1 ) * this.pageSize;
            let endIndex = pagenumber * this.pageSize;
            this.doCustomerList(startIndex,endIndex);
        },
        //change page size
      doPageSizeChange(pageSize){
          this.pageSize = pageSize;
          let startIndex = 0;
          let endIndex = this.pageSize;
          this.search(startIndex,endIndex);
      },
        
    },
    created(){
        //this.doReset();
      	//this.search();
    }
  }
</script>
