<template>
  <div class="crud-add">
    <form action="" @submit="addNewTodo">
      <div class="form-group">
        <label for="add-title">Title</label>
        <input type="text" id="add-title" v-model="title">
        <div class="error" v-if="error">Please correct the following error(s): <strong>{{ error }}</strong></div>
        <div class="success" v-if="success">Title added successfully!</div>
      </div>
      <div class="btn" v-on:click="addNewTodo">Create</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "TodoAdd",
  data() {
    return {
      id: '',
      title: '',
      error: false,
      success: false
    }
  },
  methods: {
    addNewTodo() {
      const newTodo = {
        id: uuidv4(),
        title: this.title,
        completed: false
      }
      if (!this.title) {
        this.error = 'Title required';
        return;
      }
      axios
          .post('http://localhost:3000/todos/', newTodo)
          .then(response => {
            console.log(response);
            this.$emit('add-todo', response.data);
            this.title = '';
            this.success = true;
            this.error = false;
            let timerId = null;
            clearTimeout(timerId);
            timerId = setTimeout(() => this.success = false, 2000)
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped lang="scss">
    .success {
      color: green;
      font-size: 12px;
    }
    .error {
      color: red;
      font-size: 12px;
      padding-top: 2px;
    }
    .crud-add {
      margin-bottom: 60px;
      * {
        box-sizing: border-box;
      }
      .form-group {
        text-align: left;
        margin-bottom: 5px;
        height: 80px;
      }
      form {
        max-width: 500px;
        margin: 0 auto;
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
    .btn {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
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