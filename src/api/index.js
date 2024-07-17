import request from '@/api/config.js';

// 生成图片
export const createImgeApi = (config = {}) =>
    request({
        url: '/v1/images/generations',
        method: 'post',
        ...config,
})

// 创建可灵视频
export const createVideoKlingApi = (config = {}) =>
    request({
        url: '/tasks/kling',
        method: 'post',
        ...config,
})

// 获取视频
export const getVideoKlingApi = (config = {}) =>
    request({
        url: '/tasks/' + config.data.url,
        method: 'get',
        ...config,
})