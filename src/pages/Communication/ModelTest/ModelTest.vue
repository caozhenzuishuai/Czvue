<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="name1" />
    <span>{{ name1 }}</span>
    <input type="text" :value="name2" @input="name2 = $event.target.value" />
    <span>{{ name2 }}</span>
    <CustomInput v-model="name3" />
    <span>{{ name3 }}</span>
    <br />
    <br />

    <CustomInput :value="name4" @input="name4 = $event" />
    <span>{{ name4 }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',

  data () {
    return {
      name1: 'atguigu',
      name2: 'xiaoxiao',
      name3: 'mingming',
      name4: 'huahua'
    }
  },

  components: {
    CustomInput
  }
}
</script>
