<template>
  <div>
    <van-form
      @submit="onSubmit"
      class="formcss"
    >
      <h2>悦动圈</h2>
      <van-field
        v-model="data.accredit"
        name="accredit"
        label="授权地址"
        placeholder="请填写授权地址"
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
    <div class="footcss">
      <van-divider>教程</van-divider>
      <div class="jcss">
        首先打开 <a
          href="https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&amp;pt_3rd_aid=1101774620&amp;daid=381&amp;pt_skey_valid=1&amp;style=35&amp;s_url=http://connect.qq.com&amp;refer_cgi=m_authorize&amp;ucheck=1&amp;fall_to_wv=1&amp;status_os=9.3.2&amp;redirect_uri=auth://www.qq.com&amp;client_id=1101326786&amp;response_type=token&amp;scope=all&amp;sdkp=i&amp;sdkv=2.9&amp;state=test&amp;status_machine=iPhone8,1&amp;switch=1"
          target="_blank"
          style="color:skyblue;font-size:18px"
        >授权地址</a>
        登录后复制地址栏所有的链接粘贴到授权地址框里,输入步数提交即可.
      </div>
    </div>
  </div>
</template>

<script>
import { postydq } from '../api/index'
export default {
  data() {
    return {
      name: 'LeXin',
      data: {
        accredit: '',
        step: ''

      },
      fromstr: '',
      loading: false
    }
  },
  methods: {
    async onSubmit(value) {
      this.loading = true
      console.log(value);
      const { data } = await postydq(value)

      this.fromstr = data.msg
      this.loading = false
    }
  },
}
</script>

<style lang="less" scoped>
.formcss {
  margin-top: 30px;
}
.footcss {
  margin-top: 55px;
}
</style>