<template>
  <div class="crud-list">

    <div class="search-wrapper">
      search
      <input type="text" v-model="search" placeholder="search todos..">
    </div>

    <ul>
      <li v-bind:key="todo.id"
          v-for="(todo, idx) of searchedItems">
        <TodoItem
            todo_prop.sync="todo"
            v-bind:todo_prop="todo"
            v-bind:index="idx"
            v-on:delete-todo="$emit('delete-todo', todo.id)"
        />
      </li>
      <li class="-empty" v-if="!searchedItems.length">not found</li>
    </ul>

  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodosUl",
  props: ['todos'],
  data() {
    return {
      search: ''
    }
  },
  components: {
    TodoItem
  },
  computed: {
    searchedItems: function () {
      console.log(this.search);
      return this.todos.filter(t => {
        return (
            t.title.toLowerCase().includes(this.search)
        );
      });
    }
  }
}
</script>

<style scoped lang="scss">
.crud-list {
  li {
    list-style: none;
    border: 1px solid gray;
    padding: 10px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 40px;
    }
    &:first-child {
      margin-top: 40px;
    }
    &.-empty {
      font-size: 24px;
      line-height: 32px;
      color: red;
      font-weight: 500;
    }
  }
}
</style>