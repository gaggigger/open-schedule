<template>
  <div class="item-container">
    {{ item }}
  </div>
</template>

<script>
export default {
  name: 'ResourcesItem',
  data () {
    return {
      item: this.$route.params.item
    }
  }
}
</script>
<style scoped></style>
