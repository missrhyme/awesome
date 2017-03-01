import request from 'superagent';

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
  timeout = 10000,
  type = 'GET',
  // dataType = 'JSON'
}) {
  let quest;
  if (type === 'POST') {
    quest = request(type, url)
      .timeout(timeout)
      .send(data);
  } else {
    quest = request
      .get(url)
      .timeout(timeout)
      .query(data);
  }
  return (
    quest
      .then(
        (response) => {
          const body = response.body || JSON.parse(response.text);
          if (body.status == 200) return body.data;
          return Promise.reject(body.msg);
        },
        err => Promise.reject(err),
      )
  );
}
