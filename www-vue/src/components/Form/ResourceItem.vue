<template>
  <div class="resource-container">
    <modal v-if="showModal" @ok="saveEvent" @cancel="showModal = false">
      <h3 slot="header">Select Resources</h3>
      <div slot="body" class="item-list">
        <item-list v-bind:resource="resourceLnk"
                   v-bind:defaultSelection="selectedItems"
                   v-on:itemSelected="itemSelected"
        ></item-list>
      </div>
    </modal>
    <div class="toolbar-1">
      <span class="title">
        <span class="link" v-on:click="showModal = true">Edit</span>
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
      </span>
    </div>
  </div>
</template>
<script>
import Http from '@/services/Http'
import Modal from '@/components/Form/Modal'
import ItemList from '@/components/Resources/ItemList'

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
            id: this.id,
            resource_name: this.resourceLnk,
            type: this.type
          })
        ]))
        .then(([columns, data]) => {
          this.dataColumn = columns
          this.dataList = data
        })
      /*
      Http.request('/resources/' + this.resource + '/lnk', 'GET', {
        id: this.id,
        resource_name: this.resourceLnk,
        type: this.type
      })
        .then(response => {
          console.log(response)
          response.map(item => {
            this.selectedItems.push(item.id)
          })
        })
        */
    },
    saveEvent () {
      Http.request('/resources/' + this.resource + '/lnk', 'POST', {
        id: this.id,
        parents: this.selectedItems
      })
        .then(response => {
          this.showModal = false
          this.loadLIst()
        })
    },
    itemSelected (id = null, selection = []) {
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
