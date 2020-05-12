import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const instance = axios.create({
  baseURL: "/mock",
  timeout: 15000,
});

instance.interceptors.request.use((config) => {
  console.log("请求拦截器执行");
  NProgress.start();
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log("相应拦截器成功回调执行");
    NProgress.done();
    return response.data;
  },
  (error) => {
    console.log("相应拦截器失败回调执行");
    NProgress.done();
    return Promise.reject(error);
  }
);
export default instance;