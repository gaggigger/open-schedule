<template>
  <div class="item-container">
    <div>
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th></th>
            <th v-for="column in columns"
                  v-bind:key="column.name">
              {{ column.name.toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dt in data"
               v-bind:key="dt.id"
          >
            <th>
              <input type="checkbox" v-bind:value="dt.id" v-model="selection" />
            </th>
            <td v-for="column in columns"
                  v-bind:key="column.name">
              <span class="link"
                    v-on:click="selectItem(dt.id)">
                {{ dt[column.name] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Http from '@/services/Http'

export default {
  name: 'ItemList',
  props: {
    resource: {
      type: String,
      required: true
    },
    defaultSelection: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      features: [],
      apiColumns: null,
      apiData: null,
      data: [],
      columns: [],
      selection: []
    }
  },
  watch: {
    selection () {
      this.$emit('selectionChanged', this.selection)
    }
  },
  created () {
    this.selection = this.defaultSelection.slice(0)
    Http.request('/resources/' + this.resource, 'GET')
      .then(response => {
        [this.features, this.apiColumns, this.apiData] = [response.features, response.grid.columns, response.grid.data]
        return true
      })
      .then(() => Promise.all([
        Http.request(this.apiColumns, 'GET'),
        Http.request(this.apiData, 'GET')
      ]))
      .then(([columns, data]) => {
        this.columns = columns.filter(item => item.grid_column)
        this.data = data
      })
  },
  methods: {
    selectItem (id = null) {
      if (id !== null) {
        if (this.selection.indexOf(id) >= 0) {
          this.selection = this.selection.splice(this.selection.indexOf(id) + 1, 1)
        } else {
          this.selection.push(id)
        }
      }
      this.$emit('itemSelected', id, this.selection)
    }
  }
}
</script>
<style scoped>
  table {
    min-width: 50%;
  }
  @media screen and (max-width: 950px) {
    table {
      width: 100%;
    }
  }
  table td, table th {
    border: 1px solid var(--third-color);
    margin: 0;
    padding: 0.2em 0.5em;
  }
</style>
