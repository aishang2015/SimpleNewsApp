<template>
  <div class="content">
    <div class="title">免责证明</div>
    <div class="content">
      <p style="color: #95a5a6;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本小程序刊载的所有内容，均在网上搜集。不保证所有信息的绝对准确性和完整性，并不代表本软件赞同其观点，也不代表本软件对其真实性负责。您若对该文章内容有任何疑问或质疑，
        请发送邮件至aishang2014@126.com。当您使用本小程序时，视为您已经同意并接受本页面的所有信息。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: ""
    };
  },

  methods: {}
};
</script>

<style>
page {
  background-color: #eeeeee;
  text-align: "center";
}
.content{
  min-height: 100vh;
  padding: 10px;
}

.title {
  font-size: 120%;
  font-weight: bold;
  text-align: center;
}
</style>
