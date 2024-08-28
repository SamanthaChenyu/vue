<template>
  <div 
  :class="isFixed">
    <div class="header">
      <div class="headerLeft" :style="screenWidth < 1200 && (!isSearchBarShow ? 'transform: translateY(0px);' : 'transform: translateY(60px);')">
        <MenuButton @menuToggle="menuToggle"/>
        <div class="logo">
          <img src="../assets/pcLogo.png" v-if="screenWidth >= 1200" />
          <img src="../assets/Logo.png" v-else />
        </div>
        <div class="pcHeaderBanner" v-if="screenWidth >= 1200">
          <img src="../assets/pcHeaderBanner.png" />
        </div>
      </div>
      <SearchBar :isSearchBarShow="isSearchBarShow" :screenWidth="screenWidth" @inputOnFocus="handleSearchInputFocus" />
      <div class="headerRight" :style="screenWidth < 1200 && (!isSearchBarShow ? 'transform: translateY(0px);' : 'transform: translateY(60px);')">
        <p class="text" v-if="screenWidth >= 1200">會員限定</p>
        <div class="loginBtn">
          <RoundButton @onClick="handleLogin">登入</RoundButton>
        </div>
        <CustomBgButton
          @onClick="handleAddMember"
          context="加入會員"
          color="#FF9122"
          v-if="screenWidth >= 1200"
        />
      </div>
    </div>
  </div>
  <MenuPage :isMenuPageShow="menuPage" :screenWidth="screenWidth" :scrollY="scrollY" />
</template>

<script lang="ts">
import MenuButton from './Buttons/MenuButton.vue'
import CustomBgButton from './Buttons/CustomBgButton.vue'
import RoundButton from './Buttons/RoundButton.vue'
import SearchBar from './SearchBar.vue'
import MenuPage from './MenuPage.vue'

export default {
  components: {
    MenuButton,
    RoundButton,
    CustomBgButton,
    SearchBar,
    MenuPage
  },
  computed: {
    isFixed() {
        if (this.screenWidth < 1200 && this.scrollY >= 285) {
          return 'fixed'
        } else if (this.screenWidth > 1200 && this.scrollY >= 320) {
          return 'pcFixed'
        } else {
          return ''
        }
      }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // 在组件销毁前取消事件监听
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    screenWidth: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log('螢幕寬度為：' + val)
      }
    },
    scrollY: {
      immediate: true,
      deep: true,
      handler(val, old) {
        // 當手機版鍵盤出現
        if (this.needStopBehavior) return

        // 往下滑
        if (val > old && this.scrollY >= 285) {
          this.isSearchBarShow = true
        } else if (val === old) {
          this.isSearchBarShow = false
        } else {
          this.isSearchBarShow = false
        }
        console.log('捲軸為：' + val, old)
      }      
    }
  },
  data() {
    return {
      isMbHeaderFixed: false,
      data: 0,
      screenWidth: 0, //螢幕寬度
      menuPage: false,
      scrollY: 0, //捲軸
      isSearchBarShow: false,
      needStopBehavior: false,
    }
  },
  methods: {
    handleSearchInputFocus(val) {
      console.log('偵測input狀態')
    },
    handleResize() {
      this.screenWidth = window.innerWidth
    },
    handleScroll() {
      this.scrollY = window.scrollY
      // 當手機版鍵盤出現
      if (window.screen.height > window.innerHeight + window.screen.height * 0.3) {
        this.needStopBehavior = true
      } else {
        this.needStopBehavior = false
      }
    },
    handleLogin() {
      console.log('登入啦啦啦!')
    },
    handleAddMember() {
      console.log('加入會員啦啦啦!')
    },
    menuToggle(isFalseMenuShow) {
      const body = document.querySelector("body")
      if (isFalseMenuShow === false) {
        this.menuPage = true
        body.style = 'overflow: hidden';
      } else {
        this.menuPage = false
        body.style = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pcFixed {
  position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 999;
    transition: all .3s;
    width: 100%;  
}
.fixed {
  position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 999;
    transition: all .3s;
    width: 100%;
}
.header {
  background-color: #fff;
  margin: 0 auto;
  max-width: var(--max-width-desktop);
  min-width: var(--max-width-desktop);
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    height: 48px;
    display: flex;
    align-items: center;
    margin-left: 24px;
    margin-right: 24px;
    cursor: pointer;
  }
  .pcHeaderBanner {
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
  }
  .headerLeft {
    display: flex;
    align-items: center;
    transition: all .3s;
  }
  .headerRight {
    display: flex;
    align-items: center;
    transition: all .3s;
    .text {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }
    .loginBtn {
      margin-left: 16px;
      margin-right: 8px;
    }
  }
}

@media (max-width: 1200px) {
  .header {
    overflow: hidden;
    height: 60px;
    max-width: calc(100% - 36px);
    min-width: calc(100% - 36px);
    .logo {
      height: 29px;
      margin-left: 12px;
      margin-right: 12px;
    }
    .headerRight {
      .loginBtn {
        margin-left: 0px;
        margin-right: 0px;
      }
    }
  }
}
</style>
