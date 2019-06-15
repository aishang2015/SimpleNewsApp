<template>
  <div>
    <div v-for="(item, index) in news" :key="index" @click="viewDetail(item.id)">
      <card :title="item.title" :describe="item.describe" :author="item.author" :time="item.time"></card>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import { get } from "../../utils";

export default {
  data() {
    return {
      news: [],
      pageIndex: 1
    };
  },

  components: {
    card
  },

  onShow() {
    this.news = [];
    this.pageIndex = 1;
    this.initData();
  },

  methods: {
    viewDetail(id) {
      wx.navigateTo({ url: "/pages/detail/main" + `?id=${id}` });
    },

    async initData() {
      const data = await get(
        `api/wechatapp/collectNews?pageindex=${this.pageIndex}`
      );
      data.forEach(element => {
        this.news.push(element);
      });
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.pageIndex = 1;
    this.news = [];
    this.initData();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    this.pageIndex = this.pageIndex + 1;
    this.initData();
  }
};
</script>

<style>
page {
  background-color: #eeeeee;
}
.ml-5 {
  margin-left: 5px;
}
</style>
