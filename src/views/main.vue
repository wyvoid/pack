<template>
  <div>
    <h1>这里是 首页</h1>
    <label id="draglable" v-drag="{throttle:10}">Drag</label>
  </div>
</template>

<script>


import drag from '@/directive/drag'

export default {
  data() {
    return {

    }
  },
  directives: {
    drag
  },
  menthod: {

  }
}
</script>

<style lang="scss" scoped>
label{
  position: fixed;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid yellow;
  border-radius: 50%;
  line-height: 50px;
}
</style>