<template>
  <div class="crud-add">
    <form action="" @submit="addNewTodo">
      <div class="input">
        title:<input type="text" v-model="title">
      </div>
      <div class="btn" v-on:click="addNewTodo">Add</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "AddTodo",
  data() {
    return {
      id: '',
      title: ''
    }
  },
  methods: {
    addNewTodo() {
      const newTodo = {
        id: uuidv4(),
        title: this.title,
        completed: false
      }
      axios
          .post('http://localhost:3000/todos/', newTodo)
          .then(response => {
            console.log(response);
            if (this.title.trim()) {
              this.$emit('add-todo', response.data);
              this.title = '';
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped lang="scss">
    .crud-add {
      .input {
        font-size: 24px;
        font-weight: bold;
      }
      form {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          padding: 5px;
          margin-right: 30px;
          margin-left: 10px;
        }
      }
    }
    .btn {
      height: 42px;
      display: flex;
      align-items: center;
      background: mediumseagreen;
      color: #fff;
      font-weight: bold;
      padding: 0 10px;
      border-radius: 10px;
      cursor: pointer;
      text-transform: uppercase;
      &:hover {
        background: #4c946d;
      }
    }
</style>