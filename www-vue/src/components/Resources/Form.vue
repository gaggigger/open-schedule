<template>
  <div class="formitem-container">
    <h3 class="toolbar-1">
      <span class="save-progress" v-if="saving">Autosave...</span>
      <span class="save-sucess" v-else>✔ Autosave</span>
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
        <span class="error" v-if="field.mandatory">*</span>
        <div v-if="field.type == 'resources_items'">
          <resource-item v-bind:resource="id" v-bind:field="field"></resource-item>
        </div>
        <div v-else-if="field.type == 'picture'">
          <dd-image
            v-bind:uri="itemData[field.name]"
            v-on:imgChange="changeItem(itemData, field.name, ...arguments)"></dd-image>
        </div>
        <div v-else-if="field.type == 'choicelist'" class="choicelist">
          <choice-list
            v-bind:selection="itemData[field.name]"
            v-bind:clname="field.choicelist_item"
            v-on:clChange="changeItem(itemData, field.name, ...arguments)"
          ></choice-list>
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
import DdImage from '@/components/Form/DdImage'
import ChoiceList from '@/components/Form/ChoiceList'
import ResourceItem from '@/components/Form/ResourceItem'

export default {
  name: 'ResourcesForm',
  components: {
    DdImage,
    ChoiceList,
    ResourceItem
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
    changeItem (item, name, response) {
      item[name] = response
      this.autoSave()
    },
    autoSave () {
      try {
        for (const item of document.querySelectorAll('.formitem-container input, .formitem-container textarea')) {
          if (!item.validity.valid) return
        }
      } catch (e) {
        console.error(e)
      }

      if (this.tOut) window.clearTimeout(this.tOut)
      this.tOut = window.setTimeout(() => {
        this.saving = true
        Http.request(this.dataPath, 'PUT', {
          data: this.itemData
        }).then(response => {
          this.saving = false
          this.itemData = Object.assign(response, this.itemData)
        }).catch(() => {
          this.saving = true
        })
      }, 1000)
    }
  }
}
</script>
<style scoped>
  input {
    width: calc(100% - 2em);
  }
  .choicelist {
    padding-left: 1em;
  }
  .save-progress {

  }
  .save-sucess {
    color: var(--ok-color);
  }
</style>
