import ajax from "./ajax";
import mockAjax from "./mockAjax";

export function reqBaseCategoryList() {
  return ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
}
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });
}
export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");
export const reqProductList = (searchParams) =>
  ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });
export const reqProduct = (skuId) => ajax(`/item/${skuId}`);
export const reqAddToCart = (skuId, skuNumChange) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNumChange}`);
export const reqCartList = () => ajax("/cart/cartList");

export const reqCheckCartItem = (skuId, isChecked) =>
  ajax(`/cart/checkCart/${skuId}/${isChecked}`);
export const reqDeleteCartItem = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);
export const reqRegister = (userInfo) =>
  ajax.post("/user/passport/register", userInfo);
export const reqLogout = () => ajax("/user/passport/logout");
