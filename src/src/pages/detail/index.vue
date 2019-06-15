<template>
  <div class="content">
    <div class="info-header">{{title}}</div>
    <div class="info-describe">
      <span class="small">来源：{{author}}</span>
      <span class="small">时间：{{time}}</span>
    </div>
    <div class="info-content">
      <rich-text :nodes="html" space="nbsp"></rich-text>
    </div>
    <div class="info-operate">
      <van-row>
        <van-col span="12" class="center">
          <van-icon v-if="!starIconFlg" name="star-o" @tap="stared" size="1.2em"/>
          <van-icon v-if="starIconFlg" name="star" @tap="stared" size="1.2em"/>
        </van-col>
        <van-col span="12" class="center">
          <van-icon name="share" size="1.2em"/>
          <button class="shareBtn" open-type="share" hover-class="none"></button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { get, post, wash } from "../../utils";

export default {
  data() {
    return {
      title: "",
      author: "",
      time: "",
      html: "",
      starIconFlg: false
    };
  },

  mounted() {
    this.initData();
  },

  onUnload() {
    this.title = "";
    this.author = "";
    this.time = "";
    this.html = "";
    this.starIconFlg = false;
  },

  methods: {
    stared(event) {
      this.starIconFlg = !this.starIconFlg;
      post(
        `api/wechatapp/collect?isCollect=${this.starIconFlg}&newId=${
          this.getQuery().id
        }`
      );
      
    },

    // 获取路由参数
    getQuery() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      return options;
    },

    async shared() {
      await post(`api/wechatapp/share?id=${this.getQuery().id}`);
    },

    async initData() {
      const data = await get(`api/wechatapp/new?id=${this.getQuery().id}`);
      this.title = data.title;
      this.author = data.author;
      this.time = data.time;
      this.html = wash(data.content);
      this.starIconFlg = data.isCollect;
    }
  },

  onShareAppMessage: function() {
    post(`api/wechatapp/share?id=${this.getQuery().id}`);
    return {
      title: this.title,
      path: `/pages/detail/main?id=${this.getQuery().id}`
    };
  }
};
</script>

<style>
page {
  background-color: #eeeeee;
}
.content {
  padding: 10px;
  background-color: white;
  border-radius: 1%;
  margin: 10px;
  font-size: 90%;
  min-height: calc(100vh - 40px);
  position: relative;
}
.content .info-header {
  font-size: 120%;
  margin-bottom: 10px;
}
.content .info-describe {
  margin-bottom: 15px;
}
.content .info-content {
  margin-bottom: 40px;
}
.content .info-operate {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.shareBtn {
  height: 20px;
  width: 10%;
  background: none;
  border: none;
  position: absolute;
  bottom: 10px;
  right: 20%;
}
.shareBtn::after {
  border: none;
}
.small {
  margin-right: 10px;
  color: gray;
  font-size: 80%;
}
.center {
  text-align: center;
}
</style>
