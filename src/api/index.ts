
// 文件api/index.ts
import http  from '@/utils/axios'

export const todoList =()=>{
    return http.request({
        url: 'src/api/data/todoList.json',
        method: 'get'
    })
}

export const goodsList =()=>{
  return http.request({
      url: 'src/api/data/goods.json',
      method: 'get'
  })
}





