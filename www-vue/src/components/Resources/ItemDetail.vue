<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">
        <span class="link icon-back" v-on:click="$router.go(-1)"></span>
        {{ item }}
      </span>
    </h3>
    <vue-tabs>
      <v-tab v-bind:title="feature.name"
             v-for="feature in features"
             v-bind:key="feature.name"
      >
        <item-form v-if="feature.component === 'app-resource-info'"></item-form>
        <item-calendar v-if="feature.component === 'app-resource-calendar'"></item-calendar>
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import ItemForm from '@/components/Resources/Form'
import ItemCalendar from '@/components/Resources/Calendar'
import Http from '@/services/Http'
// import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
  name: 'ResourcesForm',
  components: {
    VueTabs,
    VTab,
    ItemForm,
    ItemCalendar
  },
  data () {
    return {
      item: this.$route.params.item,
      id: this.$route.params.id,
      features: []
    }
  },
  created () {
    Http.request('/resources/' + this.item, 'GET')
      .then(response => {
        this.features = response.features
      })
  },
  methods: {

  }
}
</script>
<style scoped></style>
