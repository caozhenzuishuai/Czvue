module.exports = {
  lintOnSave: false, // 关闭eslint规则检查
  devServer: {
    proxy: {
      "/api": {
        target: "http://182.92.128.115",
        changeOrigin: true,
      },
    },
  },
};
