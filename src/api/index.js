import request from '@/api/config.js';

// 优化提示词
export const betterPromptApi = (config = {}) =>
    request({
        url: '/tools/v1/prompter',
        method: 'get',
        ...config,
})
