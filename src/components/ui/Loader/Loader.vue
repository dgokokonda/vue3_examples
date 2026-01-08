<template>
  <div class="loading">
    <div class="spinner"></div>
    <span>Загрузка...</span>
  </div>
</template>
<style>
.loading {
  text-align: center;
  padding: 20px;
  color: #666;
  display: flex;
  align-items: center;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}
</style>
