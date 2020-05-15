import { getUserTempId, saveUserInfo, getUserInfo } from "@/utils";
import { reqRegister, reqLogin, reqLogout } from "@/api";

export default {
  state: {
    userInfo: getUserInfo(),
    userTempId: getUserTempId(),
  },
  mutations: {
    RECEIVE_USER_INFO(state, { userInfo }) {
      state.userInfo = userInfo;
    },
    RESET_USER_INFO (state) {
      state.userInfo = {}
    }
  },

  actions: {
    async logout ({commit}) {
      const result = await reqLogout()
      if (result.code===200) {
        commit('RESET_USER_INFO')
        removeUserInfo()
      } else {
        alert(result.message || '退出登陆失败')
      }
    },
    async register(context, userInfo) {
      const result = await reqRegister(userInfo);
      if (result.code !== 200) {
        throw new Error(result.data || result.message || "注册失败");
      }
    },
    async login({ commit }, { mobile, password }) {
      const result = await reqLogin(mobile, password);
      if (result.code === 200) {
        // 登陆成功了
        const userInfo = result.data;
        // 将用户信息对象提交给mutation保存到state
        commit("RECEIVE_USER_INFO", { userInfo });
        // 将用户信息保存到local中
        saveUserInfo(userInfo);
      } else {
        // 登陆失败了
        throw new Error(result.data || result.message || "登陆失败");
      }
    },
  },
  getters: {},
};
