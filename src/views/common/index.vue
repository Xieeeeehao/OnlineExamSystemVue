<template>
  <div id="index">
    <headerBar @toggle-left-component-collapse="toggleLeftComponentCollapse" />
    <section class="container">
      <div class="left_side">
        <menuBar1 :is-collapse="isCollapse" @toggle-collapse="toggleCollapse" />
      </div>
      <div class="main_wrapper">
        <br><br>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import header from '@/views/common/header'
import menuBar from '@/views/common/menuBar'
export default {
  components: {
    headerBar: header,
    menuBar1: menuBar,
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    toggleLeftComponentCollapse() {
      this.isCollapse = !this.isCollapse; // 切换左边组件的展开状态
    },
    toggleCollapse(isCollapsed) {
      this.isCollapse = isCollapsed; // 当左边组件的展开状态发生改变时更新父组件的状态
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  background-color: #fff;
}

.main_wrapper {
  overflow: hidden;
  flex: 1;
  background-color: #fff;
}


</style>
