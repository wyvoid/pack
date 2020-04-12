<template>
<div id="app-component">
  <header>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/">Go to Main</router-link>
    <router-link to="/my">Go to my</router-link>
    <router-link to="/liveList">Go to liveList</router-link>        
  </header>
  <section>
    <router-view></router-view>
  </section>
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

<style lang="scss">
body{
  padding: 0;
  margin: 0;
}
#app-component{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

header{
  height: 50px;
  line-height: 50px;
  overflow: hidden;
}
section{
  flex: 1;
}
h1{
  color: red;
}
</style>