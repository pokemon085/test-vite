// 文件api/index.ts
import http from '@/utils/axios';

export const goodsList = () => {
    return http.request({
        url: '/api/goods.json',
        method: 'get',
    });
};

export const categoryList = () => {
    return http.request({
        url: '/api/category.json',
        method: 'get',
    });
};

export const newsList = () => {
    return http.request({
        url: '/api/news.json',
        method: 'get',
    });
};

export const buyHistoryList = () => {
    return http.request({
        url: '/api/buyHistory.json',
        method: 'get',
    });
};
