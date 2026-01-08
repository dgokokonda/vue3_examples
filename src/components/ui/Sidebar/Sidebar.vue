<template>
  <div v-if="sidebar" class="sidebar">
    <span class="sidebar-close" @click="close"></span>
    <div class="sidebar-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore eos
        dolorum consectetur, ad nobis, quae optio maxime tempore repellat sit
        autem veniam a expedita. Quibusdam voluptatem dolorem vero deleniti
        eius.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const sidebar = computed(() => store.state.sidebar);

const close = () => store.commit("closeSidebar");
</script>
<style>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar-content {
  margin-top: 40px;
}

.sidebar-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: transparent;
}

.sidebar-close::before,
.sidebar-close::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 2px;
  background-color: #333;
  transform: translate(-50%, -50%) rotate(45deg);
}

.sidebar-close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
