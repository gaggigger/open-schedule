<template>
  <div class="item-container">
    <div class="search">
      <input type="text" placeholder="Search..." v-model="search" />
    </div>
    <loading v-if="!loaded"></loading>
    <div v-if="loaded">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="column in columns"
                  v-bind:key="column.name">
              {{ column.label.toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dt in filteredItems"
               v-bind:key="dt.id"
          >
            <th>
              <input type="checkbox" v-bind:value="dt.id" v-model="selection" />
            </th>
            <td v-for="column in columns"
                  v-bind:key="column.name">
              <span class="link"
                    v-on:click="selectItem(dt.id)"
                    v-html="toColor(dt[column.name])"
              >
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Http from '../../services/Http'
import Loading from '../../components/Loading/Index.vue'

export default {
  name: 'ResourceList',
  components: {
    Loading
  },
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
    },
    reload: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      loaded: false,
      search: '',
      features: [],
      apiColumns: null,
      apiData: null,
      data: [],
      columns: [],
      selection: []
    }
  },
  computed: {
    filteredItems () {
      return this.data.filter(item => Object.values(item).join('-').toLowerCase().indexOf(this.search.toLowerCase()) > -1)
    }
  },
  watch: {
    selection () {
      this.$emit('selectionChanged', this.selection)
    },
    reload: {
      handler: 'loadList',
      immediate: true
    }
  },
  /*
  created () {
    this.loadList()
  },
  */
  methods: {
    toColor (value) {
      if (/^#[0-9a-f]{6}$/i.test(value)) {
        return '<span class="color-cell" style="background-color:' + value + '">&nbsp;&nbsp;&nbsp;</span>'
      }
      return value
    },
    loadList () {
      this.loaded = false
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
          this.loaded = true
          this.columns = columns.filter(item => item.grid_column)
          this.data = data
        })
    },
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
    min-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  @media screen and (max-width: 950px) {
    table {
      width: 100%;
    }
  }
  table td, table th {
    text-align: left;
    border: 1px solid var(--third-color);
    margin: 0;
    padding: 0.2em 0.5em;
  }
  table th:first-child {
    width: 0.2em;
  }
  table thead tr {
    background-color: var(--second-color);
  }
  table tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
  input {
    margin: 0;
    padding: 0;
  }
  .search input {
    width: calc(100% - 4em);
    margin: 1em;
    padding: .25em .5em;
  }
</style>
