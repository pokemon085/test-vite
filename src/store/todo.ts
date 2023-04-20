import { defineStore } from 'pinia'
import { Todo } from './types'
import { todoList } from '@/api/index'
import { saveTodos } from '@/utils/localStorageUtils'
export const todoStore = defineStore({
  id: 'todo', // id必填，且需要唯一
  state: () => {
    return {
      status: false,
      todos: [] as Todo[]
    }
  },
  getters: {
    isCompleteds(state) {
      if (state.todos.length > 0) {
        const arr: Todo[] = state.todos.filter(item => item.done == true) ?? []
        return arr.length
      }
      return 0
    }
  },
  actions: {
    getTodo() {
      todoList().then((res) => {
        this.todos = res.data
        saveTodos(this.todos)
      })
    },
    addTodo(todo: Todo) {
      this.todos.unshift(todo)
      saveTodos(this.todos)
    },
    delTodo(index: number) {
      if (window.confirm('delete')) {
        this.todos.splice(index, 1)
      }
    },
    isChecked() {
      if (this.status) {
        this.todos.forEach(item => {
          item.done = true
        })
      } else if (!this.status) {
        this.todos.forEach(item => {
          item.done = false
        })
      }
    },
    isAllChecked() {
      if (this.isCompleteds == this.todos.length) {
        this.status = true
      } else {
        this.status = false
      }
    },

    clearAllCompletedTodos() {
      const arr: Todo[] = this.todos.filter(item => item.done == false)
      this.todos = arr
      saveTodos(this.todos)
    }
  },

})

