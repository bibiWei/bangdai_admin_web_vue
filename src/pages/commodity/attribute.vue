<template>
  <Form>
    <Card>
      <Row>
        <Col span='8'>
          <FormItem label="商品分类">

           <Cascader :data="data" filterable placeholder="请选择分类" style="width: 200px"></Cascader>
          </FormItem>
        </Col>
        <Col span='8'>
          <FormItem label="属性名称">
           <Input placeholder="属性名称" style="width: 200px"></Input>
         </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="属性编码">
             <Input placeholder="属性编码" style="width: 200px"></Input>
           </FormItem>

        </Col>
      </Row>
      <Row>
        <Col span='8'>
          <FormItem label="属性描述">
             <Input placeholder="属性描述" style="width: 200px" @on-blur="doClick"></Input>
           </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="属性类型">
       <Select  filterable style="width:200px;" @on-change="doInputTypeChange">
           <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
       </Select>
     </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="选项集合">
           <Input placeholder="选项集合" style="width: 200px" ref="valset" ></Input>
         </FormItem>

        </Col>
      </Row>
      <Row>
        <Col span='8'>
          <FormItem label="最大长度">
       <Input  placeholder="最大长度" style="width: 200px"></Input>
     </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="查询条件">
       <i-switch></i-switch>
     </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="显示属性">
       <i-switch></i-switch>
     </FormItem>

        </Col>
      </Row>
      <Row>
        <Col span='8'>
          <FormItem label="显示排序">
       <Input   placeholder="显示排序" style="width: 200px"></Input>
     </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="SKU属性">
       <i-switch></i-switch>
     </FormItem>

        </Col>
        <Col span='8'>
          <FormItem label="是否必须">
       <i-switch></i-switch>
     </FormItem>

        </Col>
      </Row>
    </Card>
</Form>
</template>

<script>
import swal from 'sweetalert2'
export default {

  name:"attribtueAdd",
  props: {},

  data(){
    return{
      typeList:[
        {
            label: '手工输入',
            value: '1'
        },
        {
          label: '选择输入',
          value: '2'
        }
      ],
      data:[{
          value: '1',
          label: '中西药',
          children: [
              {
                  value: '11',
                  label: '五官科',
                  children: [
                      {
                          value: '111',
                          label: '麻黄',
                      }
                  ]
              },
              {
                  value: '12',
                  label: '神经科',
                  children: [
                      {
                          value: '121',
                          label: '麻黄',
                      }
                  ]
              },
              {
                  value: '13',
                  label: '消化科',
                  children: [
                      {
                          value: '131',
                          label: '麻黄',
                      }
                  ]
              }
          ]
      }, {
          value: '2',
          label: '中药饮片',
          children: [
              {
                  value: '21',
                  label: '解表药',
                  children: [
                      {
                          value: '211',
                          label: '麻黄',
                      }
                  ]
              },
              {
                  value: '22',
                  label: '泄下药',
                  children: [
                      {
                          value: '221',
                          label: '大黄',
                      },
                      {
                          value: '222',
                          label: '亚麻子',
                      }
                  ]
              }
          ],
      }]

    }
  },
  methods:{

     doInputTypeChange(selectedItem){
       //swal('获取用户列表失败', selectedItem.val);
       console.log(selectedItem);

       this.$refs.valset.value='1';

     },
     doClick(eve){
       console.log('---');
     }
  },
  created(){
    console.log('00000');
  }

}
</script>

<style>

</style>
