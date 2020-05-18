<template>
  <div>
    小明的爸爸现在有{{total}}元
    <br>
    <br>
    <h2>不使用sync修改符</h2>
    <Child :money="total" @update:money="total=$event"/>
    <br>
    <br>
    <h2>使用sync修改符</h2>
    <child :money.sync="total"/>

    <br>
    <br>
    <h2>使用v-model修改符</h2>
    <Child2 v-model="total"/>
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',

    data () {
      return {
        total: 1000
      }
    },
    components: {
      Child,
      Child2
    }
  }
</script>
