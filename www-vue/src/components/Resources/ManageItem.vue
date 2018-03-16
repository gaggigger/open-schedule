<template>
  <div class="item-container">
    <h3 class="toolbar-1">
      <span class="title">
        <span class="link" v-on:click="$router.go(-1)">🔙</span>
        {{ item }}
      </span>
      <span class="link" v-on:click="addItem()">Add</span>
    </h3>
    <item-list v-bind:resource="item"
               v-on:itemSelected="addItem"
    ></item-list>
  </div>
</template>

<script>
import ItemList from '@/components/Resources/ItemList'

export default {
  name: 'ResourcesItem',
  components: {
    ItemList
  },
  data () {
    return {
      item: this.$route.params.item
    }
  },
  methods: {
    addItem (id = null) {
      if (id === null) this.$router.push('/resources/' + this.item + '/detail')
      else this.$router.push('/resources/' + this.item + '/detail/' + id)
    }
  }
}
</script>
<style scoped>
</style>
