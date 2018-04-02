<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .loading {
    display: inline-block;
    width: 100%;
    text-align: center;
    position: relative;
  }
  .loading::after {
    content: "";
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border-width: 6px;
    border-style: solid;
    border-color: var(--second-color) transparent var(--third-color) transparent;
    animation: lds-dual-ring 0.5s linear infinite;
    position: absolute;
  }
</style>
