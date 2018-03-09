<template>
  <div class="item-container">
    <h3 class="toolbar-1">
      <span class="title">{{ item }}</span>
      <span class="link" v-on:click="addItem">Add</span>
    </h3>

  </div>
</template>

<script>
import Http from '@/services/Http'

export default {
  name: 'ResourcesItem',
  data () {
    return {
      item: this.$route.params.item,
      features: [],
      apiColumns: null,
      apiData: null
    }
  },
  created () {
    Http.request('/resources/' + this.item, 'GET')
      .then(response => {
        console.log(response)
        this.features = response.features
        this.apiColumns = response.grid.columns
        this.apiData = response.grid.grid
      })
  },
  methods: {
    addItem () {
      this.$router.push('/resources/' + this.item + '/form')
    }
  }
}
</script>
<style scoped>
</style>
