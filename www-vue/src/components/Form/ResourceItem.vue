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
        <item-list v-bind:resource="resourceLnk"
                   v-bind:itemSelected="selectedItems"
        ></item-list>
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
      selectedItems: []
    }
  },
  created () {
    Http.request('/resources/' + this.resource + '/lnk', 'GET', {
      id: this.id,
      resource_name: this.resourceLnk,
      type: this.type
    })
      .then(response => {
        response.map(item => {
          this.selectedItems.push(item.id)
        })
      })
  },
  methods: {
    saveEvent () {
      Http.request('/resources/' + this.resource + '/lnk', 'POST', {
        id: this.id,
        parents: this.selectedItems
      })
        .then(response => {
          this.showModal = false
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
