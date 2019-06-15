<template>
  <div class="card">
    <div class="card-header">{{title}}</div>
    <div class="card-content"><rich-text type="node" :nodes="describe"></rich-text></div>
    <div class="card-footer">
      <div class="left">{{author}}</div>
      <div class="right">{{time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "describe", "author", "time"]
};
</script>

<style>
.card {
  padding: 10px;
  background-color: white;
  border-radius: 2%;
  margin: 10px;
  font-size: 90%;
}
.card-content {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 80%;
  color: gray;
  margin: 5px 0;
}
.card-footer {
  font-size: 80%;
  color: gray;
  width: 100%;
  margin: 0;
}
.card-footer .left {
  display: inline-block;
}
.card-footer .right {
  margin-left: 15px;
  display: inline-block;
}
</style>
