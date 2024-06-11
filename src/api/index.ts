
// 文件api/index.ts
import http from '@/utils/axios'

export const goodsList = () => {
  return http.request({
    url: 'src/api/data/goods.json',
    method: 'get'
  })
}

export const categoryList = () => {
  return http.request({
    url: 'src/api/data/category.json',
    method: 'get'
  })
}

export const newsList = () => {
  return http.request({
    url: 'src/api/data/news.json',
    method: 'get'
  })
}





