<template>
  <div>
    <van-form
      @submit="onSubmit"
      class="formcss"
    >
      <h2>乐心刷步</h2>
      <van-field
        v-model="data.mobile"
        name="mobile"
        label="用户名"
        placeholder="请填写手机号"
      />
      <van-field
        v-model="data.password"
        type="password"
        name="password"
        label="密码"
        placeholder="填写密码"
      />
      <van-field
        v-model="data.step"
        name="step"
        label="步数"
        placeholder="填写步数"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          loading-text="刷步中..."
        >
          提交
        </van-button>
      </div>
    </van-form>
    <span style="font-size:20px;color:skyblue">{{fromstr}}</span>
  </div>
</template>

<script>
import { postLx } from '../api/index'
import { JSEncrypt } from 'jsencrypt'
export default {
  data() {
    return {
      name: 'LeXin',
      data: {
        mobile: '',
        password: '',
        step: ''

      },
      fromstr: '',
      loading: false
    }
  },
  methods: {
    async onSubmit(value) {
      var times = new Date().getTime()
      var rsastr = this.$getRsaCode(times)
      value.token = rsastr
      console.log(value);
      this.loading = true
      const { data } = await postLx(value)
      this.fromstr = data
      this.loading = false
    }
  },
}
</script>

<style lang="less" scoped>
.formcss {
  margin-top: 30px;
}
</style>