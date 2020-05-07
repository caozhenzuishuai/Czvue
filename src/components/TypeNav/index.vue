<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideCategorys" @mouseenter="showCategorys">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <!-- 一旦有transition标签, vue会在显示/隐藏的过程中向div指定特定类名 -->
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ item_on: index === currentIndex }"
                @mouseenter="showSubCategorys(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`)">{{c2.categoryName}}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`)">{{c3.categoryName}}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'  // 引入整体lodash
import throttle from "lodash/throttle"; // 只引入我需要的工具函数   打包文件减少1.4M
import { mapState } from "vuex";
export default {
  name: "TypeNav",

  data() {
    return {
      // -2: 代表完全在整个div外面  -1: 代表在大的div中  >=0 代表在分类项小div中
      currentIndex: -2, // 需要显示子列表的一级分类项的下标
      isShowFirst: false, // 是否显示一级列表
    };
  },

  computed: {
    ...mapState({
      categoryList: (state) => state.home.baseCategoryList,
    }),
  },

  /* 
    在初始显示之前调用
    执行同步操作更新数据
    */
  beforeMount() {
    //  判断当前请求的路由路径是否是 / , 如果是一级列表显示, 否则隐藏
    this.isShowFirst = this.$route.path === "/";
  },
  methods: {
    showCategorys() {
      this.currentIndex = -1;
      this.isShowFirst = true;
    },

    hideCategorys() {
      this.currentIndex = -2;
      // 如果当前不是首页, 隐藏一级列表
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },

    showSubCategorys: throttle(function(index) {
      if (this.currentIndex === -2) return; // 如果已经完全移出去了, 不做更新
      // 更新需要显示子分类的下标
      this.currentIndex = index;
    }, 300),

    toSearch(event) {
      const {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset;
      // 如何判断点击的分类项<a>
      if (categoryname) {
        // 只有所有的分类项的a指定了data-categoryName属性
        // 准备query参数对象
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 用于路由跳转的location对象
        const location = {
          name: "search",
          query,
        };

        // 得到当前的params参数对象
        const { keyword } = this.$route.params;
        // 根据分类搜索时, 也携带搜索关键字params参数
        if (keyword) {
          location.params = { keyword };
        }

        // 跳转到search
        this.$router.push(location);

        // 隐藏一级列表
        this.hideCategorys();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      /* 显示的过渡样式 */
      &.move-enter-active {
        transition: all 0.5s;
      }
      /* 隐藏时的样式 */
      &.move-enter {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 555px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
