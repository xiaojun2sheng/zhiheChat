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

// 聊天
export const chatCompletionsApi = (config = {}) =>
    request({
        url: '/v1/chat/completions',
        method: 'post',
        ...config,
})

// 文字转语音
export const textToVoice = (config = {}) =>
    request({
        url: '/v1/audio/speech',
        method: 'post',
        ...config,
})

// 优化提示词
export const betterPromptApi = (config = {}) =>
    request({
        url: '/tools/v1/prompter',
        method: 'get',
        ...config,
})
