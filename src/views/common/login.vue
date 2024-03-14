<template>
    <div id="login" class="login-container">
        <div class="bg"></div>
        <el-row class="main-container">
            <el-col :lg="8" :xs="16" :md="10" :span="10">
                <div class="bottom">
                    <div class="container">
                        <p class="title">账号登录</p>
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="用户ID">
                                <el-input v-model="formLabelAlign.username" clearable placeholder="请输入用户ID(并非用户名)"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="formLabelAlign.password" show-password placeholder="请输入密码"
                                    type="password"></el-input>
                            </el-form-item>
                            <div class="submit">
                                <el-button style="margin-left:210px;" type="primary" class="row-register"
                                    @click="login()">Login</el-button>
                            </div>
                            <div class="options">
                                <p class="find">没有账号？立即<a href="#" @click="register()">注册</a></p>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="footer">
            <el-col> </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
import register from "./register.vue";
export default {
    name: "login",
    data() {
        return {
            role: 2,
            labelPosition: "left",
            formLabelAlign: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        register() {
            this.$router.push({ path: "/register" }); //跳转到首页
        },
        //用户登录请求后台处理
        login() {
            // 获取当前时间
            var currentTime = new Date();
            var currentHour = currentTime.getHours();
            // 定义提醒内容
            var message = '';
            if (currentHour >= 6 && currentHour < 13) {
                message = '今天也是元气满满的一天';
            } else if (currentHour >= 13 && currentHour < 17) {
                message = '下午茶时间到啦';
            } else if (currentHour >= 18 && currentHour < 21) {
                message = '下班时间到啦';
            } else {
                message = '夜已深，请休息吧';
            }
            //判定
            if (
                this.formLabelAlign.username == undefined ||
                this.formLabelAlign.username == ""
            ) {
                this.$message("请输入用户名");
                return;
            }
            if (this.formLabelAlign.password == "") {
                this.$message("请输入密码");
                return;
            }
            this.$axios({
                url: `/api/login`,
                method: "post",
                data: {
                    ...this.formLabelAlign,
                },
            })
                .then((res) => {
                    let resData = res.data.data;
                    // console.log(resData)
                    // console.log(resData.role)
                    if (resData == null) {
                        //错误提示
                        this.$message({
                            showClose: true,
                            type: "error",
                            message: "用户名或者密码错误",
                        });
                    }
                    if (resData != null) {
                        switch (resData.role) {
                            case "0": //管理员
                                this.$cookies.set("cname", resData.adminName);
                                this.$cookies.set("cid", resData.adminId);
                                this.$cookies.set("role", 0);
                                this.$router.push({ path: "/index" }); //跳转到首页
                                this.$notify({
                                    title: '欢迎您,' + resData.adminName,
                                    message: message,
                                    position: 'bottom-right'
                                });
                                break;
                            case "1": //教师
                                this.$cookies.set("cname", resData.teacherName);
                                this.$cookies.set("cid", resData.teacherId);
                                this.$cookies.set("role", 1);
                                this.$router.push({ path: "/index" }); //跳转到教师用户
                                this.$notify({
                                    title: '欢迎您,' + resData.teacherName + '老师',
                                    message: message,
                                    position: 'bottom-right'
                                });
                                break;
                            case "2": //学生
                                this.$cookies.set("cname", resData.studentName);
                                this.$cookies.set("cid", resData.studentId);
                                this.$router.push({ path: "/student" });
                                this.$notify({
                                    title: '欢迎您,' + resData.studentName + '同学',
                                    message: message,
                                    position: 'bottom-right'
                                });
                                break;
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                    if (e.response == undefined || e.response.data == undefined) {
                        this.$message({
                            showClose: true,
                            message: e,
                            type: "error",
                            duration: 5000,
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: e.response.data,
                            type: "error",
                            duration: 5000,
                        });
                    }
                });
        },
        clickTag(key) {
            this.role = key;
        },
    },
    computed: mapState(["userInfo"]),
    mounted() { },
};
</script>

<style lang="less" scoped>
.login-container {
    background-image: url('/static/img/bg1.png');
    /* 设置背景图片的尺寸和位置 */
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.bg {
    /* 添加背景样式，可根据需要进行调整 */
    /* 设置背景图片的URL */
    background-image: url('/static/img/bg1.png');
    /* 设置背景图片的尺寸和位置 */
    background-size: cover;
    background-position: center;
}

.bottom {
    margin-top: 20px;
    padding: 20px;
    border-radius: 8px;
}

.container {
    padding: 20px;
    border-radius: 8px;
    background-color: #f0f2f5;
    width: 500px;
    backdrop-filter: blur(10px);
    /* 添加毛玻璃效果 */
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    /* 设置一个半透明的背景色 */
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}

.submit {
    margin-top: 20px;
}

.options {
    margin-top: 20px;
}

.find a {
    color: antiquewhite;
    cursor: pointer;
}

.find a:hover {
    color: red;
    cursor: pointer;
}
</style>
