<template>
    <transition name="modal" @after-leave="afterLeave">
      <dialog
        ref="modal"
        class="modal-container"
        v-show="innerModelValue"
        @click="handleClickOutSide"
      >
        <div class="header">
          <slot name="header"></slot>
        </div>
  
        <div class="body">
          <slot></slot>
        </div>
  
        <div class="footer">
          <slot name="footer">
            <button class="btn" @click="innerModelValue = false">CLOSE</button>
          </slot>
        </div>
      </dialog>
    </transition>
  </template>

  
<script>
import { ref, computed, onMounted, watch } from "vue";

export default {
  name: 'BasicModal',
  props: {
    modelValue: Boolean,
  },
  setup(props, ctx) {
    const modal = ref();

    const innerModelValue = computed({
      get: () => props.modelValue,
      set: (value) => ctx.emit("update:model-value", value),
    });

    const displayModal = (show) => {
      if (!modal.value) return;
      if (show) {
        modal.value.showModal();
      } else {
        modal.value.close();
      }
    };

    onMounted(() => {
      if (innerModelValue.value) displayModal(true);
    });

    watch(innerModelValue, (isOpen) => {
      if (isOpen) displayModal(true);
    });

    const afterLeave = () => {
      ctx.emit("dialogClose");
      displayModal(false);
    }

    const handleClickOutSide = ({ clientX: x, clientY: y }) => {
      if (!modal.value) return;

      const { left, right, top, bottom } = modal.value.getBoundingClientRect();
      if (x < left || x > right || y < top || y > bottom)
        innerModelValue.value = false;
    };

    return {
      modal,
      afterLeave,
      displayModal,
      innerModelValue,
      handleClickOutSide,
    };
  },
};
</script>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active {
  transition-timing-function: "ease-out";
}

.modal-leave-active {
  transition-timing-function: "ease-in";
}

.modal-enter-active,
.modal-leave-active {
  transition-duration: 1200ms;
}

.modal-enter-from.modal-container,
.modal-leave-to.modal-container {
  transition: all .3s;
  transform: translateY(-200px);
}

.modal-container::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  transition: all .3s;
}

.modal-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 200px;
  margin: auto;
  max-width: 300px;
  border-radius: 10px;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border: none;
  transition: all .3s;
}

.header {
  font-weight: bold;
  text-transform: uppercase;
}

.footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.btn {
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
