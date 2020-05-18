<template>
  <a href="javascript:" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  props: ["title"],
  mounted() {
    console.log("HintButton", this.$attrs, this.$listeners);
  },
};
</script>

<style></style>
