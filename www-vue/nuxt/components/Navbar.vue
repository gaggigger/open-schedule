<template>
  <div>
    <span v-on:click="test($event)">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name : 'navbar',
  data() {
    return {
      title : 'Hello'

    }
  },
  methods: {
    test(e) {
      console.log(e);
    }
  }
}
</script>
