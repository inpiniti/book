import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "@/components/DataTableDropDown.vue";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Book {
  jp: string;
  kr: string;
  sales: number;
  rank: string;
  booknum: number;
  date: string;
  name: string;
  img: string;
}

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "img",
    header: "img",
    cell: ({ row }) => {
      const img = row.getValue("img");

      return h("img", {
        class: "relative w-12 object-cover",
        src: img,
      });
    },
  },
  {
    accessorKey: "jp",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Jp", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("jp")),
  },

  {
    accessorKey: "kr",
    header: "Kr",
  },
  {
    accessorKey: "sales",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Sales", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("sales")),
  },
  {
    accessorKey: "rank",
    header: "rank",
  },
  {
    accessorKey: "booknum",
    header: "booknum",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Date", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("date")),
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;
      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          book,
        })
      );
    },
  },
];
