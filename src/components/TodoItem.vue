<template>
    <div class="todo" v-bind:class="{'is-complete':todo.completed}">
      <div v-if="this.editId === todo.id">
        <form v-on:submit="updateTodo">
          <div class="form-group">
            <input
                v-model="updateTitle"
                type="text"
                placeholder=""
            />
          </div>
          <div class="btn btn-danger" v-on:click="updateTodo">Update</div>
          <div class="btn btn-danger" v-on:click="cancel">Cancel</div>
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
        <div class="btn -update" v-on:click="getUpdateId">update</div>
        <div class="btn -delete" v-on:click="removeTodo">delete</div>
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
  .todo .wrap {
    display: flex;
    align-items: center;
    font-size: 24px;
    line-height: 20px;
    .info {
      display: flex;
      flex-grow: 1;
      text-align: left;
    }
  }
  .btn {
    background: gray;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    text-transform: uppercase;
    display: inline-block;
    &:hover {
      background: #2c3e50;
    }
    &.-update {
      background: cadetblue;
      &:hover {
        background: #127aff;
      }
    }
  }
  input {
    margin: 0 10px;
  }
  .is-complete {
    .info {
      text-decoration: line-through;
    }
  }
</style>