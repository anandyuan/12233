import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'

import JSEncrypt from 'jsencrypt';

Vue.prototype.$getRsaCode = function (str) { // 注册方法
  let pubKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZ7eojI03b9/HZW6XbMLxdllcz
  bLgSk88yHxYXW2WSuC5BkkCDbJ5+K9ixT1GNxD+s7thz03Fhc9r/5Fd843MY+/cx
  Z9E+MnguMHCQ6y+zAhyAyBQp6avUJXLyR4MZb/raydwzTUayu6DONrhrHMqEJ5pQ
  SjJnOE2IYFposdhs6wIDAQAB
  -----END PUBLIC KEY-----`;// ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString());  // 进行加密
  return data;
}
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({

  render: h => h(App)
}).$mount('#app')
