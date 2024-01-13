<template>
  <AlertDialog :open="dialogAboutOpen" @update:open="dialogAboutOpen = false">
    <AlertDialogContent class="absolute">
      <AlertDialogHeader>
        <AlertDialogTitle>inpiniti/book</AlertDialogTitle>
        <AlertDialogDescription>
          <p>버전: 1.85.0 (Universal)</p>
          <p>개발자: inpiniti ()</p>
          <p>커밋: af28b32d7e553898b2a91af498b1fb666fdebe0c</p>
          <p>날짜: 2023-12-06T18:18:04.614Z (1개월 전)</p>
          <p>Nuxt: ^6.10.4</p>
          <p>shadcn-nuxt: ^0.8.7</p>
          <p>Node.js: v19.4.0</p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="dialogAboutOpen = false"
          >확인</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
const dialogAboutOpen = useState("dialogAboutOpen", () => false);

function ok() {
  useDialog().ok();
}
</script>
