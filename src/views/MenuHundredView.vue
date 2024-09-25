<template>
  <div class="wrapper">
    <div id="sidebar" :class="{ active: sidebarCollapse }">
      <div class="sidebar-header">
        <button type="button" @click="toggleAll" class="sidebarButton">全部展開/收合</button>

        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="飲料"
          placeholder="飲料"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker-group
            :loading="loading"
            title="选择飲料"
            :tabs="tabs"
            next-step-text="下一步"
            @confirm="onConfirm"
            @cancel="showPicker = false"
            v-model:active-tab="activeTab"
          >
            <van-picker
              v-for="menuItem in list"
              :loading="loading"
              :columns="sliceList"
              @cancel="showPicker = false"
              @confirm="onConfirm"
              @scroll-into="onChangeTabs"
            />           
          </van-picker-group>
        </van-popup>

      </div>
      <ul>
        <MenuDropdown :menu="menuList" />
      </ul>
    </div>
    <div v-if="sidebarCollapse" class="mask" @click="sidebarClose" />
    <div id="content" :class="sidebarCollapse ? 'menuOpen' : 'menuClose'">
      <MenuButton @menuToggle="handleDrawerOpen" />
    </div>
  </div>
</template>

<script>
import * as apiService from '@/services/apiService.js'
import { mapActions } from 'vuex'
//事件延遲執行，按鈕連續點擊，以最後一次點擊完才執行事件
import debounce from 'lodash/debounce'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuButton from '@/components/Buttons/MenuButton.vue'

export default {
  name: 'MenuHundredView',
  components: {
    MenuDropdown,
    MenuButton
  },
  data() {
    const getMenuDataURL = () => {
      return import.meta.env.MODE === 'production'
        ? apiService.get("/vue/data.json")
        : apiService.get("/data.json")
    };
    const ACTIVE_TYPES = {
      fristClass: 0,
      secondClass: 1
    }
    return {
      activeTab: ACTIVE_TYPES.fristClass,
      sidebarCollapse: false,
      menuList: [],
      getMenuDataURL,
      loading: false,
      list: [],
      fieldValue: '',
      showPicker: false,
      ACTIVE_TYPES,
      arrangeList: [],

      fristClassIds: {
        keys: [],
        sliceList: []
      },
      secondClassIds: {
        keys: [],
        sliceList: []
      },
      thiredClassIds: {
        keys: [],
        sliceList: []
      },
      currentTabKey: null,
      currentGroupIdx: null,
    }
  },
  created() {
    this.handleCreate()
  },
  computed: {
    tabs() {
      switch (true) {
        // 第一層選好，邁向第二項
        case this.fristClassIds.keys.includes(this.currentTabKey):
        return ['选择第一項', '选择第二項']
        case this.secondClassIds.keys.includes(this.currentTabKey):
        return ['选择第一項', '选择第二項', '选择第三項']
        case this.thiredClassIds.keys.includes(this.currentTabKey):
        return ['选择第一項', '选择第二項', '选择第三項', '选择第四項']
        default:
        return ['选择第一項']
      }
    },
    sliceList() {
      switch (this.activeTab) {
        case 1:
          console.log('?????')
          return this.secondClassIds.sliceList.filter((item) => item.groupIdx === this.currentGroupIdx)
        case 2:
          return this.thiredClassIds.sliceList.filter((item) => item.groupIdx === this.currentGroupIdx)
        default:
          return this.fristClassIds.sliceList
      }      
    }
  },
  methods: {
    async handleCreate() {
      this.loading = true;
      this.menuList = this.createMenuList(100)
      const response = await this.getMenuDataURL();
      this.list = response
      this.handleMenu(response)
      this.loading = false;
    },
    handleMenu(list) {
      list.forEach((item, index) => {
        this.fristClassIds.keys.push(item.key);
        this.fristClassIds.sliceList.push({
          key: item.key,
          text: item.text,
          groupIdx: index
        });
        if (item.children) {

          item.children.map((child, childIdx) => {
            this.secondClassIds.keys.push(child.key)
            this.secondClassIds.sliceList.push({
              key: child.key,
              text: child.text,
              groupIdx: index              
            })
            if (child.children) {

              child.children.map((grand) => {
                this.thiredClassIds.keys.push(grand.key)
                this.thiredClassIds.sliceList.push({
                  key: grand.key,
                  text: grand.text,
                  groupIdx: childIdx                    
                })
              })

            }
          })

        }
      })
    },
    sidebarClose() {
      const target = document.querySelector('#checkbox')
      target.click()
      this.sidebarCollapse = false
    },
    handleDrawerOpen: debounce(function (isFalseMenuShow) {
      this.sidebarCollapse = !isFalseMenuShow
    }, 300),
    createMenuList(levels, currentLevel = 0) {
      // 基本結構
      const menuItem = {
        id: currentLevel,
        name: `${currentLevel}`,
        sub: []
      }
      // 客製化設置多少以下需要添加子菜單
      if (currentLevel < levels - 1) {
        menuItem.sub.push(this.createMenuList(levels, currentLevel + 1))
      }
      return menuItem
    },
    ...mapActions(['setOpenMenus']),
    toggleAll() {
      const allMenuIds = this.collectMenuIds(this.menuList)
      const currentlyOpen = allMenuIds.every((id) => this.$store.getters.isMenuOpen(id))
      this.setOpenMenus(currentlyOpen ? [] : allMenuIds)
    },
    collectMenuIds(menu) {
      let ids = [menu.id]
      if (menu.sub) {
        menu.sub.forEach((subMenu) => {
          ids = ids.concat(this.collectMenuIds(subMenu))
        })
      }
      return ids
    },
    onChangeTabs({ currentOption, columnIndex }) {
      this.currentTabKey = currentOption.key
      this.currentGroupIdx = currentOption.groupIdx
      console.log(currentOption)
    },
    onConfirm({ selectedOptions }) {
      this.showPicker = false;
      let name = ''
      selectedOptions.map((item, idx) => {
        if (item) return name += item.text ? item.text + '/' : ''
      })
      this.fieldValue = name;
    }
  }
}
</script>

