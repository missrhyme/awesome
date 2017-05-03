import axios from 'axios';

const host = 'http://120.77.208.7:8080/amzdefend/services';
// const host = 'http://localhost:8080/amzdefend/services';
/**
 * 通用的ajax方法
 * @param  {string} url 请求地址
 * @param  {object} data 请求数据
 * @param  {Number} [timeout=1000] 超时时长
 * @param  {String} [type='GET'] 请求方式
 * @param  {String} [dataType='JSON'}] 预期数据类型
 * @return {Promise}
 */


 /**
  * 之后统一node返回的接口后可以在此处进行修改
  * 返回格式形如
  * {
  *   status: 'ok',
  *   data: {}, // 消息主体
  *   msg: '获取成功'
  * }
  */

export default function fetch({
  url,
  data,
  // timeout = 10000,
  type = 'GET',
  responseType = 'json',
}) {
  return axios({
    url: `${host}${url}`,
    method: type,
    data,
    responseType,
  })
    .then(
      (response) => {
        if (response.data.success) {
          return response.data.data;
        }
        return Promise.reject(response);
      },
      err => Promise.reject(err),
    );
}
