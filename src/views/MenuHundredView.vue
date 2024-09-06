<template>
  <div class="wrapper">
    <div id="sidebar" :class="{ active: sidebarCollapse }">
      <div class="sidebar-header">
        <button type="button" @click="toggleAll" class="toggleAll">全部展開/收合</button>
      </div>
      <ul>
        <MenuDropdown :menu="menuList" />
      </ul>
    </div>

    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            type="button"
            id="sidebarCollapse"
            @click="sidebarCollapse = !sidebarCollapse"
            class="btn btn-info"
          >
            Toggle
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MenuDropdown from '@/components/MenuDropdown.vue'

export default {
  name: 'MenuHundredView',
  components: {
    MenuDropdown
  },
  data() {
    return {
      sidebarCollapse: false,
      menuList: [],
    }
  },
  created() {
    this.handleCreate()
  },
  methods: {
    handleCreate() {
      this.menuList = this.createMenuList(99)
    },
    createMenuList(levels, currentLevel = 0) {
      // 基本結構
      const menuItem = {
        id: currentLevel,
        name: `${currentLevel}`,
        sub: []
      };
      // 客製化設置多少以下需要添加子菜單
      if (currentLevel < levels - 1) {
        menuItem.sub.push(this.createMenuList(levels, currentLevel + 1));
      }
      return menuItem;
    },
    ...mapActions(['setOpenMenus']),
    toggleAll() {
      const allMenuIds = this.collectMenuIds(this.menuList);
      const currentlyOpen = allMenuIds.every(id => this.$store.getters.isMenuOpen(id));
      this.setOpenMenus(currentlyOpen ? [] : allMenuIds);
    },
    collectMenuIds(menu) {
      let ids = [menu.id];
      if (menu.sub) {
        menu.sub.forEach(subMenu => {
          ids = ids.concat(this.collectMenuIds(subMenu));
        });
      }
      return ids;
    }    
  }
}
</script>

<style lang="scss" scoped>
$color_lavendar: #7386d5;
$color_lighter: #92a3ec;
$color_darker: #5267c8;

.toggleAll {
  border: 0;
    background-color: $color_darker;
    padding: 8px 16px;
    border-radius: 4px;
    color: #fff;
    box-shadow: 4px 4px 1px 0px $color_lighter;
    cursor: pointer;
    transition: .3s all;
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
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#sidebar {
  background: $color_lavendar;
  color: #fff;
  transition: all 0.3s;

  min-width: 1250px;
  max-width: 1250px;
  min-height: 100vh;
  overflow-x: scroll;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar.active {
  margin-left: -1250px;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -1250px; /* reverses previous setting */
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
