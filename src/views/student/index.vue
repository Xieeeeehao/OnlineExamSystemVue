<template>
  <div id="student">
    <!-- 头部 -->
    <el-row class="header">
      <el-col :span="24">
        <ul class="list">
          <li class="logo"><span>在线考试系统</span></li>
          <li @click="exam()"><a href="javascript:;">考试中心</a></li>
          <li @click="practice()">
            <a href="javascript:;">试卷练习</a>
          </li>
          <li>
            <router-link to="/scoreTable">我的分数</router-link>
          </li>
          <li class="right" @mouseenter="flag = !flag" @mouseleave="flag = !flag">
            <el-row>
              <el-col :span="12">
                <el-avatar
                  shape="square"
                  :size="50"
                  :src="'/static/img/admin.jpg'"
                  style="margin: 5px 5px 0 0"
                ></el-avatar>
              </el-col>
              <el-col :span="12">
                <a href="javascript:;" style="font-size: 22px; font-weight: 600">
                <!-- <i class="iconfont icon-Userselect icon"></i> -->
                {{ user.userName }}</a
                >
                <div class="msg" v-if="flag">
                  <p @click="manage()">修改密码</p>
                  <p @click="exit()">退出</p>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-col>
    </el-row>

    <!--路由区域-->
    <div class="main" style="height: 930px; flex: 1; overflow-y: auto">
      <router-view></router-view>
    </div>
    <!-- 尾部 -->
    <v-footer></v-footer>
  </div>
</template>

<script>
import myFooter from "@/views/student/myFooter";
import { mapState } from "vuex";
export default {
  components: {
    "v-footer": myFooter,
  },
  data() {
    return {
      flag: false,
      user: {},
    };
  },
  created() {
    this.userInfo();
  },
  methods: {
    exit() {
      //退出登录
      this.$router.push({ path: "/" }); //跳转到登录页面
      this.$cookies.remove("cname"); //清除cookie
      this.$cookies.remove("cid");
      this.$cookies.remove("rb_token"); //清除cookie
      this.$cookies.remove("rb_role");
    },
    manage() {
      //跳转到修改密码页面
      this.$router.push({ path: "/changePwd" });
    },
    userInfo() {
      let studentName = this.$cookies.get("cname");
      let studentId = this.$cookies.get("cid");
      console.log(`studentId${studentId}`);
      console.log(`studentName ${studentName}`);
      this.user.userName = studentName;
      this.user.studentId = studentId;
    },
    practice() {
      //跳转练习模式
      let isPractice = true;
      this.$store.commit("practice", isPractice);
      this.$router.push({ path: "/startExam" });
    },
    exam() {
      //跳转考试模式
      let isPractice = false;
      this.$store.commit("practice", isPractice);
      this.$router.push({ path: "/student" });
    },
  },
  computed: mapState(["isPractice"]),
};
</script>

<style scoped>
#student .header {
  position: fixed;
  /* 使顶部导航栏固定在页面顶部 */
  top: 0;
  width: 100%;
  background-color: #fff;
  /* 设置背景颜色，您可以根据需要进行修改 */
  z-index: 1000;
  /* 确保顶部导航栏在其他元素之上 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果，使导航栏更具立体感 */
}

#student .list {
  display: flex;
}

#student .list li {
  padding: 0 20px;
  cursor: pointer;
}

#student .list li:hover {
  /* background-color: #0195ff; */
  transition: all 2s ease;
}

#student .list li:hover a {
  color: #0195ff;
}

#student .list .right {
  margin-left: auto;
  position: relative;
}

#student .list li.right :hover a {
  color: #000;
}

#student .list .logo {
  display: flex;
  font-weight: bold;
  color: black;
  font-size: 28px;
}

#student .list .logo i {
  font-size: 50px;
}

.list a {
  text-decoration: none;
  color: #334046;
  font-size: 18px;
}

li {
  list-style: none;
  height: 60px;
  line-height: 60px;
}

.right .msg {
  text-align: center;
  position: absolute;
  top: 60px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border-bottom: 3px solid #0195ff;
  background-color: #fff;
}

.right .msg p {
  height: 40px;
  line-height: 40px;
  width: 105px;
}

.right .msg p:hover {
  background-color: #0195ff;
}
</style>
