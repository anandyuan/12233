<template>
  <div>
    <!-- 标题 -->

    <van-nav-bar
      title="步 数 修 改"
      class="navcss"
    />
    <van-notice-bar mode="closeable">
      乐心接口已修复,小米托管因官方限制,不保证全部能托管上
    </van-notice-bar>
    <!-- 图片 -->
    <van-image
      width="100%"
      height="100%"
      src="https://pic.rmb.bdstatic.com/bjh/89a37a0a351caa52293f89c8f9afe0ee.png"
      fit="cover"
    />
    <!-- 表单 -->
    <van-form
      @submit="onSubmit"
      class="formcss"
    >
      <van-field
        v-model="username"
        name="mobile"
        label="手机号"
        placeholder="手机号"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码"
      />
      <van-field
        v-model="step"
        type="step"
        name="step"
        label="步数"
        placeholder="步数"
      />
      <!-- 接口选择 -->
      <van-field
        readonly
        clickable
        label="接口"
        :value="value"
        placeholder="请选择接口"
        @click="showPicker = true"
        class="interface"
        name="interface"
      />
      <van-popup
        v-model="showPicker"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="columns"
          active
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div>
        <van-field
          name="switch"
          label="是否托管"
        >
          <template #input>
            <van-switch
              v-model="switchChecked"
              size="20"
            />
          </template>
        </van-field>
        <van-field
          v-if="switchChecked"
          v-model="key"
          name="key"
          label="托管key"
          placeholder="填写托管key"
        />
        <van-button
          round
          block
          type="info"
          :loading="loading"
          native-type="submit"
          loading-text="刷步中..."
        >
          提交
        </van-button>
      </div>
    </van-form>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      说 明
    </van-divider>

    <van-cell-group>
      <van-cell icon="comment">
        1.下载<a
          href="http://app.mi.com/details?id=com.xiaomi.hm.health"
          style="color:skyblue;"
          target="_blank"
        >小米运动</a>注册账号

      </van-cell>
      <van-cell
        value="2. 登录之后请设置密码"
        icon="comment"
      />
      <van-cell
        value="3. App内绑定你想同步数据的项目"
        icon="comment"
      />
      <van-cell
        value="4. 托管完全免费,每日8点30左右开刷"
        icon="comment"
      >
        4. 托管完全免费,每日8点30左右开刷 <span
          style="color:skyblue;"
          @click="isshow=true"
        >免费key</span>
      </van-cell>
    </van-cell-group>
    <!-- 通知 -->
    <van-notice-bar
      color="#1989fa"
      background="#FFFBE8"
      left-icon="info-o"
      style="font-size:14px;"
    >
      小程序已上线,搜索[季风助手]添加! <span
        style="color:#FFA500"
        @click="isimg=true"
      >查看二维码</span>
    </van-notice-bar>
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    >
      接口已被调用:{{quantitystr}}次
    </van-notice-bar>

    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="user-o"
    >
      <span style="margin-right:70px">蜀ICP备15021793号-2</span>联系作者:<a
        href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=630876811@qq.com"
        target="_blank"
      >Quiet</a>
    </van-notice-bar>
    <!-- 分割 -->
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      托 管 状 态
    </van-divider>
    <!-- list -->
    <van-list
      v-model="loadinga"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
      >
        <span v-html="item+'步'"></span>
      </van-cell>
    </van-list>
    <!-- 卡密 -->

    <van-popup
      v-model="isshow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-cell
        v-for="(item,index) in keydata"
        :key="index"
      >
        {{item}}
      </van-cell>
    </van-popup>
    <!-- 二维码 -->
    <van-popup
      v-model="isimg"
      :style="{ height: '40%' }"
      position="bottom"
    >
      <van-image src="https://pic.rmb.bdstatic.com/bjh/bc81115e7e4c0e11551c44392aa7bd4e.jpeg" />
    </van-popup>
    <van-popup
      v-model="islexin"
      position="top"
      :style="{ height: '50%' }"
      round
    >
      <le-xin />
    </van-popup>
    <!-- 悦动圈 -->
    <van-popup
      v-model="isydq"
      position="top"
      :style="{ height: '55%' }"
      round
    >
      <ydq />
    </van-popup>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="star-o">小米刷步</van-tabbar-item>
      <van-tabbar-item
        icon="like-o"
        @click="islexin=true"
      >乐心刷步</van-tabbar-item>
      <van-tabbar-item
        icon="circle"
        @click="isydq=true"
      >悦动圈</van-tabbar-item>
    </van-tabbar>

  </div>

