<template>
  <div class="resource-container">
    <modal v-if="showModal" @ok="saveEvent" @cancel="showModal = false">
      <h3 slot="header">Edit Resource</h3>
      <div slot="body" class="event-form">
        Hehe
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

export default {
  name: 'resource-item',
  components: {
    Modal
  },
  props: [
    'field',
    'resource'
  ],
  data () {
    return {
      resourceLnk: this.field.link.resource,
      typeLnk: this.field.link.type,
      showModal: false
    }
  },
  created () {
    // console.log(this.resourceLnk)
    Http.request('/resources/' + this.resourceLnk + '/lnk', 'GET', {
      parent: this.resource
    })
      .then(response => {
        console.log(response)
      })
  },
  methods: {
    saveEvent () {

    }
  }
}
</script>
<style scoped></style>
