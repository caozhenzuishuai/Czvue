/* 
管理商品详情信息的vuex子模块
*/
import { reqProduct, reqAddToCart } from "@/api";

const state = {
  detailInfo: {}, // 当前商品详情信息对象
};

const mutations = {
  /* 
  接收保存新的商品详情信息
  */
  RECEIVE_DETAIL_INFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};

const actions = {
  /* 
  获取商品详情信息数据的异步action
  */
  async getDetailInfo({ commit }, skuId) {
    const result = await reqProduct(skuId);
    if (result.code === 200) {
      const detailInfo = result.data;
      commit("RECEIVE_DETAIL_INFO", detailInfo);
    }
  },

  /* 
  添加商品到购物车的异步action
  */
  async addToCart({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加到购物车成功
      console.log("添加到购物车成功");
      callback(); // 成功了不传递错误信息
      // callback({status: 0, message: '添加到购物车成功'})
    } else {
      // 失败
      console.log("添加到购物车失败");
      callback("添加到购物车失败"); // 失败了, 需要传递错误信息
      // callback({status: 1, message: '添加到购物车失败'})
    }
  },

  async addToCart2({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加到购物车成功
      // console.log('添加到购物车成功')
      return ""; // async函数的promise是成功的, value是''
    } else {
      // 失败
      // console.log('添加到购物车失败')
      return "添加到购物车失败"; // async函数的promise是成功的, value为errorMsg
    }
  },

  async addToCart3({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加到购物车成功
      // console.log('添加到购物车成功')
      return ""; // async函数的promise是成功的
    } else {
      // 失败
      // console.log('添加到购物车失败')
      throw new Error("添加到购物车失败"); // async函数的promise就是失败的
    }
  },
};

const getters = {
  /* 
  包含3级分类名称数据的对象
  */
  categoryView(state) {
    const categoryView = state.detailInfo.categoryView; // 初始时是undefined, 后来就有值了

    return categoryView || {}; // 保存返回的是一个空对象或者带数据的对象
    // return categoryView===undefined ? {} : categoryView
  },

  /* 
  商品信息
  */
  skuInfo(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo || {};
  },

  /* 
  图片列表
  */
  skuImageList(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo ? skuInfo.skuImageList : [];
  },

  /* 
    返回商品SPU销售属性列表
    */
  spuSaleAttrList(state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList;
    return spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