</template>

<script>
console.log("\n %c 刷步程序  Powered by 作者Quiet | https://www.txmmp.cn", "color:#fff;background: skyblue;padding:5px;border-radius: 10px;");
import { Notify } from 'vant';
import { getInter, getQuantity, getList, delKey, searchkey, getkm } from '@/api/index'
import LeXin from './lexin'
import Ydq from './ydq'
export default {
  data() {
    return {
      name: 'Index',
      username: '',
      password: '',
      step: '',
      key: '',
      value: '',
      islexin: false,
      active: 0,
      columns: ['接口1', '接口2', '接口3', '接口4', '接口5'],
      showPicker: false,
      isshow: false,
      quantitystr: 0,
      data: {
        mobile: '',
        password: '',
        step: '',
        interface: 1,
        key: ''
      },
      loading: false,
      switchChecked: false,
      list: [],
      datanum: 0,
      finished: false,
      loadinga: false,
      data_list: [],
      showShare: false,
      keydata: [],
      isimg: false,
      isydq: false
    }
  },
  components: {
    LeXin,
    Ydq
  },
  created() {
    this.quantity()
    this.getStorage()
    this.getKey()
  },
  methods: {

    async onSubmit(values) {
      if (this.switchChecked) {
        const { data } = await searchkey(values)
        // console.log(data);
        if (data == 'error: key错误,请检查') {
          Notify({ type: 'warning', message: data });
          return;
        } else {
          delKey(values.key)
          this.loading = true
          const { data } = await getInter(values)
          Notify({ type: 'success', message: data + ',并提交成功' });
          this.loading = false
          localStorage.setItem('user_str', values.mobile)
          localStorage.setItem('password', values.password)
          localStorage.setItem('step', values.step)
        }

      } else {
        this.loading = true
        const { data } = await getInter(values)
        this.$toast(data)

        this.loading = false
        localStorage.setItem('user_str', values.mobile)
        localStorage.setItem('password', values.password)
        localStorage.setItem('step', values.step)
      }

    },
    onConfirm(value, index) {
      this.value = index + 1;
      // console.log(index);
      this.showPicker = false;
    },
    async quantity() {
      const { data } = await getQuantity()
      // console.log(data);
      this.quantitystr = data
    },
    fieChange() {
      // console.log(this.value);
    },
    getStorage() {
      this.username = localStorage.getItem('user_str')
      this.password = localStorage.getItem('password')
      this.step = localStorage.getItem('step')
    },
    async onLoad() {
      this.loadinga = true
      const { data } = await getList()
      this.data_list = data.split('<br/>')
      this.data_list.splice(this.data_list.length - 1, 1)
      this.list.push(...this.data_list);
      this.loadinga = false;
      if (this.list.length >= this.data_list.length) {
        this.finished = true;
      }

    },
    async getKey() {
      const { data } = await getkm()
      this.keydata = data.split('<br/>')
      this.keydata.splice(this.keydata.length - 1, 1)
      // console.log(this.keydata);
    }

  },
}
</script>

<style lang="less" scoped>
/deep/.navcss {
  background: #1989fa;

  .van-nav-bar__title {
    color: #fff;
    font-size: 20px;
  }
}
.formcss {
  margin-top: 15px;
}
.van-cell__value--alone {
  text-align: center;
  color: orange;
}
</style>