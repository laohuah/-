import { message } from 'antd';

export const messageHandle = (type, str) => {
  message.destroy();
  switch (type) {
    case 'error':
      message.error(str);
      break;
    case 'success':
      message.success(str);
      break;
    case 'warn':
      message.warn(str);
      break;
    default:
      break;
  }
};