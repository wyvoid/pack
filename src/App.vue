<template>
<div id="app-component">
  <h1>{{msg}}</h1>
  <!-- 使用 router-link 组件来导航. -->
  <!-- 通过传入 `to` 属性指定链接. -->
  <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
  <router-link to="/">Go to Main</router-link>
  <router-link to="/my">Go to my</router-link>
  <router-link to="/liveList">Go to liveList</router-link>
  <router-view></router-view>
</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      msg: 'Hello, Webpack'
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  color: red;
}
</style>