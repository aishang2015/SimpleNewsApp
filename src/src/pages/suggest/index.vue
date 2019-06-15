<template>
  <div class="suggestEditor">
    <textarea v-model="content" auto-focus placeholder="感谢您提出建议"/>
    <div class="submit-btn">
      <van-button type="primary" @click="submit">提交意见</van-button>
    </div>
  </div>
</template>

<script>
import { get, post, wash } from "../../utils";

export default {
  data() {
    return {
      content: ""
    };
  },

  onShow() {},

  methods: {
    submit() {
      this.sendAdvice();
    },
    async sendAdvice() {
      await post(`api/wechatapp/advice`, { content: this.content });
      this.content = "";
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }
  }
};
</script>

<style>
page {
  background-color: #eeeeee;
}
.suggestEditor {
  margin: 10px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
}

.suggestEditor textarea {
  width: 100%;
  height: 200px;
}

.submit-btn {
  padding-top: 20px;
  height: 40px;
}

.submit-btn van-button {
  float: right;
}
</style>
