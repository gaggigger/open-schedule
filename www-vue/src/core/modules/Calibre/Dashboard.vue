<template>
  <article>
    <h3 class="icon-book">Recent ebooks</h3>
    <ul>
      <li v-if="!loaded">
        <loading></loading>
      </li>
      <li class="book"
          v-for="book in books"
          v-bind:key="book.uuid"
          v-if="loaded"
      >
        <a v-bind:href="path(book)" target="__blank">{{ book.title }} - {{ book.author_sort }}</a>
      </li>
    </ul>
  </article>
</template>

<script>
import Http from '../../services/Http'
import Config from '../../../../../api-nj/config'
import Loading from '../../components/Loading/Index.vue'

export default {
  name: 'CalibreDashboard',
  components: {
    Loading
  },
  data () {
    return {
      loaded: false,
      books: []
    }
  },
  created () {
    this.loadBooks()
  },
  methods: {
    path (book) {
      return `${Config.calibre.url}#book_id=${book.id}&panel=book_details`
    },
    loadBooks () {
      return Http.request('/calibre', 'GET').then(response => {
        this.loaded = true
        this.books = response
      })
    }
  }
}
</script>
<style scoped>
  article .book {
    margin: 1em 0;
  }
</style>
