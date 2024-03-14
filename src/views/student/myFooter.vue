<template>
  <footer id="footer">
    <ul>
      <li><a href="javascript:;">关于我们</a></li>
      <li><a href="javascript:;">免责声明</a></li>
      <li><a href="javascript:;">使用协议</a></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "myFooter",
};
</script>

<style scoped>
#footer a {
  color: #919698;
  font-size: 14px;
}

#footer {
  background-color: #eee;
  position: fixed;
  bottom: 0;
  width: 100%;
  /* 使页脚充满整个页面宽度 */
}

#footer ul {
  margin-top: 0px;
  border-top: 1px solid #d5d5d5;
  display: flex;
  justify-content: center;
  height: 80px;
  line-height: 80px;
}

#footer ul li {
  color: #919698;
  font-size: 14px;
  margin-right: 20px;
}
</style>
