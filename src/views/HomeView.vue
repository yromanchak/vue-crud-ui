<template>
  <div class="crud-template">
    <div v-if="errored">We're sorry, we're not able to retrieve this information at the moment, please try back later</div>

    <div v-else>
      <AddTodo v-on:add-todo="addTodo"/>

      <div class="filter">
        <select v-model="filter">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not completed</option>
        </select>
      </div>

      <TodoLoader v-if="loading" />
      <TodosUl v-bind:todos="filteredItems"
               v-on:delete-todo="deleteTodo"
               v-else-if="filteredItems.length"
      />
      <div class="-empty" v-else>List empty</div>

      <div class="link">
        <router-link to="/about">Go to CRUD</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo';
import TodosUl from '@/components/TodosUl';
import TodoLoader from '@/components/TodoLoader';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    AddTodo,
    TodosUl,
    TodoLoader,
  },
  data() {
    return {
      todos: [], // TODO: set empty
      filter: 'all',
      loading: true,
      errored: false
    }
  },
  mounted() {
    axios
        .get('http://localhost:3000/todos')
        .then(response => {
          setTimeout(() => {
            this.todos = response.data;
            this.loading = false;
          }, 1000)
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
  },
  watch: {

  },
  computed: {
    filteredItems: function () {
      switch(this.filter) {
        case 'all':
          return this.todos;
        case 'completed':
          return this.todos.filter(t => t.completed);
        case 'not-completed':
          return this.todos.filter(t => !t.completed);
        default:
          return console.log('sorry something went wrong');
      }
    },
  },
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    addTodo(todo) {
      this.todos.push(todo);
    },
  }
}
</script>

<style scoped lang="scss">
.-empty {
  font-size: 24px;
  line-height: 32px;
  color: red;
  font-weight: 500;
  border: 1px solid gray;
  padding: 10px;
  margin: 40px 0;
}
select {
  margin-top: 20px;
  height: 40px;
}
</style>