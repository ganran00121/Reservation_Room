import { defineStore } from "pinia";
export const checklist  = defineStore("checklist", {
  state: () => ({ count: 10, number:1 }),
  actions: {
    increment() {
      this.count +=10;
      this.number += 10;

    },
  },
});
