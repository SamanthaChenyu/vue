<template>
  <div class="forms">
    <span class="space">區域</span>
    <Select v-model="areaSelected" :options="areaOptions" />
    <div class="buttonOutter">
      <Button innerText="搜尋" @click="handleClick" />
    </div>
  </div>
    
  <!-- <div>
    {{ reactiveData }}
  </div> -->

    <!-- debug: 
    <div>父層selected {{ areaSelected }}</div> -->

</template>

<script lang="ts">
import { reactive } from 'vue'
import { useStore } from 'vuex'
import Button from '../composables/Button.vue'
import Select from '../composables/Select.vue'

export default {
  components: {
    Select,
    Button
  },
  props: {
    formReceiveData: {
      type: Array<{}>,
      required: true
    },
  },
  data() {
    const store = useStore();
    const updateCurrentArea = (currentArea) => {
      store.dispatch('setCurrentArea', currentArea);
    };

    const reactiveData = reactive({}) // 搜尋特定區

    return {
      areaSelected: {},
      areaOptions: [],
      reactiveData,
      updateCurrentArea
    }
  },
  mounted() {
    //  實例掛載到 DOM 節點後(mounted)，可以執行與 DOM 有關的操作
    this.init()
  },  
  methods: {
    async init() {
      this.areaOptions = this.formReceiveData as never[]
      this.areaSelected = this.areaOptions[0] // 設置預設值
      this.reactiveData = this.formReceiveData
    },
    handleClick() {
      const currentArea = this.areaOptions.find((item) => item === this.areaSelected)
      this.updateCurrentArea(currentArea)
    }    
  }
}
</script>

<style lang="scss" scoped>
.forms {
  color: #fff;
  display: flex;
  .space {
    margin: 0px 16px 0px 16px;
  }
  .buttonOutter {
    margin: 0px 16px;
  }
}
@media (max-width: 1280px) {
  .forms {
    flex-direction: column;
    .space {
      margin: 6px 0px;
    }
    .buttonOutter {
      margin: 16px 0px;
    }
  }
}
</style>
