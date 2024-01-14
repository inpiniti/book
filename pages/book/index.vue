<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://etnyrefdmddqiuatswhb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bnlyZWZkbWRkcWl1YXRzd2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4ODc3MDIsImV4cCI6MjAyMDQ2MzcwMn0.IwIU929Y-H6JsZdvZ2QSEsmbmBLKIND7B7_a3UpRfhs"
);

const book = ref<any>({
  data: [],
  error: "",
});

const clicked = useState("clicked", () => false);

onMounted(() => {
  select();
});

watch(clicked, () => {
  console.log("clicked");
  select();
});

async function select() {
  try {
    book.value = await supabase.from("book").select();
  } catch (error) {
    console.error(error);
  }
}

import { columns } from "./columns";
</script>
<template>
  <OrganismDialogBook />
  <div class="flex flex-col">
    <PageHeader />
    <div class="container py-10 mx-auto">
      <DataTable :columns="columns" :data="book.data" />
    </div>
  </div>
</template>
