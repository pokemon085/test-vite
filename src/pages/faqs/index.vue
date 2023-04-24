<template>
  <input type="text" @keyup.enter="add" v-model="title"/>
  {{ store.todos }}
    <div class="item" v-for="(todo,index) in store.todos" :key="todo.id">
      <div>
        <input type="checkbox" id="horns" name="horns" v-model="todo.done" @change="store.isAllChecked">
        <label for="horns">{{ todo.content }}</label>  
      </div>
      <div class="btn">
        <button @click="store.delTodo(index)">delete</button>
      </div>
    </div>
    finish:{{ store.isCompleteds }}
    all length:{{ store.todos.length }}
    <button @click="store.clearAllCompletedTodos">clear all</button>
</template>
<script lang="ts" setup>
import {Todo} from '@/store/types'
import { defineComponent, onMounted ,ref} from 'vue'
import {todoStore} from "@/store/todo"
import {readTodos} from "@/utils/localStorageUtils"

const store=todoStore()

const title=ref('')
const id=ref(3)

onMounted(()=>{
  store.getTodo()
  store.todos=readTodos()
})



const add=()=>{
  const text=title.value
  if(!text.trim()) return

  const todo={
    id: ++id.value,
    content: text,
    done: false
  }  as Todo

  store.addTodo(todo)
  title.value=''
}


</script>