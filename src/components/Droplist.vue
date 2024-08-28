<template>
    <div class="droplistMain">
      <div class="currentText" @click="handleTextClick">{{ currentText }}</div>
      <div :class="showOptions ? 'iconDirectionUp' : 'iconDirectionDown'">
        <IconDirection />
      </div>
      <transition name="fade">
        <div class="options" v-if="showOptions">
          <div
            v-for="item in list"
            :key="item.value"
            @click="handleOptionClick(item)"
          >
            {{ item.text }}
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
import IconDirection from './icons/IconDirection.vue'

export default {
  components: {
    IconDirection
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [Number, String],
    },
    list: {
      type: Array,
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      value: '',
      showOptions: false,
      scrollY: 0, //捲軸
    }
  },
  computed: {
    currentText() {
      const target = this.list.find(item => item.value === this.value)
      if (!target) return ''
      return target.text
    }
  },
  watch: {
    modelValue() {
      this.value = this.modelValue
    },
    scrollY: {
      immediate: true,
      deep: true,
      handler(val, old) {
        this.showOptions = false
      }      
    }
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY
    },
    handleValueChange() {
    },
    handleTextClick() {
      this.showOptions = !this.showOptions
    },
    handleOptionClick(item) {
      this.showOptions = false
      this.$emit('update:modelValue', item.value)
    },
  },
  mounted() {
    this.value = this.modelValue
  }
}
</script>
<style lang="scss" scoped>
.iconDirectionUp {
  transform: translateY(-2px) rotate(180deg);
    transition: all 0.3s;
    transform-origin: center center;
}
.iconDirectionDown {
  transform: translateY(3px) rotate(0deg);
    transition: all 0.3s;
    transform-origin: center center; 
}
.droplistMain {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 113px;
  height: 32px;
  user-select: none;
  & > .currentText {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 32px;
    padding: 10px;
    cursor: pointer;
  }
  & > .options {
    position: absolute;
    top: 36px;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 30px;
      padding: 10px;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid #eeeeee;
      }
      &:hover {
        background-color: beige;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s cubic-bezier(.25,.8,.5,1);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
