<template>
  <article>
    <h3 class="icon-calendar">Future events</h3>
    <div v-for="event in eventList"
         v-bind:key="event.uuid">
      <b>{{ event.title }}</b>
      <div>
        <span class="icon-clock"></span>{{ format(event.start) }}
        <br />
        <span class="icon-timer-clock"></span>{{ duration(event.start, event.end) }}h
      </div>
      <pre v-if="event.description">
        {{ event.description }}
      </pre>
    </div>
  </article>
</template>

<script>
import Http from '../../services/Http'
import moment from 'moment'

export default {
  name: 'EventList',
  props: {
    module: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      eventList: []
    }
  },
  watch: {
    module: {
      handler: 'loadList',
      immediate: true
    }
  },
  methods: {
    format (date) {
      return moment(date, 'YYYY-MM-DD[T]HH:mm').format('LLLL')
    },
    duration (start, end) {
      return moment.duration(moment(end, 'YYYY-MM-DD[T]HH:mm').diff(moment(start, 'YYYY-MM-DD[T]HH:mm')))
        .asHours()
    },
    loadList () {
      return Http.request('/modules/calendar/data', 'GET', {
        getallmodule: this.module
      }).then(response => {
        this.eventList = response
          .filter(item => moment().isSameOrBefore(moment(item.end, 'YYYY-MM-DD[T]HH:mm')))
          .sort((a, b) => {
            if (moment(a.start, 'YYYY-MM-DD[T]HH:mm').isBefore(moment(b.start, 'YYYY-MM-DD[T]HH:mm'))) {
              return -1
            } else if (moment(a.start, 'YYYY-MM-DD[T]HH:mm').isAfter(moment(b.start, 'YYYY-MM-DD[T]HH:mm'))) {
              return 1
            }
            return 0
          })
      })
    }
  }
}
</script>
<style scoped>
  article {
    font-size: 0.8em;
  }
  article > div {
    margin: 1em 0;
  }
</style>
