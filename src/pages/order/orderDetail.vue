<<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>订单管理</BreadcrumbItem>
      <BreadcrumbItem>订单详情</BreadcrumbItem>
    </Breadcrumb>
    <Card style="margin-top: 30px">
      <h4 slot="title">
        <Icon type="android-archive"></Icon>
        订单详情
      </h4>

      <Row :gutter="16" class="font-bold">
        <Col span="24">
          <Col span="2" style="text-align: right">
            <span >订单编号:</span>
          </Col>
          <Col span="4">
          <span >{{orderInfoBg.orderNo}}</span>
          </Col>
        </Col>
        <Col span="24" style="margin-top: 10px">
          <Col span="2" style="text-align: right">
            <span >订单状态:</span>
          </Col>
          <Col span="4">
            <span>等待付款</span>
          </Col>
        </Col>
        <Col span="24" style="margin-top: 10px">
          <Col span="2" style="text-align: right">
            <span >订单金额:</span>
          </Col>
          <Col span="4">
        <span class="price-font"><span>{{orderInfoBg.negotiatePrice}}</span>/RMB</span>
          </Col>
        </Col>
      </Row>

      <div style="margin-left: 100px;margin-right: 100px;margin-top: 50px">
        <Steps :current="orderInfoBg.status" >
          <Step title="已下单" content=""></Step>
          <Step title="已支付" content=""></Step>
          <Step title="已发货" content=""></Step>
          <Step title="已完成" content=""></Step>
        </Steps>
      </div>
      <Card :bordered="false" class="top-20">
        <p slot="title">物流详情</p>
        <Tabs value="name1" >
          <TabPane label="求带信息" name="name1">
            <Card :bordered="false" class="top-20">
              <p slot="title">联系信息</p>
              <Row>
                <Col span="8">
                  <span class="expand-key">出发地: </span>
                 <span class="expand-value">{{ orderInfoBg.reqBringVo.departureCountry }} - {{ orderInfoBg.reqBringVo.departureProvince }} - {{ orderInfoBg.reqBringVo.departureCity }}</span>
                </Col>
                <Col span="8">
                  <span class="expand-key">目的地: </span>
                  <span class="expand-value">{{ orderInfoBg.reqBringVo.arrivalCountry }} - {{ orderInfoBg.reqBringVo.arrivalProvince }} - {{ orderInfoBg.reqBringVo.arrivalCity }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">截止时间: </span>
                <span class="expand-value">{{ orderInfoBg.reqBringVo.deadline }}</span>
                </Col>
              </Row>
              <Row style="margin-top: 20px">
                <Col span="8">
                <span class="expand-key">求带人: </span>
                <span class="expand-value">{{ orderInfoBg.reqBringVo.userName }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">求带人电话: </span>
                <span class="expand-value">{{ orderInfoBg.reqBringVo.userPhone }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">求带类型: </span>
                <span class="expand-value">{{ orderInfoBg.reqBringVo.mateType }}</span>
                </Col>
              </Row>
              <Row style="margin-top: 20px">
                <Col span="8">
                <span class="expand-key">求带价格: </span>
                <span class="expand-value">{{ orderInfoBg.reqBringVo.price }} {{ orderInfoBg.reqBringVo.ccy }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">求带人重量: </span>
                <span class="expand-value">{{ orderInfoBg.reqBringVo.weight }}</span>
                </Col>
              </Row>
            </Card>
          </TabPane>
          <TabPane label="帮带信息" name="name2">
            <Card :bordered="false" class="top-20">
              <p slot="title">联系信息</p>
              <Row>
                <Col span="8">
                <span class="expand-key">出发地: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.departureCountry }} - {{ orderInfoBg.helpBringVo.departureProvince }} - {{ orderInfoBg.helpBringVo.departureCity }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">目的地: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.arrivalCountry }} - {{ orderInfoBg.helpBringVo.arrivalProvince }} - {{ orderInfoBg.helpBringVo.arrivalCity }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">出发日期: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.departureDate }}</span>
                </Col>
              </Row>
              <Row style="margin-top: 20px">
                <Col span="8">
                <span class="expand-key">帮带人: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.userName }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">帮带人电话: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.userPhone }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">帮带类型: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.mateType }}</span>
                </Col>
              </Row>
              <Row style="margin-top: 20px">
                <Col span="8">
                <span class="expand-key">帮带价格: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.price }} {{ orderInfoBg.reqBringVo.ccy }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">帮带人重量: </span>
                <span class="expand-value">{{ orderInfoBg.helpBringVo.weight }}</span>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>


    </Card>
  </div>
</template>
<script>
  import swal from 'sweetalert2'
  export default {
    components: {},
    data () {
      return {


        orderInfoBg:{

        }

      }
    },
    methods: {
      getOrderDetailInfo(){
        let orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
        this.orderInfoBg = orderInfo;
        this.orderInfoBg.reqBringVo.deadline = this.orderInfoBg.reqBringVo.deadline.substring(0,19);
        this.orderInfoBg.helpBringVo.departureDate = this.orderInfoBg.helpBringVo.departureDate.substring(0,19);
        this.orderInfoBg.helpBringVo.arrivalDate = this.orderInfoBg.helpBringVo.arrivalDate.substring(0,19);
      }
    },
    created(){

      this.getOrderDetailInfo();
    }
  }
</script>

<style>
  .font-bold{
    font-weight: bold;
  }
  .price-font{
    color: red;
  }
  .top-20{
    margin-top: 20px;
  }
</style>
