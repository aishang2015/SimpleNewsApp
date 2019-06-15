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
      pageIndex: 1,
      news: []
    };
  },

  components: {
    card
  },

  onShow() {
    this.$root.$mp.page.getTabBar().setData({
      activeIndex: 0
    });
  },

  mounted() {
    this.initData();
  },

  methods: {
    viewDetail(id) {
      wx.navigateTo({ url: "/pages/detail/main" + `?id=${id}` });
    },

    async initData() {
      const data = await get(`api/wechatapp/news?pageindex=${this.pageIndex}`);
      data.forEach(element => {
        this.news.push(element);
      });
    }
  },

  onReachBottom() {
    this.pageIndex = this.pageIndex + 1;
    this.initData();
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.pageIndex = 1;
    this.news = [];
    this.initData();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
};
</script>

<style>
page {
  background-color: #eeeeee;
}
</style>
