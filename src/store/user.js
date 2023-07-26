import * as authApi from "@/api/auth";

let readyResolver;
let readyPromise = new Promise((resolve) => {
  readyResolver = resolve;
});

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    ready: (state) => readyPromise,
    isLogin: (state) => state.user != null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async autoLogin({ commit }) {
      let { res, user } = await authApi.check();

      if (res) {
        commit("setUser", user);
      }

      readyResolver();
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
