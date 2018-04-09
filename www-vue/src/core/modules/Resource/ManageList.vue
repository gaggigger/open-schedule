<template>
  <div class="item-container">
    <h3 class="title">
      <span class="link icon-back" v-on:click="$router.go(-1)"></span>
      {{ item }}
    </h3>
    <header class="toolbar-2">
      <span class="link icon-add" v-on:click="addItem()">Add</span>
      <span class="link icon-upload">Import</span>
      <download-excel
        class="link icon-download"
        :data="$store.getters.ResourceListData"
        :fields="resourceListColumn"
        type="csv"
        name="resource.csv"
      >Export</download-excel>
      <!--
      <xls-csv-parser :columns="columns" @on-validate="onValidate" :help="help" lang="en"></xls-csv-parser>
      -->
      <span class="link icon-delete" v-on:click="deleteItem()">Delete selected</span>
    </header>
    <item-list v-bind:resource="item"
               v-on:itemSelected="addItem"
               v-on:selectionChanged="selectionChanged"
               v-bind:reload="reloadList"
    ></item-list>
  </div>
</template>

<script>
import ItemList from './List.vue'
import Http from '../../services/Http'
import DownloadExcel from 'vue-json-excel'
import { XlsCsvParser } from 'vue-xls-csv-parser'

export default {
  name: 'ResourcesItem',
  components: {
    ItemList,
    DownloadExcel,
    XlsCsvParser
  },
  data () {
    return {
      item: this.$route.params.item,
      selectedItems: [],
      reloadList: true,
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ],
      columns: [
        { name: 'Student login', value: 'login' },
        { name: 'Student firstname', value: 'firstname' },
        { name: 'Student lastname', value: 'lastname' },
        { name: 'Other', value: 'other', isOptional: true }
      ],
      results: null,
      help: 'Necessary columns are: login, firstname and lastname'
    }
  },
  computed: {
    resourceListColumn () {
      return this.$store.getters.ResourceListColumn
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
