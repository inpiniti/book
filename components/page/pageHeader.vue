<script setup lang="ts">
// url 이 도메인/book/aaa/ccc 이라면, book > aaa > ccc 문자열 리턴해줘
const route = useRoute();
const path = route.path;
// 경로를 '/'로 분할하고, 각 세그먼트를 '>'로 연결합니다.
const formattedPath = path.split("/").filter(Boolean).join(" > ");
</script>
<template>
  <div
    class="relative border-b border-gray-200 dark:border-gray-800 py-8 w-full"
  >
    <div
      class="mb-4 text-sm font-semibold text-primary flex items-center gap-1.5"
    >
      {{ formattedPath }}
    </div>
    <div class="flex flex-col lg:flex-row items-start gap-6">
      <div class="flex-1">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between"
        >
          <h1
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            Book Data
          </h1>
        </div>
        <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
          2023년 12월 07일 부터 수집한 데이터 입니다.
        </p>
      </div>
    </div>
  </div>
</template>
