<template>
  <div class="calendar-container">
    <full-calendar :config="config"></full-calendar>
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import Http from '@/services/Http'

export default {
  name: 'calendar',
  components: {
    FullCalendar
  },
  data () {
    return {
      item: this.$route.params.item,
      id: this.$route.params.id,

      config: {
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay' // listWeek
        },
        navLinks: true, // can click day/week names to navigate views
        defaultView: 'agendaWeek',

        slotDuration: '00:15:00',
        minTime: '07:00:00',
        maxTime: '20:00:00',

        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',

        editable: true,
        eventLimit: true, // allow "more" link when too many events
        timeFormat: 'H(:mm)',
        slotLabelFormat: 'H(:mm)',

        events: (start, end, timezone, callback) => {
          console.log(this.item, this.id, start, end, timezone, callback)
        },
        eventClick: (event, jsEvent, view) => {
          console.log('eventClick', event, jsEvent, view)
        },
        dayClick: (date, jsEvent, view) => {
          // console.log('dayClick', date, jsEvent, view)
          Http.request('/modules/calendar/data', 'PUT', {
            data: {
              date: date
            }
          })
            .then(response => {
              console.log(response)
            })
        },
        eventDragStop: (event, jsEvent, ui, view) => {
          console.log('dayClick', event, jsEvent, ui, view)
        }
      }
    }
  }
}
</script>
<style scoped></style>
