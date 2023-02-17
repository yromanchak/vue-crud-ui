<template>
  <div class="crud-list">
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

    <div class="form-group">
      <label for="search">Search</label>
      <input type="text" id="search" v-model="search" placeholder="search todos..">
    </div>

  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodosList",
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
  max-width: 960px;
  margin: 0 auto;
  * {
    box-sizing: border-box;
  }
  ul {
    margin: 0 0 40px;
    padding: 0;
  }
  li {
    list-style: none;
    border-bottom: 1px solid #f3f3f3;
    padding: 10px;
    @media screen and (max-width: 479px) {
      padding: 15px 0;
    }
    &:first-child {
      border-top: 1px solid #f3f3f3;
    }
    &.-empty {
      font-size: 16px;
      line-height: 24px;
      color: red;
      font-weight: 500;
    }
  }

  .form-group {
    max-width: 500px;
    margin: 0 auto 40px;
    text-align: left;
    input {
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
      -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
      box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
      -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: 700;
    }
  }
}
</style>