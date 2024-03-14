<template>
    <div class="index">
        <div class="hello">
            <span> 你好, {{ user.userName }}。</span>
        </div>
        <div style="margin-top: 20px; font-size: 24px">
            <h1>欢迎登录在线考试系统后台</h1>
            <br />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                //用户信息
                userName: null,
                userId: null,
            },
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            //获取用户信息
            let userName = this.$cookies.get("cname");
            let userId = this.$cookies.get("cid");
            this.user.userName = userName;
            this.user.userId = userId;
        },
    },
};
</script>


<style lang="less" scoped>
.index {
    margin-left: 70px;
    .hello {
        font-size: 28px;
        color: #726f70;
    }
}
</style>

