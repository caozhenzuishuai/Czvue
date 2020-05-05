import ajax from "./ajax";

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
