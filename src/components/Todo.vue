<template>
  <div class="flex flex-row justify-start bg-gray-100 rounded-md p-2">
    <input
      class="checkbox"
      type="checkbox"
      v-model="todo.isDone"
      @click="todoChange()"
    />
    <span
      class="border-b-2 border-blue-600 border-solid flex-1 text-left p-1 my-auto text-3xl"
      :class="{ isDone: todo.isDone }"
    >
      {{ todo.text }}
    </span>
    <button @click="deleteTodo()">
      <svg
        class="h-8 w-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/models/todo";
import { PropType } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TodoComponent extends Vue {
  @Prop({ required: true, type: Object as PropType<Todo> }) todoProp!: Todo;
  todo: Todo = this.todoProp;

  deleteTodo(): void {
    this.$emit("deleteTodo", this.todo.id);
  }

  todoChange(): void {
    this.todo.isDone = !this.todo.isDone;
    this.$emit("todoChange", this.todo);
  }
}
</script>

<style lang="scss" scoped>
.isDone {
  text-decoration: line-through;
}
.checkbox {
  @apply appearance-none h-8 w-8 border border-gray-300 rounded-sm bg-white transition duration-200 my-auto align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer;
  :checked {
    @apply bg-blue-600  border-blue-600;
  }
  :focus {
    @apply outline-none;
  }
}
</style>
