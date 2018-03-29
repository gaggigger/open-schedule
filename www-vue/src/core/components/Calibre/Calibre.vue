<template>
  <article>
    <h3 class="icon-book">Recent ebooks</h3>
    <ul>
      <li class="book"
           v-for="book in books"
           v-bind:key="book.uuid">
        <a v-bind:href="path(book)" target="__blank">{{ book.title }} - {{ book.author_sort }}</a>
      </li>
    </ul>
  </article>
</template>

<script>
import Http from '../../services/Http'
import Config from '../../../../../api-nj/config'

export default {
  name: 'Calibre',
  data () {
    return {
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
