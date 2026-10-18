<script setup>
import { computed, reactive, ref, watch } from 'vue'

// A column may provide custom value/format functions while this component owns
// the reusable searching, sorting, pagination, and accessible table controls.
const props = defineProps({
  rows: { type: Array, required: true },
  columns: { type: Array, required: true },
  rowKey: { type: [String, Function], default: 'id' },
  caption: { type: String, required: true },
  pageSize: { type: Number, default: 10 },
})

const globalQuery = ref('')
const columnQueries = reactive({})
const sortKey = ref('')
const sortDirection = ref('asc')
const currentPage = ref(1)

const searchableColumns = computed(() => props.columns.filter((column) => column.searchable !== false && column.key !== 'actions'))

// Read the underlying value separately from its display format so search and
// sorting operate on stable data rather than presentation text.
function valueFor(row, column) {
  return typeof column.value === 'function' ? column.value(row) : row[column.key]
}

function displayValue(row, column) {
  const value = valueFor(row, column)
  return typeof column.format === 'function' ? column.format(value, row) : value
}

function normalized(value) {
  return String(value ?? '').toLocaleLowerCase()
}

const processedRows = computed(() => {
  // Apply global and per-column filters before sorting the resulting records.
  const query = normalized(globalQuery.value.trim())
  const rows = props.rows.filter((row) => {
    const matchesGlobal = !query || searchableColumns.value.some((column) => normalized(valueFor(row, column)).includes(query))
    const matchesColumns = searchableColumns.value.every((column) => {
      const columnQuery = normalized(columnQueries[column.key]?.trim())
      return !columnQuery || normalized(valueFor(row, column)).includes(columnQuery)
    })
    return matchesGlobal && matchesColumns
  })

  if (!sortKey.value) return rows
  const column = props.columns.find((item) => item.key === sortKey.value)
  if (!column) return rows

  return [...rows].sort((left, right) => {
    const leftValue = valueFor(left, column)
    const rightValue = valueFor(right, column)
    // Preserve numeric order for numbers and use natural, case-insensitive order
    // for text such as names that may contain digits.
    const comparison = typeof leftValue === 'number' && typeof rightValue === 'number'
      ? leftValue - rightValue
      : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true, sensitivity: 'base' })
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(processedRows.value.length / props.pageSize)))
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return processedRows.value.slice(start, start + props.pageSize)
})
const resultStart = computed(() => processedRows.value.length ? ((currentPage.value - 1) * props.pageSize) + 1 : 0)
const resultEnd = computed(() => Math.min(currentPage.value * props.pageSize, processedRows.value.length))

function rowIdentity(row) {
  return typeof props.rowKey === 'function' ? props.rowKey(row) : row[props.rowKey]
}

function toggleSort(column) {
  if (column.sortable === false || column.key === 'actions') return
  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

function sortLabel(column) {
  if (sortKey.value !== column.key) return `Sort by ${column.label}`
  return `Sort by ${column.label}, currently ${sortDirection.value === 'asc' ? 'ascending' : 'descending'}`
}

function clearFilters() {
  globalQuery.value = ''
  Object.keys(columnQueries).forEach((key) => { columnQueries[key] = '' })
  sortKey.value = ''
  sortDirection.value = 'asc'
  currentPage.value = 1
}

watch(
  [() => props.rows, globalQuery, () => JSON.stringify(columnQueries)],
  () => { currentPage.value = 1 },
  { deep: true },
)

watch(pageCount, (count) => {
  // Filtering can remove the current last page, so clamp it to a valid page.
  if (currentPage.value > count) currentPage.value = count
})
</script>

<template>
  <section class="interactive-table" :aria-label="caption">
    <div class="table-toolbar">
      <div class="form-field table-global-search">
        <label :for="`${caption}-global-search`">Search all columns</label>
        <input :id="`${caption}-global-search`" v-model="globalQuery" type="search" placeholder="Type to search this table" />
      </div>
      <button class="text-button" type="button" @click="clearFilters">Clear table filters</button>
    </div>

    <div class="table-scroll" tabindex="0" aria-label="Scrollable data table">
      <table>
        <caption>{{ caption }}</caption>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" scope="col" :aria-sort="sortKey === column.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined">
              <button v-if="column.sortable !== false && column.key !== 'actions'" class="sort-button" type="button" :aria-label="sortLabel(column)" @click="toggleSort(column)">
                {{ column.label }}
                <span aria-hidden="true">{{ sortKey === column.key ? (sortDirection === 'asc' ? '▲' : '▼') : '↕' }}</span>
              </button>
              <span v-else>{{ column.label }}</span>
            </th>
          </tr>
          <tr class="column-filter-row">
            <th v-for="column in columns" :key="column.key" scope="col">
              <label v-if="column.searchable !== false && column.key !== 'actions'">
                <span class="visually-hidden">Filter {{ column.label }}</span>
                <input v-model="columnQueries[column.key]" type="search" :placeholder="`Filter ${column.label}`" />
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedRows" :key="rowIdentity(row)">
            <td v-for="column in columns" :key="column.key" :data-label="column.label">
              <slot :name="`cell-${column.key}`" :row="row" :column="column" :value="displayValue(row, column)">
                {{ displayValue(row, column) }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td :colspan="columns.length" class="table-empty">No matching records. Try clearing a filter.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-pagination">
      <p role="status">Showing {{ resultStart }}–{{ resultEnd }} of {{ processedRows.length }} records</p>
      <div class="pagination-actions" aria-label="Table pagination">
        <button type="button" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
        <span>Page {{ currentPage }} of {{ pageCount }}</span>
        <button type="button" :disabled="currentPage === pageCount" @click="currentPage++">Next</button>
      </div>
    </div>
  </section>
</template>
