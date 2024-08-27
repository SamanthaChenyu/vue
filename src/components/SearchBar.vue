<template>
  <div
    class="mbScrollDownBar"
    :style="screenWidth < 1200 && (isSearchBarShow ? 'top: 8px' : 'top: -100%;')"
  >
    <div class="searchBox">
      <select class="select">
        <option>全部</option>
      </select>
      <p class="separate"></p>
      <div class="group">
        <input type="text" ref="refInput" required placeholder="請輸入關鍵字" @focus="isShowLineBtn = false" />
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

export default {
  components: {
    IconSearch
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
        if (!val && typeof this.$refs.refInput !== 'undefined') this.$refs.refInput.blur()
      }
    }    
  },
  data() {
    return {
      isShowLineBtn: true,
    }
  },
  computed: {
    isMbMode() {}
  },
  methods: {
    handleSearch() {
      this.$emit('onSearch')
    }
  }
}
</script>

<style lang="scss" scoped>
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
