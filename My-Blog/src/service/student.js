import request from '../utils/request';
import { GET } from '../constants';

const sendRequest = async (
  url,
  method,
  params,
  formData = false,
  headers = {},
  timeout,
) => {
  const res = await request(url, method, params, formData, headers, timeout);
  if (String(res.code) === '200' || String(res.status_code) === '200') {
    return res.data;
  }
  throw new Error('Request error occurred: ', url);
};

export const fetchStudentList = async params => {
  return await sendRequest('/classes/stu', GET, params);
};