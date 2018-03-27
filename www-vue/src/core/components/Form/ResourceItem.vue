<template>
  <div class="resource-container">
    <modal v-if="showModal" @ok="saveEvent" @cancel="showModal = false">
      <h3 slot="header">Select Resources</h3>
      <div slot="body" class="item-list">
        <item-list v-bind:resource="resourceLnk"
                   v-bind:defaultSelection="selectedItems"
                   v-on:selectionChanged="selectionChanged"
        ></item-list>
      </div>
    </modal>
    <div class="toolbar-1">
      <div class="title">
        <span class="link icon-edit" v-on:click="showModal = true">Edit</span>
        <ul>
          <li v-for="dt in dataList"
              v-bind:key="dt.id"
          >
            <span v-for="column in dataColumn"
                v-bind:key="column.name">
                {{ dt[column.name] }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Http from '../../services/Http'
import Modal from './Modal.vue'
import ItemList from '../Resources/ItemList.vue'
import Notification from '../../services/Notification'

export default {
  name: 'resource-item',
  components: {
    Modal,
    ItemList
  },
  props: [
    'resourceLnk',
    'resource',
    'type',
    'id'
  ],
  data () {
    return {
      // resourceName: this.field.link.resource,
      showModal: false,
      selectedItems: [],
      dataColumn: [],
      dataList: []
    }
  },
  created () {
    this.loadLIst()
  },
  methods: {
    loadLIst () {
      Http.request('/resources/' + this.resourceLnk, 'GET')
        .then(response => {
          return response.grid.columns
        })
        .then(apiColumn => Promise.all([
          Http.request(apiColumn, 'GET'),
          Http.request('/resources/' + this.resource + '/lnk', 'GET', {
            id: this.id || -1,
            resource_name: this.resourceLnk,
            type: this.type
          })
        ]))
        .then(([columns, data]) => {
          [this.dataColumn, this.dataList, this.selectedItems] = [columns.filter(item => item.grid_column), data, []]
          data.forEach(item => {
            this.selectedItems.push(item.id)
          })
        })
    },
    saveEvent () {
      if (this.id === undefined) {
        Notification.error('Please save resource (autosave) before linking with another resource.')
        return false
      }
      Http.request('/resources/' + this.resource + '/lnk', 'POST', {
        id: this.id,
        r_name: this.resourceLnk,
        parents: this.selectedItems
      })
        .then(() => {
          this.showModal = false
          this.loadLIst()
        })
    },
    selectionChanged (selection = []) {
      this.selectedItems = selection.slice(0)
    }
  }
}
</script>
<style scoped>
  .item-list {
    height: 60vh;
    overflow-y: auto;
  }
</style>
