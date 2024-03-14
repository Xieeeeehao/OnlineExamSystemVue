<template>
    <div>
        <el-menu default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" menu-trigger="click" router>
            <el-menu-item index="0" @click="backindex()">
                <i class="el-icon-s-home" style="font-size: 28px"></i>
                <span class="title">首页</span>
            </el-menu-item>
            <el-submenu v-for="(item, index) in menu" :index="item.index" :key="index">
                <template slot="title">
                    <div class="el-item-menu left-width">
                        <i class="iconfont" :class="item.icon" style="font-size: 28px"></i>
                        <span slot="title" class="title"> {{ item.title }}</span>
                    </div>
                </template>
                <el-menu-item-group v-for="(list, index1) in item.content" :key="index1" class="stitle">
                    <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item1 != null"
                        style="color: gray;padding-left: 70px;">
                        {{ list.item1 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item2 != null"
                        style="color: gray;padding-left: 70px;">
                        {{ list.item2 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index)" :index="list.path" v-if="list.item3 != null"
                        style="color: gray;padding-left: 70px;">
                        {{ list.item3 }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.title {
    font-size: 25;
    margin-left: 19px;
}

.stitle {
    margin-top: -10px;
}
</style>

<script>
import { mapState } from "vuex";
export default {
    props: {
        isCollapse: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {};
    },
    computed: mapState(["menu"]),
    created() {
        this.addData();
    },
    methods: {
        backindex() {
            this.$router.push({ path: "/index" });
        },
        handleOpen(key, keyPath) {
            // this.$emit('open', key, keyPath);
        },
        handleClose(key, keyPath) {
            // this.$emit('close', key, keyPath);
        },
        toggleCollapse() {
            this.$emit('toggle-collapse', !this.isCollapse); // 向父组件发送收缩和展开状态
        },
        handleTitle(index) {
            this.bus.$emit("sendIndex", index);
        },
        addData() {
            let role = this.$cookies.get("role");
            if (role == 0) {
                this.menu.push({
                    index: "5",
                    title: "教师管理",
                    icon: "el-icon-user",
                    content: [
                        { item1: "教师管理", path: "/teacherManage" },
                        { item2: "添加教师", path: "/addTeacher" },
                    ],
                });
            }
        },
    }
}
</script>