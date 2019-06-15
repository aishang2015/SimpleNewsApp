<template>
  <div>
    <van-search
      class="fixedSearchBar"
      :value="searchValue"
      placeholder="请输入搜索关键词"
      @change="searchValueChange"
      use-action-slot
      @search="onSearch"
    >
      <view slot="action" @tap="onSearch">搜索</view>
    </van-search>
    <div class="searchResult">
      <div v-for="(item, index) in news" :key="index" @click="viewDetail(item.id)">
        <card :title="item.title" :describe="item.describe" :author="item.author" :time="item.time"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import { get } from "../../utils";

export default {
  data() {
    return {
      searchValue: "",
      pageIndex: 1,
      news: []
    };
  },

  components: {
    card
  },
  onShow() {
    this.$root.$mp.page.getTabBar().setData({
      activeIndex: 1
    });
  },

  methods: {
    searchValueChange($event) {
      this.searchValue = $event.mp.detail;
    },

    onSearch($event) {
      this.pageIndex = 1;
      this.news = [];
      this.initData();
    },

    viewDetail(id) {
      wx.navigateTo({ url: "/pages/detail/main" + `?id=${id}` });
    },

    async initData() {
      const data = await get(
        `api/wechatapp/news?pageindex=${this.pageIndex}&searchText=${
          this.searchValue
        }`
      );
      data.forEach(element => {
        this.news.push(element);
      });
    }
  }
};
</script>

<style>
page {
  background-color: #eeeeee;
}
.fixedSearchBar {
  position: fixed;
  width: 100%;
  top: 0px;
}
.searchResult {
  padding-top: 55px;
}
.ml-5 {
  margin-left: 5px;
}
</style>
