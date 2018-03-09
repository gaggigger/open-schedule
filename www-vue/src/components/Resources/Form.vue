<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">{{ item }}</span>
      <span class="link" v-on:click="saveItem">Save</span>
    </h3>
    <fieldset
      v-bind:key="group"
      v-for="(columns, group) in apiColumns"
    >
      <legend>{{ group }}</legend>
      <div
        v-bind:key="column.name"
        v-for="column in columns"
      >
        {{ column.label }} (<i>{{ column.type }}</i>)
        <div v-if="column.type == 'picture'">
          <dd-image></dd-image>
        </div>
        <div v-else>
          <input v-bind:type="column.type" v-model="itemData[column.name]" />
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import Http from '@/services/Http'
import DdImage from '@/components/DdImage'

export default {
  name: 'ResourcesForm',
  components: {
    DdImage
  },
  data () {
    return {
      item: this.$route.params.item,
      itemData: {},
      apiColumns: []
    }
  },
  created () {
    Http.request('/resources/' + this.item, 'GET')
      .then(response => { return response.grid.columns })
      .then((apiColumns) => Http.request(apiColumns, 'GET'))
      .then(response => {
        this.apiColumns = response.reduce((acc, item) => {
          if (acc[item.group] === undefined) acc[item.group] = []
          acc[item.group].push(item)
          return acc
        }, {})
        console.log(this.apiColumns)
      })
  },
  methods: {
    saveItem () {
      console.log(this.itemData)
    }
  }
}
</script>
<style scoped>
  input {
    width: calc(100% - 2em);
  }
</style>
