<template>
  <div class="loading" v-if="HttpCounter > 0">
    <span class="loading-bar">{{ HttpCounter }}</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      HttpCounter: 0
    }
  },
  methods: {
    increase () {
      try {
        window.AppVue.$children[0].$refs['app-loading']._increase()
      } catch (e) {
        // raf
      }
    },
    decrease () {
      try {
        window.AppVue.$children[0].$refs['app-loading']._decrease()
      } catch (e) {
        // raf
      }
    },
    _increase () {
      let i = this.HttpCounter
      this.HttpCounter = Math.max(0, ++i)
    },
    _decrease () {
      let i = this.HttpCounter
      this.HttpCounter = Math.max(0, --i)
    }
  }
}
</script>

<style scoped>
  .loading {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
  .loading-bar {
    padding-left: 1em;
    display: inline-block;
    width: 25%;
    min-width: 150px;
    height: 1em;
    border: 1px solid var(--second-color);
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    background: linear-gradient(-45deg, var(--maintext-color), var(--third-color), var(--second-color), var(--first-color));
    background-size: 400% 400%;
    -webkit-animation: Gradient 4s ease infinite;
    -moz-animation: Gradient 4s ease infinite;
    animation: Gradient 2s ease infinite;
  }
</style>
