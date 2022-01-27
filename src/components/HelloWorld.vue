<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-center gap-2">
      <input
        class="border-blue-600 border-2 input rounded-md p-3 md:w-2/6"
        type="string"
        v-model="input"
        placeholder="Add new todo"
        v-on:keyup.enter="addTodo()"
      />
      <button class="btn btn-blue w-24 self-center" @click="addTodo()">
        Add
      </button>
    </div>
    <div class="mx-auto flex flex-col gap-2 p-2 md:w-2/4">
      <todo-component
        v-for="todo in todos"
        v-bind:key="todo.id"
        v-bind:todoProp="todo"
        @deleteTodo="deleteTodo($event)"
        @todoChange="todoChange($event)"
      ></todo-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/models/todo";
import { Component, Vue, Watch } from "vue-property-decorator";
import TodoComponent from "./Todo.vue";

@Component({
  components: {
    TodoComponent: TodoComponent,
  },
})
export default class HelloWorld extends Vue {
  input: string = "";
  todos: Todo[] = [];

  mounted(): void {
    if (localStorage.todos) {
      this.todos = JSON.parse(localStorage.todos) as Todo[];
    }
  }

  @Watch("todos")
  onPropertyChanged(value: Todo[]): void {
    this.writeTodosToLocalStorage(value);
  }

  addTodo(): void {
    if (!this.input) {
      return;
    }

    let nextId = ([...this.todos].pop()?.id ?? 0) + 1;

    let newTodo: Todo = {
      id: nextId,
      text: this.input,
      isDone: false,
    } as Todo;

    this.todos = this.todos.concat(newTodo);

    this.input = "";
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  todoChange(changedTodo: Todo): void {
    this.todos = this.todos.map((todo) =>
      todo.id === changedTodo.id ? changedTodo : todo
    );
  }

  writeTodosToLocalStorage(todos: Todo[]): void {
    localStorage.todos = JSON.stringify(todos);
  }
}
</script>

<style scoped lang="scss">
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
  &:hover {
    @apply bg-blue-700;
  }
}

input {
  &:focus {
    @apply outline-none border-blue-300 border-2;
  }
}
</style>
