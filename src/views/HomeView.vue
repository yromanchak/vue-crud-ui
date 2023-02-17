<template>
  <div class="crud-template">
    <div v-if="errored">We're sorry, we're not able to retrieve this information at the moment, please try back later</div>

    <div v-else>
      <AddTodo v-on:add-todo="addTodo"/>

      <div class="filter">
        <div class="filter-title">Filter</div>
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
* {
  box-sizing: border-box;
}
.filter {
  max-width: 500px;
  margin: 0 auto 40px;
  text-align: left;
  &-title {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  select {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 16px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }
}
.-empty {
  font-size: 24px;
  line-height: 32px;
  color: red;
  font-weight: 500;
  border: 1px solid gray;
  padding: 10px;
  margin: 40px 0;
}
</style>