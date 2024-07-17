import axios from 'axios';
import { ElMessage } from 'element-plus'

const process = import.meta.env
if (process.MODE === 'development') {
  // 这是开发环境
  console.log('当前是开发环境');
} else if (process.MODE === 'production') {
  // 这是生产环境
  console.log('当前是生产环境');
}
// 创建axios实例
const service = axios.create({
  baseURL: process.VITE_APP_BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
});
 
// 请求拦截器
let token = 'sk-94piBrPZi2DriPw23142114aFeDc4c73Bd350aA64fBd6d0d'
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${token}`;
    // 可以在这里添加请求头等信息
    return config;
  },
  error => {
    debugger
    // 请求错误处理
    ElMessage({
      message: 'error',
      type: 'warning',
    })
    Promise.reject(error);
  }
);
 
// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做处理，例如只返回data部分
    return response.data;
  },
  error => {
    // 响应错误处理
    ElMessage({
      message: error?.message,
      type: 'warning',
    })
    return Promise.reject(error);
  }
);
 
export default service;