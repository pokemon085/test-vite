<template>
  
    <div class="item" v-for="(todo) in store.todos" :key="todo.id">
      {{ todo.content }}
      <!-- <div>
        <input type="checkbox" id="scales" name="scales" checked>
        <label for="scales">{{ todo.content }}</label>
        <button>delete</button>
      </div> -->
    </div>
  
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {todoStore} from "@/store/todo"
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const store=todoStore()
    return{
      store
    }
  },
})

</script>