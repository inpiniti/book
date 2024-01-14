<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://etnyrefdmddqiuatswhb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bnlyZWZkbWRkcWl1YXRzd2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4ODc3MDIsImV4cCI6MjAyMDQ2MzcwMn0.IwIU929Y-H6JsZdvZ2QSEsmbmBLKIND7B7_a3UpRfhs"
);

const useBookOpen = useState<boolean>("useBookOpen");
const loading = ref(false);

async function ok() {
  loading.value = true;

  await supabase
    .from("book")
    .update({
      kr: useBook().getSelectedBook().kr,
      img: useBook().getSelectedBook().img,
    })
    .eq("jp", useBook().getSelectedBook().jp);

  loading.value = false;

  const { triggerClick } = useBook().useEventBus();
  triggerClick();

  useBook().ok();
}
</script>

<template>
  <Dialog :open="useBookOpen" @update:open="useBookOpen = false">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>만화책 수정</DialogTitle>
        <DialogDescription>
          만화책의 한국어 제목 및 책의 이미지를 수정할 수 있습니다.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> 일본어 제목 </Label>
          <Input
            id="name"
            value="Pedro Duarte"
            class="col-span-3"
            v-model="useBook().getSelectedBook().jp"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> 한국어 제목 </Label>
          <Input
            id="name"
            value="Pedro Duarte"
            class="col-span-3"
            v-model="useBook().getSelectedBook().kr"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> 이미지 url </Label>
          <Input
            id="username"
            value="@peduarte"
            class="col-span-3"
            v-model="useBook().getSelectedBook().img"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="ok"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
