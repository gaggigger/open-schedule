<template>
  <div class="item-container">
    <h3 class="toolbar-1">
      <span class="title">{{ item }}</span>
      <span class="link" v-on:click="addItem">Add</span>
    </h3>
    <div>
      <div v-for="dt in data"
           v-bind:key="dt.id"
           v-on:click="addItem(dt.id)"
      >
        <span v-for="column in columns"
              v-bind:key="column.name">
          {{ dt[column.name] }} -
        </span>
      </div>
    </div>
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
      apiData: null,
      data: [],
      columns: []
    }
  },
  created () {
    Http.request('/resources/' + this.item, 'GET')
      .then(response => {
        this.features = response.features
        this.apiColumns = response.grid.columns
        this.apiData = response.grid.data
        return true
      })
      .then(() => Promise.all([
        Http.request(this.apiColumns, 'GET'),
        Http.request(this.apiData, 'GET')
      ]))
      .then(([columns, data]) => {
        this.columns = columns.filter(item => item.grid_column)
        this.data = data
        console.log(columns)
        console.log(data)
      })
  },
  methods: {
    addItem (id = null) {
      if (id === null) this.$router.push('/resources/' + this.item + '/form')
      else this.$router.push('/resources/' + this.item + '/form/' + id)
    }
  }
}
</script>
<style scoped>
</style>
