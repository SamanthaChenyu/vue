<script setup lang="ts">
import dayjs from 'dayjs'
</script>

<template>
    <div class="updateDate">
        <p>更新日期: {{ dayjs(new Date()).format(`YYYY/MM/DD`) }}</p>
    </div>
</template>

<style scoped>
.updateDate {
    display: flex;
    align-items: center;
    justify-content: end;
}
.updateDate p {
    color: white;
    font-size: 12px;
}
</style>