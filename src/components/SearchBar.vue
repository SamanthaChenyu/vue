<template>
  <div class="searchBox" :style="screenWidth < 1200 && (isSearchBarShow ? 'top: 8px' : 'top: -100%;')">
    <select class="select">
      <option>全部</option>
    </select>
    <p class="separate"></p>
    <div class="group">
      <input type="text" required placeholder="請輸入關鍵字" />
      <span class="highlight"></span>
      <span class="bar"></span>
      <button class="searchIcon" @click="handleSearch">
        <img src="../assets/Union.png" alt="search" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
  computed: {
    isMbMode() {
      }
  },
  methods: {
    handleSearch() {
      this.$emit('onSearch')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  width: 237px;
}
input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 190px;
  border: none;
  border-bottom: 0;
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
  .searchBox {
    position: absolute;
        width: calc(100% - 36px);
        left: 50%;
        transform: translateX(-50%);
        top: -100%;
        transition: all .3s;
  }
  input {
    width: 150px;
   }
}
</style>
