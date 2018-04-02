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
        setTimeout(() => {
          this.increase()
        }, 100)
      }
    },
    decrease () {
      try {
        window.AppVue.$children[0].$refs['app-loading']._decrease()
      } catch (e) {
        setTimeout(() => {
          this.decrease()
        }, 100)
      }
    },
    _increase () {
      ++this.HttpCounter
      // let i = this.HttpCounter
      // this.HttpCounter = Math.max(0, ++i)
    },
    _decrease () {
      --this.HttpCounter
      // let i = this.HttpCounter
      // this.HttpCounter = Math.max(0, --i)
    }
  }
}
</script>

<style scoped>
  .loading {
    position: fixed;
    bottom: 0;
    right: 1rem;
    z-index: 1000;
  }
  .loading-bar {
    display: inline-block;
    font-size: 0.8em;
    padding: 0.2em 1em;
    color: white;
    font-weight: bold;
    width: 25%;
    min-width: 150px;
    border: 1px solid var(--second-color);
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    background: linear-gradient(-45deg, var(--maintext-color), var(--third-color), var(--second-color), var(--first-color));
    background-size: 400% 400%;
    -webkit-animation: Gradient 1s ease infinite;
    -moz-animation: Gradient 1s ease infinite;
    animation: Gradient 1s ease infinite;
  }
</style>
