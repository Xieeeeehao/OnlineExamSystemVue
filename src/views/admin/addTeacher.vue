<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.teacherName" placeholder="请填写姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd" placeholder="请填写密码"></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="form.institute" filterable allow-create remote placeholder="请选择学院" @focus="getInstitutes">
          <el-option v-for="item in instituteOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" clearable placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.tel" placeholder="请填写电话号码"></el-input>
      </el-form-item> 
      <el-form-item label="邮件">
        <el-input v-model="form.email" placeholder="请填写邮件"></el-input>
      </el-form-item>
      <!-- <el-form-item label="身份证号">
        <el-input v-model="form.cardId"></el-input>
      </el-form-item> -->
      <el-form-item label="职称">
        <el-select v-model="form.type" filterable allow-create remote placeholder="请选择职称" @focus="getTypes">
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()"> Create</el-button>
        <el-button type="danger" native-type="reset"> Reset</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import md5 from "js-md5";

export default {
  data() {
    return {
      form: { //表单数据初始化
        studentName: null,
        grade: null,
        major: null,
        clazz: null,
        institute: null,
        tel: null,
        email: null,
        pwd: null,
        cardId: null,
        sex: null,
        role: 2
      },
      typeOptions: [],//职称列表
      instituteOptions: [],//学院列表
    };
  },
  methods: {
    //获取职称列表
    getTypes() {
      this.$axios.get(`/api/teachers`)
        .then(response => {
          const teachers = response.data.data;
          const types = teachers.map(teacher => teacher.type);
          const uniqueInstitutes = [...new Set(types)];
          console.log(uniqueInstitutes);
          this.typeOptions = uniqueInstitutes;
        })
    },
    //获取学院列表
    getInstitutes() {
      this.$axios.get(`/api/teachers`)
        .then(response => {
          const teachers = response.data.data;
          const types = teachers.map(teacher => teacher.institute);
          const uniqueInstitutes = [...new Set(types)];
          console.log(uniqueInstitutes);
          this.instituteOptions = uniqueInstitutes;
        })
    },
    onSubmit() { //数据提交
      // 进行 MD5 加密
      this.form.pwd = md5(this.form.pwd);
      this.$axios({
        url: '/api/teacher',
        method: 'post',
        data: {
          ...this.form
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '数据添加成功',
            type: 'success'
          })
          this.$router.push({ path: '/teacherManage' })
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}

.el-input {
  width: 300px;
}

.el-select {
  width: 300px;
}
</style>
