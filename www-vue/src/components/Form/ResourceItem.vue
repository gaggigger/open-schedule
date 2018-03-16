<template>
  <div class="resource-container">
    TES RRRRRRRR
  </div>
</template>
<script>
import Http from '@/services/Http'

export default {
  name: 'resource-item',
  props: [
    'columns'
    // 'selection'
  ],
  data () {
    return {

    }
  },
  created () {
    console.log(this.columns)
  },
  methods: {

  }
}
</script>
<style scoped></style>