<style lang="scss" scoped>
$color_lavendar: #7386d5;
$color_lighter: #92a3ec;
$color_darker: #5267c8;

@keyframes mask-animation {
  0% {
    backdrop-filter: blur(0px);
  }
  100% {
    backdrop-filter: blur(10px);
  }
}
.mask {
  cursor: pointer;
  position: fixed;
  top: 32px;
  left: 0;
  z-index: 0;
  width: 100%;
  height: calc(100% - 32px);
  backdrop-filter: blur(0px);
  transition: all 0.3s ease-in-out;
  animation: mask-animation 0.3s ease-in-out forwards;
}

.menuOpen {
  margin-left: 450px;
  transition: all 0.3s;
}
.menuClose {
  margin-left: 0px;
  transition: all 0.3s;
}

.sidebarButton {
  border: 0;
  background-color: $color_darker;
  padding: 8px 16px;
  border-radius: 4px;
  color: #fff;
  box-shadow: 4px 4px 1px 0px $color_lighter;
  cursor: pointer;
  transition: 0.3s all;
  margin-top: 8px;
  &:hover {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 1px 0px $color_lighter;
  }
}

ul {
  padding-inline-start: 0px;
}
#content {
  padding: 20px;
  float: left;
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

#sidebar {
  position: absolute;
  z-index: 1;

  background: $color_lavendar;
  color: #fff;
  transition: all 0.3s;

  min-width: 450px;
  max-width: 450px;
  min-height: 100%;
  overflow-x: scroll;
  margin-left: -450px;
  &.active {
    margin-left: 0px;
  }
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .menuOpen {
    margin-left: 60%;
  }
  .mask {
    top: 0px;
    height: 100%;
  }
  #sidebar {
    margin-left: -60%; /* reverses previous setting */
    min-width: 60%;
    max-width: 60%;
  }
  #sidebar.active {
    margin-left: 0; /* reverses previous setting */
  }
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}
</style>
