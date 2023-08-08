<template>
  <div class="greetings">
    <h1 class="green">{{ this.$route.name }}</h1>
  </div>
</template>

<style scoped>
.greetings {
  height: 40px;
  display: flex;
  align-items: center;
}
h1 {
  font-weight: 500;
  font-size: 1rem;
}
</style>
