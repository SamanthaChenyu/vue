<template>
  <div class="header">
    <div class="headerLeft">
      <MenuButton @menuToggle="menuToggle"/>
      <div class="logo">
        <img src="../assets/pcLogo.png" v-if="screenWidth >= 1200" />
        <img src="../assets/Logo.png" v-else />
      </div>
      <div class="pcHeaderBanner" v-if="screenWidth >= 1200">
        <img src="../assets/pcHeaderBanner.png" />
      </div>
    </div>
    <SearchBar v-if="screenWidth >= 1200" />
    <div class="headerRight">
      <p class="text" v-if="screenWidth >= 1200">會員限定</p>
      <div class="loginBtn">
        <RoundButton @onClick="handleLogin" context="登入" />
      </div>
      <CustomBgButton
        @onClick="handleAddMember"
        context="加入會員"
        color="#FF9122"
        v-if="screenWidth >= 1200"
      />
    </div>
  </div>
  <MenuPage :isMenuPageShow="menuPage" :screenWidth="screenWidth"/>
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
    }
  },
  data() {
    return {
      data: 0,
      screenWidth: 0, //螢幕寬度
      menuPage: false
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth
    },
    handleLogin() {
      console.log('登入啦啦啦!')
    },
    handleAddMember() {
      console.log('加入會員啦啦啦!')
    },
    menuToggle(isFalseMenuShow) {
      if (isFalseMenuShow === false) {
        this.menuPage = true
      } else {
        this.menuPage = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  }
  .headerRight {
    display: flex;
    align-items: center;
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
    height: 60px;
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
