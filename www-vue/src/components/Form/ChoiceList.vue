<template>
  <div class="choicelist-container">
    <div
      v-bind:key="item.code"
      v-for="item in items"
      v-on:change="changeItem"
    >
      <label>
        <input type="checkbox"
               v-bind:value="item.code"
               v-model="checkedItems"
        >
        {{ item.label }}
      </label>
    </div>
  </div>
</template>
<script>
import Http from '@/services/Http'

export default {
  name: 'choice-list',
  props: [
    'clname',
    'selection'
  ],
  data () {
    return {
      items: []
    }
  },
  created () {
    if (this.selection === undefined || this.selection === '') this.selection = []
    this.checkedItems = this.selection.slice(0)
    Http.request('/choicelists?name=' + this.clname, 'GET')
      .then(response => {
        this.items = response.items
      })
  },
  methods: {
    changeItem () {
      this.$emit('clChange', this.checkedItems)
    }
  }
}
</script>
<style scoped>
  input[type="checkbox"] {
    vertical-align: middle;
  }
  .choicelist-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .choicelist-container > * {
    padding: 0 1em;
  }
</style>
