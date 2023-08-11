<template>
  <div v-if="fetchData.length > 0">
    <Form  :formReceiveData="fetchData" />
    <Table :tableData="fetchData" />
  </div>
</template>

<script lang="ts">
import * as apiService from '@/services/apiService.js'
import Form from '../components/Form.vue'
import Table from '../components/Table.vue'

export default {
  components: {
    Form,
    Table
  },
  data() {
    const getData = (size: number) => {
      return apiService.get(`/292443d2-faef-452c-96cd-33053e7369b6/json?size=${size}`)
    }
    return {
      fetchData: [],
      getData   
    } 
  },
  mounted() {
      this.init()
  },
  methods: {
    async init() {
      const res = await this.getData(100);
      // 轉格式
      const area = res && res.filter((item) => item.district !== '')?.map((item, index) => {
        return {
          label: item?.district,
          value: index,
          male: item?.male,
          female: item?.female,
          total: item?.total
        }
      });
      this.fetchData = area
    }
  }
}
</script>
