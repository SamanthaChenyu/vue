<template>
  <table class="table">
    <thead>
      <tr>
        <th>區域</th>
        <th>男</th>
        <th>女</th>
        <th>總計</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.value">
        <td>{{ item.label }}</td>
        <td>{{ item.male }}</td>
        <td>{{ item.female }}</td>
        <td>{{ item.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

export default {
  props: {
    tableData: {
        type: Array<{
          label: string,
          value: string,
          male: string,
          female: string,
          total: string
        }>,
        required: true
    }
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false
    }
  },
  methods: {},
  created() {
    this.products = this.tableData
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
    border-bottom: 1px solid #000;
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
</style>
