<template>
    <div class="todo" v-bind:class="{'is-complete':todo.completed}">
      <div v-if="this.editId === todo.id" class="edit-box">
        <form v-on:submit="updateTodo">
          <div class="form-group">
            <label for="edit-title">Edit title</label>
            <input
                v-model="updateTitle"
                type="text"
                placeholder=""
            />
          </div>
          <div class="btn -save" v-on:click="updateTodo">Save</div>
          <div class="btn" v-on:click="cancel">Cancel</div>
        </form>
      </div>
      <div class="wrap" v-else>
        <div class="info">
          <input type="checkbox"
                 v-on:change="markComplete"
                 v-bind:checked="todo.completed"
          />
          {{ index + 1 }}
          {{ todo.title}}
        </div>
        <div class="btn -update" v-on:click="getUpdateId">Edit</div>
        <div class="btn -delete" v-on:click="removeTodo">Delete</div>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TodoItem',
  props: {
    "todo_prop": {
      type: Object,
      required: true
    },
    index: Number
  },
  data() {
    return {
      todo: this.todo_prop,
      editId: '',
      updateTitle: '',
      updateCompleted: ''
    }
  },
  methods: {
    markComplete() {
      this.updateCompleted = !this.todo.completed;
      const updateCompleted = {
        id: this.todo.id,
        title: this.todo.title,
        completed: this.updateCompleted
      }
      axios
          .put(`http://localhost:3000/todos/${this.todo.id}`, updateCompleted)
          .then((response) => {
            console.log(response.data);
            this.todo.completed = this.updateCompleted
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getUpdateId() {
      axios
          .get(`http://localhost:3000/todos/${this.todo.id}`)
          .then(response => {
            console.log(response);
            this.updateTitle = this.todo.title;
            this.editId = this.todo.id;
          })
          .catch(error => {
            console.log(error);
          });
    },
    updateTodo() {
      const updateTodo = {
        id: this.editId,
        title: this.updateTitle,
        completed: this.todo.completed
      }
      axios
          .put(`http://localhost:3000/todos/${this.todo.id}`, updateTodo)
          .then((response) => {
            console.log(response.data);
            this.todo.title = this.updateTitle;
            this.editId = '';
          })
          .catch((error) => {
            console.log(error);
          });
    },
    cancel() {
      this.editId = '';
    },
    removeTodo() {
      axios
          .delete(`http://localhost:3000/todos/${this.todo.id}`)
          .then(response => {
            console.log(response);
            this.$emit('delete-todo', this.todo.id)
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped lang="scss">
  .edit-box {
    * {
      box-sizing: border-box;
    }
    form,
    .form-group {
      @media screen and (min-width: 480px) {
        display: flex;
        align-items: center;
      }
    }
    label {
      white-space: nowrap;
      font-weight: 700;
    }
    .form-group {
      flex-grow: 1;
      @media screen and (max-width: 479px) {
        text-align: left;
        margin-bottom: 10px;
      }
      input {
        display: block;
        width: 100%;
        height: 30px;
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
        @media screen and (min-width: 480px) {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .todo .wrap {
    @media screen and (min-width: 480px) {
      display: flex;
      align-items: center;
    }
    font-size: 16px;
    line-height: 20px;
    .info {
      display: flex;
      flex-grow: 1;
      text-align: left;
      font-size: 16px;
      line-height: 20px;
      @media screen and (max-width: 479px) {
        margin-bottom: 10px;
      }
    }
  }
  .btn {
    box-sizing: border-box;
    background: gray;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    padding: 5px 10px;
    margin: 0 10px;
    min-width: 100px;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    display: inline-block;
    &:hover {
      background: #2c3e50;
    }
    &.-delete {
      background: #d9534f;
      border-color: #d9534f;
      &:hover {
        background-color: #c12e2a;
        border-color: #c12e2a;
      }
    }
    &.-update {
      background-color: #f0ad4e;
      border-color: #f0ad4e;
      &:hover {
        background-color: #eb9316;
        border-color: #eb9316;
      }
    }
    &.-save {
      background-color: #337ab7;
      border-color: #337ab7;
      &:hover {
        background-color: #265a88;
        border-color: #265a88;
      }
    }
  }
  input {
    @media screen and (min-width: 480px) {
      margin: 0 10px;
    }
  }
  .is-complete {
    .info {
      text-decoration: line-through;
    }
  }
</style>