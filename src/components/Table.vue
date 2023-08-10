<template>
  <table class="table">
    <thead>
      <tr>
        <th class="column">區域</th>
        <th
          class="column"
          @click="
            () => {
              handleClick(columnNames.male)
              compare()
            }
          "
        >
          男
          <IconSequence v-if="isColumnOrder === columnNames.male" :up-down="isUpDown" />
        </th>
        <th
          class="column"
          @click="
            () => {
              handleClick(columnNames.female)
              compare()
            }
          "
        >
          女
          <IconSequence v-if="isColumnOrder === columnNames.female" :up-down="isUpDown" />
        </th>
        <th
          class="column"
          @click="
            () => {
              handleClick(columnNames.total)
              compare()
            }
          "
        >
          總計
          <IconSequence v-if="isColumnOrder === columnNames.total" :up-down="isUpDown" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortTableData" :key="item.value">
        <td>{{ item.label }}</td>
        <td>{{ item.male }}</td>
        <td>{{ item.female }}</td>
        <td>{{ item.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import IconSequence from './icons/IconSequence.vue'
import { ref, reactive } from 'vue'

const raised = 'hiddenDown'
const lower = 'hiddenUp'

export default {
  components: {
    IconSequence
  },
  props: {
    tableData: {
      type: Array<{
        label: string
        value: string
        male: string
        female: string
        total: string
      }>,
      required: true
    }
  },
  data() {
    
    const isUpDown = ref(lower)
    const columnNames = {
      male: 'male',
      female: 'female',
      total: 'total'
    }
    const isColumnOrder = ref(columnNames.total)
    const sortTableData = reactive([]) // 排序
    return {
      isUpDown,
      isColumnOrder,
      sortTableData,
      columnNames,

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.sortTableData = this.tableData
      this.compare()
    },
    compare() {
      if (this.isUpDown === lower) {
        return this.sortTableData.sort((a, b) => a[this.isColumnOrder] - b[this.isColumnOrder])
      }
      return this.sortTableData.sort((a, b) => b[this.isColumnOrder] - a[this.isColumnOrder])
    },
    handleClick(columnName: string) {
      this.isColumnOrder = columnName
      const currentIsUpDown = this.isUpDown === raised ? lower : raised
      this.isUpDown = currentIsUpDown
    }
  }
}
</script>

<style lang="scss">
.table {
  width: 100%;
  margin: 16px 0px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 3px #ccc;
  padding: 6px;
  border-collapse: collapse;
  thead {
    border-bottom: 1px solid #000;
  }
  th,
  td {
    text-align: left;
    font-size: 16px;
    color: #000;
    padding: 16px;
  }
  tr {
    border-bottom: 1px solid #dddddd;
    &:last-of-type {
      border-bottom: 2px solid #009879;
    }
    &:nth-of-type(even) td {
      background-color: #f3f3f3;
    }
  }
}
.column {
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:hover {
    background-color: rgba(0, 152, 121, 0.3);
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
  svg {
    float: right;
    transform: translateY(7px);
  }
}
</style>
