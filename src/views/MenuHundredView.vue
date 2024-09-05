<template>
  <div class="wrapper">
    <div id="sidebar" :class="{ active: sidebarCollapse }">
      <div class="sidebar-header">
        <h3>Sidebar</h3>
      </div>

      <ul class="list-unstyled components">
        <li class="active">
          <a href="#" class="dropdown-toggle">Home</a>

          <ul class="collapse list-unstyled">
            <li>
              <a href="#">第0層</a>
<MenuDropdown />
            </li>
          </ul>
        </li>
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
import MenuDropdown from '@/components/MenuDropdown.vue'

export default {
  conponents: {
    MenuDropdown,
  },
  data() {
    return {
      sidebarCollapse: false,
      // 產生數值序列 v 初始化為 `undefined`
      menu: [...Array(5)].map((v, number) => {
        return {
          title: number,
          submenu: `${number}-child`
        }
      })
    }
  },
  created() {
    this.handleCreate()
  },
  methods: {
    handleCreate() {
      console.log('開始R!')
    }
  }
}
</script>

<style lang="scss" scoped>
$color_lavendar: #7386d5;

ul {
  padding-inline-start: 28px;
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
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar.active {
  margin-left: -1250px;
}

a[data-toggle='collapse'] {
  position: relative;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

/* dropdown-toggle is a bootstrap class */
.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

/*
Small devices will have the sidebar hidden by default and you use a deliberate action to active it.

Large devices can show the sidebar all the time (unless deliberately dismissed).
*/
@media (max-width: 768px) {
  #sidebar {
    margin-left: -1250px; /* reverses previous setting */
  }
  #sidebar.active {
    margin-left: 0; /* reverses previous setting */
  }
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: $color_lavendar;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded='true'] {
  color: #fff;
  background: #6d7fcc;
}
ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}
</style>
