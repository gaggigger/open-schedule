<template>
  <div class="resource-container">
    <modal v-if="showModal" @ok="saveEvent" @cancel="showModal = false">
      <h3 slot="header">Select Resources</h3>
      <div slot="body" class="item-list">
        <item-list v-bind:resource="resourceName"
                   v-on:itemSelected="itemSelected"
        ></item-list>
      </div>
    </modal>
    <div class="toolbar-1">
      <span class="title">
        <span class="link" v-on:click="showModal = true">Edit</span>
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
    'field',
    'resource',
    'id'
  ],
  data () {
    return {
      resourceName: this.field.link.resource,
      typeLnk: this.field.link.type,
      showModal: false,
      selectedItems: []
    }
  },
  created () {
    Http.request('/resources/' + this.resourceName + '/lnk', 'GET', {
      parent: this.resource
    })
      .then(response => {
        console.log(response)
        console.log(response)
      })
  },
  methods: {
    saveEvent () {
      Http.request('/resources/' + this.resourceName + '/lnk', 'POST', {
        id: this.id,
        items: this.selectedItems,
        type: this.typeLnk
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
