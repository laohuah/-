import axios from 'axios';
import { GET, POST, PUT } from '../constants';
import { messageHandle } from './tools';

const codeMessage = {
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/*
  @异常处理程序 @params
*/
const errorHandler = response => {
  if (!response) {
    return;
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response && response.status) {
    const errorText = response.statusText || codeMessage[response.status];
    // 网络报错提示，可以改为提示组件
    messageHandle('error', errorText);
    throw new Error(errorText);
  } else if (!response) {
    throw new Error('网络异常');
  }
};

/*
  获取指定cookie的函数
*/
const getCookie = (name) => {
  const r = document.cookie.match(`\\b${name}=([^;]*)\\b`);
  return r ? r[1] : undefined;
};

class Request {
  constructor(baseUrl) {
    this.config = {
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    this.xsrf = getCookie('XSRF-TOKEN'); // XSRF token鉴权
    if (this.xsrf) {
      this.config.headers['X-XSRF-TOKEN'] = this.xsrf;
    }
  }

  http = (url, method, params, isForm = false, header) => {
    const requestConfig = {
      ...this.config,
      url: this.config.url + url,
      method: method || GET,
    }
    // 是否增加额外的请求头
    if (header) {
      requestConfig.headers = {
        ...this.config.headers,
        ...header
      }
    }
    // 判断是否FromData类型
    if (isForm) {
      const formData = new FormData();
      requestConfig.headers = {
        'Content-Type': 'multipart/form-data',
      };
      Object.keys(params).forEach(key => {
        if (/(\[\])$/.test(key)) {
          params[key].forEach(file => {
            formData.append(key, file);
          });
        } else {
          formData.append(key, params[key]);
        }
      });
      if (this.xsrf) {
        requestConfig.headers['X-XSRF-TOKEN'] = this.xsrf;
      }
      requestConfig.data = formData;
    } else if (method === POST || method === PUT) {
      requestConfig.data = params;
    } else {
      requestConfig.data = params;
    }

    return axios(requestConfig)
      .then(res => {
        // 可以自行做业务逻辑处理
        return res.data;
      }).catch(error => {
        return errorHandler(error.response);
      })
  }
}

let baseUrl = '';
export default new Request(baseUrl).http;