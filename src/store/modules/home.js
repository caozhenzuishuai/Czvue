/* 
用来管理首页数据的vuex模块
*/
import {reqBaseCategoryList} from '@/api'

export default  {
  state: {
    baseCategoryList: [],
    x: {},
    y: ''
  },

  mutations: {
    /* 
    接收保存新的分类列表
    */
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    }
  },

  actions: {
    /* 
    获取分类列表的异步action
    */
    async getBaseCategoryList ({commit}) {
      // 1. 发异步ajax请求
      const result = await reqBaseCategoryList()
      // 2. 成功后, 提交mutation保存数据
      if (result.code===200) {
        const baseCategoryList = result.data
        commit('RECEIVE_BASE_CATEGORY_LIST', baseCategoryList)
      }
    }
    
  },
  getters: {},
}