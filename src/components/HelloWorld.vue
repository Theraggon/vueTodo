<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-center gap-2">
      <input
        class="border-blue-600 border-2 input rounded-md p-3 md:w-2/6"
        type="string"
        v-model="input"
        placeholder="Add new todo"
        v-on:keyup.enter="addTodo($event, 'input')"
        v-on:animationend="
          ($event) => $event.target.classList.remove('animate-wiggle-small')
        "
      />
      <button
        class="btn btn-blue w-24 self-center"
        v-on:animationend="
          ($event) => $event.target.classList.remove('animate-wiggle')
        "
        @click="addTodo($event, 'button')"
      >
        Add
      </button>
    </div>
    <div class="mx-auto md:w-2/4">
      <transition-group name="list" tag="p" class="flex flex-col gap-2 p-2">
        <todo-component
          v-for="todo in todos"
          v-bind:key="todo.id"
          v-bind:todoProp="todo"
          @deleteTodo="deleteTodo($event)"
          @todoChange="todoChange($event)"
        ></todo-component>
      </transition-group>
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

  addTodo(event: Event, caller: string): void {
    if (!this.input) {
      this.animateFailure(caller, event);
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

  private animateFailure(caller: string, event: Event) {
    if (caller === "button") {
      (event.target as HTMLButtonElement).classList.add("animate-wiggle");
    }
    if (caller === "input") {
      (event.target as HTMLInputElement).classList.add("animate-wiggle-small");
    }
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
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30px);
}
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
