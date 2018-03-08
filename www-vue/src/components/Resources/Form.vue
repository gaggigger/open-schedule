<template>
  <div>FORM</div>
</template>

<script>
import Http from '@/services/Http'

export default {
  name: 'ResourcesForm',
  data () {
    return {
      item: this.$route.params.item
    }
  },
  created () {
    Http.request('/resources/' + this.item + '/form', 'GET')
      .then(response => {
        console.log(response)
      })
  }
}
</script>
<style scoped></style>
