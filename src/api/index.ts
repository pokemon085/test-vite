// 文件api/index.ts
import http from '@/utils/axios';

const path = (path: string):string => {
    return import.meta.env.VITE_BASE + path;
};

export const goodsList = () => {
    return http.request({
        url: path('api/goods.json'),
        method: 'get',
    });
};

export const categoryList = () => {
    return http.request({
        url: path('api/category.json'),
        method: 'get',
    });
};

export const newsList = () => {
    return http.request({
        url: path('api/news.json'),
        method: 'get',
    });
};

export const buyHistoryList = () => {
    return http.request({
        url: path('api/buyHistory.json'),
        method: 'get',
    });
};
