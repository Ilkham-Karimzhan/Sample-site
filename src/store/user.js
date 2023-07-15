import * as authApi from "@/api/auth";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isLogin: (state) => state.user !== null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async autoLogin({ commit }) {
      let { res, user } = await authApi.login();

      if (res) {
        commit("setUser", user);
      }
    },
    async login({ commit }, { login, password }) {
      let { res, data } = await authApi.login(login, password);

      if (!res) {
        return { errors: "Нет связи" };
      } else if (data.res) {
        commit("setUser", data.user);
      }

      return data;
    },
  },
};
