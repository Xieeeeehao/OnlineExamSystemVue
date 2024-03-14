<template>
    <div id="register" class="register-container">
        <div class="bg"></div>
        <el-row class="main-container">
            <el-col :lg="8" :xs="16" :md="10" :span="10">
                <div class="bottom">
                    <div class="container">
                        <p class="title">账号注册</p>
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="用户名">
                                <el-input v-model="formLabelAlign.username" clearable placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="formLabelAlign.password" show-password placeholder="请输入密码"
                                    type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="身份">
                                <el-select v-model="formLabelAlign.role" clearable placeholder="请选择身份">
                                    <el-option label="教师" value="1"></el-option>
                                    <el-option label="学生" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- 动态渲染教师特殊选项 -->
                            <el-form-item v-if="formLabelAlign.role === '1'" label="学院">
                                <el-select v-model="formLabelAlign.institute" filterable allow-create remote
                                    placeholder="请选择学院" @focus="getDepartments" clearable>
                                    <el-option v-for="(item, index) in departmentOptions" :key="index" :label="item"
                                        :value="item" />
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '1'" label="性别">
                                <el-select v-model="formLabelAlign.sex" clearable placeholder="请选择性别">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '1'" label="联系方式">
                                <el-input v-model="formLabelAlign.tel" clearable placeholder="请输入联系方式"></el-input>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '1'" label="职称">
                                <el-select v-model="formLabelAlign.type" filterable allow-create remote
                                    placeholder="请选择职称" @focus="getTitles" clearable>
                                    <el-option v-for="item in titleOptions" :key="item" :label="item" :value="item" />
                                </el-select>
                            </el-form-item>
                            <!-- 动态渲染学生特殊选项 -->
                            <el-form-item v-if="formLabelAlign.role === '2'" label="学院">
                                <el-select v-model="formLabelAlign.institute" filterable remote placeholder="请选择学院"
                                    @focus="getDepartments" clearable>
                                    <el-option v-for="(item, index) in departmentOptions" :key="index" :label="item"
                                        :value="item" />
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '2'" label="专业">
                                <el-select v-model="formLabelAlign.major" filterable remote placeholder="请选择专业"
                                    @focus="getMajors" clearable>
                                    <el-option v-for="(item, index) in majorOptions" :key="index" :label="item"
                                        :value="item" />
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '2'" label="年级">
                                <el-select v-model="formLabelAlign.grade" filterable allow-create remote
                                    placeholder="请选择年级" @focus="getGrades" clearable>
                                    <el-option v-for="(item, index) in gradeOptions" :key="index" :label="item"
                                        :value="item" />
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '2'" label="性别">
                                <el-select v-model="formLabelAlign.sex" clearable placeholder="请选择性别">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="formLabelAlign.role === '2'" label="联系方式">
                                <el-input v-model="formLabelAlign.tel" clearable placeholder="请输入联系方式"></el-input>
                            </el-form-item>
                            <div class="submit">
                                <el-button type="primary" @click="register()" style="margin-left: 200px;">Register</el-button>
                            </div>
                            <div class="options">
                                <p class="find">已有账号？立即<a href="#" @click="redirectToLogin()">登录</a></p>
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
export default {
    name: "Register",
    data() {
        return {
            labelPosition: "left",
            formLabelAlign: {
                username: "",//用户名
                password: "",//密码
                grade: "",//年级
                institute: "", // 学院
                major: "",//专业
                sex: "", // 性别
                tel: "", // 联系方式
                type: "", // 教师职称
            },
            departmentOptions: [], // 学院选项列表
            titleOptions: [], // 职称选项列表
            majorOptions: [], // 专业选项列表
            gradeOptions: [], // 年级选项列表
        };
    },
    methods: {
        // 获取学生年级选项
        getGrades() {
            this.$axios.get(`/api/students`)
                .then(response => {
                    const students = response.data.data; // 获取学生数据数组
                    const grades = students.map(student => student.grade); // 提取年级信息
                    const uniqueGrades = [...new Set(grades)]; // 去除重复的年级信息
                    this.gradeOptions = uniqueGrades; // 存储年级选项列表
                })
        },
        // 获取学生专业选项
        getMajors() {
            this.$axios.get(`/api/students`)
                .then(response => {
                    const students = response.data.data; // 获取学生数据数组
                    const majors = students.map(student => student.major); // 提取专业信息
                    const uniqueMajors = [...new Set(majors)]; // 去除重复的专业信息
                    this.majorOptions = uniqueMajors; // 存储专业选项列表
                })
        },
        // 获取学院选项
        getDepartments() {
            this.$axios.get(`/api/teachers`)
                .then(response => {
                    const teachers = response.data.data;
                    const institutes = teachers.map(teacher => teacher.institute);
                    const uniqueInstitutes = [...new Set(institutes)];
                    console.log(uniqueInstitutes);
                    this.departmentOptions = uniqueInstitutes;
                })
        },
        // 获取职称选项
        getTitles() {
            this.$axios.get(`/api/teachers`)
                .then(response => {
                    const teachers = response.data.data;
                    const types = teachers.map(teacher => teacher.type);
                    const uniqueInstitutes = [...new Set(types)];
                    this.titleOptions = uniqueInstitutes;
                })
        },
        // 用户注册请求后台处理
        register() {
            if (this.formLabelAlign.role == null) {
                this.$message.error("请选择身份");
                return;
            }
            this.$axios({
                url: `/api/register`,
                method: "post",
                data: {
                    ...this.formLabelAlign
                }
            }).then((response) => {
                if (response.data.code === 200) {
                    this.$message.success("注册成功");
                    this.$prompt('您的用户ID为:' + response.data.data + ",请牢记！！！！", '警告', {
                        inputPattern: /\d+/, // 规定匹配模式，只允许输入数字
                        inputValidator: (input) => {
                            // 校验函数，确保用户输入了正确的ID格式
                            if (input.toString() === response.data.data.toString()) {
                                return true;
                            } else {
                                return '输入的用户ID不匹配';
                            }
                        },
                        inputPlaceholder: '请输入您的用户ID' // 定义输入框的占位符
                    }).then(({ value }) => {
                        this.$router.push({ path: "/" }); // 跳转到首页
                    })
                } else {
                    this.$message.error("注册失败: " + response.data.message);
                }
            })
        },
        redirectToLogin() {
            this.$router.push({ path: "/" });
        },

    },
    computed: mapState(["userInfo"]),
};
</script>

<style scoped>
.el-input {
    width: 95%;
}

.el-select {
    width: 95%;
}

.register-container {
    background-image: url('/static/img/bg1.png');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.bg {
    background-image: url('/static/img/bg1.png');
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