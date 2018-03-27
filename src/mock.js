var Mock = require('mockjs')

var Random = Mock.Random


//获取产品下拉框
Mock.mock('http://mock/product', {
  'status':'S',
  'list|5': [{
    'id|+1': 1,
    'commodityName':'@cword(3,6)'
  }]
})

//获取品牌下拉框
Mock.mock('http://mock/product/brandList', {
  'status':'S',
  'list|3': [{
    'id|+1': 1,
    'brandName':'@cword(3,6)'
  }]
})

//获取药品详情
Mock.mock('http://mock/product/productById', {
  'status':'S',
  'info': {
    'id|+1': 1,
    'erpCode':'@integer(1000)',
    'shopId':'1',
    'typeId':'1',
    'commondityName':'@cword(3,6)',
    'commondityMemo':'@cword(3,6)',
    'commondityAlias':'@cword(3,6)',
    'commondityEngNm':'@string()',
    'namePinyin':'@string()',
    'brandId':'1',
    'suppervisionClass':'1',
    'status':'00',
  }
})

Mock.mock('http://mock/product/productTypeByCateId', {
  'status':'S',
  'list|3': [{
    'id|+1': 1,
    'typeName':'@cword(3,6)'
  }]
})

Mock.mock('http://mock/product/productTypeByCateId', {
  'status':'S',
  'list|3': [{
    'id|+1': 1,
    'typeName':'@cword(3,6)'
  }]
})

Mock.mock('http://mock/product/attrList', {
  'status':'S',
  'attrGroup':[
    {
      'groupName':'@cword(3,6)',
      'list|3': [{
        'id|+1': 1,
        'attributeName': '@cword(3,6)',
        'innerCode': '@integer(100)',
        'inputType': '0'
      }]
    },
    {
      'groupName':'@cword(3,6)',
      'list|3': [{
        'id|+1': 1,
        'attributeName':'@cword(3,6)',
        'innerCode':'@integer(100)',
        'inputType':'3'
      }]
    },
    {
      'groupName':'@cword(3,6)',
      'list|3': [{
        'id|+1': 1,
        'attributeName':'@cword(3,6)',
        'innerCode':'@integer(100)',
        'inputType':'1'
      }]
    },
  ]
})

Mock.mock('http://mock/product/cateList', {
  'status':'S',
  'list':[
    {
      'title': '@cword(3,6)',
      'expand': true,
      'children': [
        {
          'title': '@cword(3,6)',
          'expand': true,
          'children': [
            {
              'title': '@cword(3,6)'
            },
            {
              'title': '@cword(3,6)'
            }
          ]
        },
        {
          'title': '@cword(3,6)',
          'expand': true,
          'children': [
            {
              'title': '@cword(3,6)'
            },
            {
              'title': '@cword(3,6)'
            }
          ]
        }
      ]
    }
    ],
})






