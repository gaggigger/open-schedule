<template>
  <div class="item-container">
    <h3 class="toolbar-2">
      <span class="link icon-back" v-on:click="$router.go(-1)"></span>
      <span class="link icon-add" v-on:click="addItem()">Add</span>
      <span class="link icon-delete" v-on:click="deleteItem()">Delete selected</span>
      <span class="title">{{ item }}</span>
    </h3>
    <item-list v-bind:resource="item"
               v-on:itemSelected="addItem"
               v-on:selectionChanged="selectionChanged"
               v-bind:reload="reloadList"
    ></item-list>
  </div>
</template>

<script>
import ItemList from './ItemList.vue'
import Http from '../../services/Http'

export default {
  name: 'ResourcesItem',
  components: {
    ItemList
  },
  data () {
    return {
      item: this.$route.params.item,
      selectedItems: [],
      reloadList: true
    }
  },
  methods: {
    addItem (id = null) {
      if (id === null) this.$router.push('/resources/' + this.item + '/detail')
      else this.$router.push('/resources/' + this.item + '/detail/' + id)
    },
    selectionChanged (selection = []) {
      this.selectedItems = selection.slice(0)
    },
    deleteItem () {
      if (this.selectedItems.length === 0) {
        alert('Please select the rows to delete')
        return false
      }
      if (!confirm('Do you want to delete selected items?')) {
        return false
      }
      Http.request('/resources/' + this.item + '/data', 'DELETE', {
        ids: this.selectedItems
      })
        .then(response => {
          this.reloadList = !this.reloadList
        })
    }
  }
}
</script>
<style scoped>
</style>
