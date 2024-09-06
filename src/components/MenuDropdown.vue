<template>
  <li>
    <button type="button" @click="toggle">{{ menu.name }}</button>
    <ul v-if="isOpen">
      <MenuDropdown v-for="item in menu.sub" :key="item.id" :menu="item" />
    </ul>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MenuDropdown',
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['isMenuOpen']),
    isOpen() {
      return this.isMenuOpen(this.menu.id)
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['toggleMenu']),
    toggle() {
      this.toggleMenu(this.menu.id)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding-inline-start: 3px;
    li {
        list-style-type: none;
        cursor: pointer;
        position: relative;
        button {
            padding: 4px 8px;
            cursor: pointer;
            border: 0;
            color: #fff;
            font-size: 16px;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            &::after {
                width: 100%;
            }
        }        
    }
}
</style>