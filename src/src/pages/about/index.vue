<template>
  <div>
    <div class="userInfo">
      <div class="userAvatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <open-data type="userNickName"></open-data>
    </div>
    <van-cell @click="viewCollect" title="我的收藏" is-link/>
    <van-cell @click="viewSuggest" title="意见反馈" is-link/>
    <van-cell @click="viewDisClaimer" title="关于本软件" is-link/>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {};
  },

  components: {
    card
  },
  onShow() {
    this.$root.$mp.page.getTabBar().setData({
      activeIndex: 2
    });
  },

  methods: {
    bindGetUserInfo(e) {
      console.log(e);
    },
    viewCollect() {
      mpvue.navigateTo({ url: "/pages/collect/main" });
    },
    viewSuggest() {
      mpvue.navigateTo({ url: "/pages/suggest/main" });
    },
    viewDisClaimer() {
      mpvue.navigateTo({ url: "/pages/disclaimer/main" });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style>
page {
  background-color: #eeeeee;
}
.userAvatar {
  height: 70px;
  width: 70px;

  overflow: hidden;
  border-radius: 50%;
}
.userInfo {
  text-align: center;
  height: 100px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
