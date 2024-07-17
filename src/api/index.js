import request from '@/api/config.js';

export const createImgeApi = (config = {}) =>
    request({
        url: '/images/generations',
        method: 'post',
        ...config,
})