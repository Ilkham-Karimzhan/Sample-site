import { createStore } from "vuex";

import cart from "./cart";
import products from "./products";
import user from "./user";
import alerts from "./alerts";
import { addResponseHandler } from "@/api/http";

import router from "@/router"; // bad tmp

const store = createStore({
  modules: {
    cart,
    products,
    user,
    alerts,
  },
  strict: process.env.NODE_ENV !== "production",
});

addResponseHandler(
  function (response) {
    if ("errorAlert" in response.config) {
      response.data = {
        res: true,
        data: response.data,
      };
    }

    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // clean user data
      router.push({ name: "login" });
      location.reload(); // optional to clean all stores
      return;
    }

    let config = error.response.config;

    if ("errorAlert" in config) {
      let { errorAlert } = config;

      if (typeof errorAlert === "string") {
        errorAlert = { text: errorAlert };
      }

      store.dispatch("alerts/add", {
        text: "Ошибка ответа от сервера " + errorAlert.text,
        timeout: errorAlert.timeout ?? 5000,
        critical: errorAlert.critical ?? false,
      });

      return { data: { res: false, date: null } };
    }

    return Promise.reject(error);
  }
);

export default store;
