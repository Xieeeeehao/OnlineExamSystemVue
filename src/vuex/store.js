import VUE from 'vue'
import VUEX from 'vuex'

VUE.use(VUEX)

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [
    {
      index: '1',
      title: '考试管理',
      icon: 'el-icon-notebook-1',
      content: [{ item2: '考试查询', path: '/selectExam' }, { item3: '添加考试', path: '/addExam' }],
    },
    {
      index: '2',
      title: '题库管理',
      icon: 'el-icon-notebook-2',
      content: [{ item2: '题目列表', path: '/selectAnswer' }, { item3: '新增题目', path: '/addAnswer' }, { path: '/addAnswerChildren' }],
    },
    {
      index: '3',
      title: '成绩查询',
      icon: 'el-icon-search',
      content: [{ item1: '学生成绩查询', path: '/allStudentsGrade' }, { path: '/grade' }, { item2: '成绩分段查询', path: '/selectExamToPart' }, { path: '/scorePart' }],
    },
    {
      index: '4',
      title: '学生管理',
      icon: 'el-icon-s-custom',
      content: [{ item1: '学生管理', path: '/studentManage' }, { item2: '添加学生', path: '/addStudent' }],
    },
  ],
}
const mutations = {
  practice(state, status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
  },
  changeUserInfo(state, info) {
    state.userInfo = info
  }
}
const getters = {

}

const actions = {
  getUserInfo(context, info) {
    context.commit('changeUserInfo', info)
  },
  getPractice(context, status) {
    context.commit('practice', status)
  }
}
export default new VUEX.Store({
  state,
  mutations,
  getters,
  actions,
  // store
})
