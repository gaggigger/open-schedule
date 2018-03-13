<template>
  <div>
    <modal v-if="showModal" @ok="saveEvent" @cancel="showModal = false">
      <h3 slot="header">Edit event</h3>
      <div slot="body">
        <div>
          <label>Date start</label>
          <input type="datetime-local" v-model="modal.start" required />
        </div>
        <div>
          <label>Date end</label>
          <input type="datetime-local" v-model="modal.end" required />
        </div>
        <div>
          <label>Title</label>
          <input type="text" class="calendar-autofocus" v-model="modal.title" required autofocus />
        </div>
        <div>
          <label>Description</label>
          <textarea rows="5" v-model="modal.description"></textarea>
        </div>
      </div>
    </modal>
    <div class="calendar-container">
      <full-calendar ref="modulecalendar" :config="config"></full-calendar>
    </div>
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import Http from '@/services/Http'
import Modal from '@/components/Form/Modal'

export default {
  name: 'calendar',
  components: {
    FullCalendar,
    Modal
  },
  data () {
    return {
      item: this.$route.params.item,
      id: this.$route.params.id,
      showModal: false,
      modal: {},
      config: {
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay' // listWeek
        },
        navLinks: true, // can click day/week names to navigate views
        defaultView: 'agendaWeek',

        slotDuration: '00:15:00',
        minTime: '06:00:00',
        maxTime: '22:00:00',

        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',

        editable: true,
        eventLimit: true, // allow "more" link when too many events
        timeFormat: 'H(:mm)',
        slotLabelFormat: 'H(:mm)',

        events: (start, end, timezone, callback) => {
          // console.log(this.item, this.id, start, end, timezone, callback)
          this.getItems().then(response => {
            console.log(response)
            callback(response)
          })
        },
        eventClick: (event, jsEvent, view) => {
          // console.log('eventClick', event, jsEvent, view)
        },
        dayClick: (date, jsEvent, view) => {
          this.showModal = true
          this.modal.start = date.format('YYYY-MM-DD[T]HH:mm')
          this.modal.end = date.add(1, 'hours').format('YYYY-MM-DD[T]HH:mm')
        },
        eventDragStop: (event, jsEvent, ui, view) => {
          // console.log('dragStop', event, jsEvent, ui, view)
        },
        eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
          this.saveEvent(event)
        },
        eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
          this.saveEvent(event)
        },
        select: (start, end, jsEvent, view) => {
          this.showModal = true
          this.modal.start = start.format('YYYY-MM-DD[T]HH:mm')
          this.modal.end = end.format('YYYY-MM-DD[T]HH:mm')
          // console.log(start, end, jsEvent, view)
        }
      }
    }
  },
  watch: {
    showModal (val) {
      if (val) window.setTimeout(() => document.querySelector('.calendar-autofocus').focus(), 100)
    }
  },
  methods: {
    getItems () {
      return Http.request('/modules/calendar/data', 'GET')
    },

    saveEvent (event = null) {
      let uuid = null
      if (event !== null) {
        uuid = event.uuid
        this.modal.start = event.start.format('YYYY-MM-DD[T]HH:mm')
        this.modal.end = event.end.format('YYYY-MM-DD[T]HH:mm')
      }

      // console.log('dayClick', date, jsEvent, view)
      Http.request('/modules/calendar/data', 'PUT', {
        data: {
          id: this.id,
          uuid: uuid,
          resource: this.item,
          detail: this.modal
        }
      }).then(response => {
        this.showModal = false
        this.modal = {}
        this.$refs.modulecalendar.$emit('refetch-events')
      })
    }
  }
}
</script>
<style scoped>
  input, textarea {
    width: calc(100% - 15px);
    resize: none;
  }
</style>
