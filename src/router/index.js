import dashboard from "../pages/dashboard.vue";
import NotFoundView from "../components/404.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import resetPwd from "../pages/resetPwd.vue";
import scoreList from "../pages/score/scoreList.vue";
import userList from "../pages/user/userList.vue";
import buyerList from "../pages/buyer/buyerList.vue";
import takerList from "../pages/taker/taker.vue";
import authList from "../pages/auth/authList.vue";
import ticketList from "../pages/auth/ticketList.vue";
import withdrawalsList from "../pages/auth/withdrawalsList.vue";
import exchangeList from "../pages/exchange/exchangeList.vue";
import adList from "../pages/ad/adList.vue";
import messageList from "../pages/message/messageList.vue";
import askList from "../pages/message/askList.vue";
import disputeList from "../pages/message/disputeList.vue";
import evaluateList from "../pages/evaluate/evaluateList.vue";
import allOrderList from "../pages/order/allOrderList.vue";
import orderDetail from "../pages/order/orderDetail.vue";
import circleList from "../pages/message/circleList.vue"
// Routes
const routes = [
  {path: '/login', component: login},
  {path: '/test', component: app, children: [{path: '*', component: NotFoundView}]},
  {
      path: '', component: app, children: [
      {path: '/resetPwd', component: resetPwd},
      {path: '≈', component: dashboard},
      {path: '/sys/scrore', component: scoreList},
      {path: '/user/userList', component: userList},
      {path: '/buyer/buyerList', component: buyerList},
      {path: '/taker/takerList', component: takerList},
      {path: '/auth/authList', component: authList},
      {path: '/auth/ticketList', component: ticketList},
      {path: '/auth/withdrawalsList', component: withdrawalsList},
      {path: '/exchangeList/exchangeList', component: exchangeList},
      {path: '/ad/adList', component: adList},
      {path: '/message/messageList', component: messageList},
      {path: '/message/askList', component: askList},
      {path: '/message/disputeList', component: disputeList},
      {path: '/evaluate/evaluateList', component: evaluateList},
      {path: '/order/allOrderList', component: allOrderList},
      {path: '/order/orderDetail', component: orderDetail},
      {path: '/message/circleList', component: circleList},

    ]

  },
  {path: '*', component: NotFoundView}
]


export default routes
