<template>
  <div
    class="mbScrollDownBar"
    :style="screenWidth < 1200 && (isSearchBarShow ? 'top: 8px' : 'top: -100%;')"
  >
    <div class="searchBox">
      <Droplist v-model="droplistValue" :list="droplistOptions" />
      <p class="separate"></p>
      <div class="group">
        <input type="text" ref="searchInput" required placeholder="請輸入關鍵字" 
        @focus="handleEvent('focus')" 
        @blur="handleEvent('blur')" />
        <span class="highlight"></span>
        <span class="bar"></span>
        <button class="searchIcon" @click="handleSearch">
          <IconSearch />
        </button>
      </div>
    </div>
    <button class="addLineFriends" v-if="screenWidth < 1200 && isShowLineBtn">加入LINE</button>
  </div>
</template>

<script>
import IconSearch from "../components/icons/IconSearch.vue";
import Droplist from '../components/Droplist.vue'

export default {
  components: {
    IconSearch,
    Droplist,
  },
  props: {
    isSearchBarShow: {
      type: Boolean,
      required: true
    },
    screenWidth: {
      type: Number,
      required: true
    }
  },
  watch: {
    isSearchBarShow: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val && typeof this.$refs.searchInput !== 'undefined') this.$refs.searchInput.blur()
      }
    }    
  },
  data() {
    return {
      isShowLineBtn: true,
      droplistValue: '',
      droplistOptions: [
        { text: '全部', value: 0 },
        { text: '新聞', value: 1 },
        { text: '專欄', value: 2 },
        { text: '體育', value: 3 },
      ]
    }
  },
  methods: {
    handleSearch() {
      this.$emit('onSearch')
    },
    handleEvent(event){
      if (event === 'blur') {
        this.isShowLineBtn = true;
        this.$emit('inputOnFocus', false)
        this.stopScrollEvent(false)
      } 
      if (event === 'focus') {
        this.isShowLineBtn = false;
        this.$emit('inputOnFocus', true)
        this.stopScrollEvent(true)
      }
    },
    stopScroll(e) {
      e.preventDefault()
    },
    stopScrollEvent(bool) {
      if (bool) {        
        window.addEventListener('touchmove', this.stopScroll, { passive: false })
        window.addEventListener('scroll', this.stopScroll, true)
      } else {
        window.removeEventListener('touchmove', this.stopScroll, false)
        window.removeEventListener('scroll', this.stopScroll, true)
      }
    },
  },
  mounted() {
    this.droplistValue = this.droplistOptions[0]?.value
  }
}
</script>

<style lang="scss" scoped>
.select-option {
  
}
.addLineFriends {
  background-color: #07b53b;
  border-radius: 46px;
  padding: 4px 8px;
  border: 1px #07b53b;
  color: var(--vt-c-white);
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  transition: all .3s;
}
.separate {
  height: 32px;
  background: #dddddd;
  width: 1px;
  margin: 0px 12px;
}
.select {
  width: 113px;
  border: 0 transparent;
  margin: 0px 15px;
  cursor: pointer;
  font-size: 16px;
  &:focus-visible {
    border: 0;
    outline: none;
  }
}
.searchBox {
  width: 400px;
  border: 1px solid #dddddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  background-color: var(--vt-c-white);
}
.searchIcon {
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.group {
  position: relative;
  width: 100%;
}
input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 225px;
  border: none;
  border-bottom: 0;
  transition: all .3s;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b7b7b7;
    font-size: 16px;
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder {
    /* Edge 12 -18 */
    color: #b7b7b7;
    font-size: 16px;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  }
}

@media (max-width: 1200px) {
  .mbScrollDownBar {
    position: absolute;
    top: -100%;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 36px);
  }
  .searchBox {
    width: 100%;
    min-width: 230px;
  }
  input {
    width: calc(100% - 30px);
  }
}
</style>
