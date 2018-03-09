<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">{{ item }}</span>
      <span v-if="saving">Autosave...</span>
      <span v-else>✔ Autosave</span>
    </h3>
    <fieldset
      v-bind:key="group"
      v-for="(columns, group) in fields"
      v-on:input="autoSave">
      <legend>{{ group }}</legend>
      <div
        v-bind:key="field.name"
        v-for="field in columns">
        {{ field.label }} (<i>{{ field.type }}</i>)
        <div v-if="field.type == 'picture'">
          <dd-image
            v-bind:uri="itemData[field.name]"
            v-on:imgChange="changeImage(itemData, field.name, ...arguments)"></dd-image>
        </div>
        <div v-else>
          <input v-bind:type="field.type"
                 v-model="itemData[field.name]"
                 v-bind:required="field.mandatory" />
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
      id: this.$route.params.id,
      dataPath: null,
      itemData: {},
      saving: false,
      fields: []
    }
  },
  created () {
    Http.request('/resources/' + this.item, 'GET')
      .then(response => {
        this.dataPath = response.grid.data
        const https = [Http.request(response.grid.columns, 'GET')]
        if (this.id) https.push(Http.request('/resources/items/data?ids=' + this.id, 'GET'))
        else https.push(null)
        return Promise.all(https)
      })
      .then(([columns, data]) => {
        if (data && this.id) this.itemData = data.find(item => parseInt(item.id) === parseInt(this.id))
        this.fields = columns.reduce((acc, item) => {
          if (acc[item.group] === undefined) acc[item.group] = []
          acc[item.group].push(item)
          return acc
        }, {})
      })
  },
  methods: {
    changeImage (item, name, response) {
      item[name] = response
      this.autoSave()
    },
    autoSave () {
      if (this.saving || this.dataPath === null) {
        if (this.tOut) window.clearTimeout(this.tOut)
        this.tOut = window.setTimeout(() => {
          this.autoSave()
        }, 500)
        return
      }
      this.saving = true
      Http.request(this.dataPath, 'PUT', {
        data: this.itemData
      }).then(response => {
        this.saving = false
        this.itemData = Object.assign(response, this.itemData)
      })
    }
  }
}
</script>
<style scoped>
  input {
    width: calc(100% - 2em);
  }
</style>
