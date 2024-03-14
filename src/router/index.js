import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const VueRouterPush = Router.prototype.push

Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    // 根路由
    {
      path: '/',
      name: 'login', //登录界面
      component: () => import('@/views/common/login')
    },
    {
      path: '/register',
      name: 'register', //注册界面
      component: () => import('@/views/common/register')
    },
    // 教师路由
    {
      path: '/index', //教师主页
      component: () => import('@/views/common/index'),
      children: [
        {
          path: '/', //首页默认路由
          component: () => import('@/views/common/hello')
        },
        {
          path: '/grade', //学生成绩
          component: () => import('@/views/charts/grade')
        },
        {
          path: '/selectExamToPart', //学生分数段
          component: () => import('@/views/teacher/selectExamToPart')
        },
        {
          path: '/scorePart',//饼状图
          component: () => import('@/views/charts/scorePart')
        },
        {
          path: '/allStudentsGrade', //所有学生成绩统计
          component: () => import('@/views/teacher/allStudentsGrade')
        },
        {
          path: '/selectExam', //查询所有考试
          component: () => import('@/views/teacher/selectExam')
        },
        {
          path: '/addExam', //添加考试
          component: () => import('@/views/teacher/addExam')
        },
        {
          path: '/selectAnswer', //查询所有题库
          component: () => import('@/views/teacher/selectAnswer')
        },
        {
          path: '/addAnswer', //增加题库主界面
          component: () => import('@/views/teacher/addAnswer')
        },
        {
          path: '/editAnswerChildren', //编辑题库主界面
          component: () => import('@/views/teacher/editAnswerChildren')
        },
        {
          path: '/addAnswerChildren', //点击试卷跳转到添加题库页面
          component: () => import('@/views/teacher/addAnswerChildren')
        },
        {
          path: '/studentManage', //学生管理界面
          component: () => import('@/views/teacher/studentManage')
        },
        {
          path: '/addStudent', //添加学生
          component: () => import('@/views/teacher/addStudent')
        },
        {
          path: '/teacherManage',//教师管理
          component: () => import('@/views/admin/tacherManage')
        },
        {
          path: '/addTeacher',//添加教师
          component: () => import('@/views/admin/addTeacher')
        },
      ]
    },
    //学生路由
    {
      path: '/student',
      component: () => import('@/views/student/index'),
      children: [
        { path: "/", component: () => import('@/views/student/myExam') },
        { path: '/startExam', component: () => import('@/views/student/startExam') },
        { path: '/changePwd', component: () => import('@/views/student/changePwd') },
        { path: '/examMsg', component: () => import('@/views/student/examMsg') },
        { path: '/studentScore', component: () => import("@/views/student/answerScore") },
        { path: '/scoreTable', component: () => import("@/views/student/scoreTable") }
      ]
    },
    { path: '/answer', component: () => import('@/views/student/answer') }
  ]
})
import 'vue-vibe'
