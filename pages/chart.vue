<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
<template>
  <div>
    <NuxtLayout name="menu">
      <div>
        <NuxtLayout name="side">
          <div>
            <NuxtPage />
          </div>
        </NuxtLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
