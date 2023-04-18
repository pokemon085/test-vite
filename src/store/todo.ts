import { defineStore } from 'pinia'
import {Todo} from './types/todo'
export const todoStore = defineStore({
  id: 'todo', // id必填，且需要唯一
  state: () => {
    return {
      todos: [
        { id: 0, content: 'vue.js 2.0', done: true },
      { id: 1, content: 'vuex 2.0', done: false },
      { id: 2, content: 'vue-router 2.0', done: false },
      { id: 3, content: 'vue-resource 2.0', done: false },
      { id: 4, content: 'webpack', done: false }
      ]as Todo[]
    }
  },
  actions: {
  
  },
  getters:{
    
  }
})

