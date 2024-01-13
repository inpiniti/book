<script setup lang="ts">
const editProfileOpen = useState("editProfileOpen", () => false);

function ok() {
  useProfile().ok();
}
</script>

<template>
  <Dialog :open="editProfileOpen" @update:open="editProfileOpen = false">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Username </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button @click="ok"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
