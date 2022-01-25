<template>
  <div class="flex flex-col gap-2">
    <div>
      <input
        class="border-blue-600 border-2 input rounded-md p-2 w-2/6"
        type="string"
        v-model="input"
        placeholder="Add new todo"
        v-on:keyup.enter="submitInput()"
      />
    </div>
    <button class="btn btn-blue w-24 self-center" @click="submitInput()">
      Submit
    </button>
    <div class="mx-auto flex flex-col gap-2 w-2/4">
      <todo-component
        v-for="todo in todos"
        v-bind:key="todo.id"
        v-bind:todoProp="todo"
        @deleteTodo="deleteTodo($event)"
      ></todo-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/models/todo";
import { Component, Prop, Vue } from "vue-property-decorator";
import TodoComponent from "./Todo.vue";

@Component({
  components: {
    TodoComponent: TodoComponent,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  input: string = "Test";
  todos: Todo[] = [];

  submitInput(): void {
    if (!this.input) {
      return;
    }
    let lastTodoSlice = this.todos.slice(-1);
    let lastTodoId = lastTodoSlice.length > 0 ? lastTodoSlice[0].id : 0;

    let newTodo: Todo = {
      id: ++lastTodoId,
      text: this.input,
      isDone: false,
    } as Todo;
    this.todos.push(newTodo);
    console.log(this.todos);
    this.input = "";
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
