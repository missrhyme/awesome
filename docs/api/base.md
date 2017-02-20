# 接口基础格式

```json
  {
    "status":200,
    "data":{},
    "msg":"success"
  }
```
```
{"status":"200","msg":"success"}
{"status":"101","msg":"未登录"}
{"status":"102","msg":"参数错误"}
{"status":"500","msg":"服务器错误"}
```

## account

1.用户登录 POST /api/login

request| detail
-----|------
username | 用户名
password | 密码

response| detail
-----|------
success| 登录是否成功   

示例：
```json
{
  "status" : 200,
  "data": {
    "success": true
  },
  "msg" : "登录成功"
}
```
2.注册 POST /api/register

request| detail
-----|------
username | 用户名
captcha | 手机验证码
password | 密码

response| detail
-----|------
success| 注册是否成功   

示例：
```json
{
  "status" : 200,
  "data": {
   "success": false
  },
  "msg" : "验证码错误"
}
```

3.重置密码 POST /api/resetpassword

request| detail
-----|------
username | 用户名
captcha | 手机验证码
password | 新密码

response| detail
-----|------
success| 重置密码是否成功   

示例：
```json
{
  "status" : 200,
  "data": {
   "success": false
  },
  "msg" : "验证码错误"
}
```

4.发送验证码 GET /api/captcha

request| detail
-----|------
mobile | 手机号码

response| detail
-----|------
success| 是否成功  

示例：
```json
{
  "status" : 200,
  "data": {
   "success": true
  },
  "msg" : ""
}
```

## shop
5.新增授权店铺 POST /api/shop/add

 request| detail
 -----|------
  name | 店铺名称
  account | 平台账号
  type | 店铺类型（普通店铺：1，FBA：2）
  access | AWS Access Key ID
  secret | Secret Key
  seller | Seller ID
  marketplace | Marketplace ID



 response| detail
 -----|------
 success| 是否成功
 detail | 店铺详情

 示例：
 ```json
 {
   "status" : 200,
   "data": {
    "success": true,
    "detail": {
       "id": "10000",
       "name": "很厉害的店铺",
       "status": 1,
       "token": true,
       "account": "moemoe@163.com",
       "type": 1,
       "access": "testAccessKey",
       "secret": "testSecretKey",
       "seller": "AED2FSFS823",
       "marketplace": "SADF82317313"
    }
   },
   "msg" : ""
 }
 ```

6.删除授权店铺 POST /api/shop/remove

request| detail
-----|------
 id | 店铺ID

response| detail
-----|------
success| 是否成功

示例：
```json
{
  "status" : 200,
  "data": {
   "success": true
  },
  "msg" : ""
}
```

7.店铺列表<b style="font-size: 20px">(同步打印于页面上)</b>
> 评估是否有必要做分页，如果每个用户店铺量小，可暂时不做.
> 若需要分页 该页面url参数中会带 ?page=1

request| detail
-----|------
 page | 页码，默认为1

response| detail
-----|------
id| 店铺id
name| 店铺名称
status | 启用1 停用0
token | token验证结果 成功true, 失败false

示例：
```json
 [
   {
     "id": "10000",
     "name": "很厉害的店铺",
     "status": 1,
     "token": true
   },
   {
     "id": "10001",
     "name": "很厉害的店铺2",
     "status": 0,
     "token": true
   }
 ]
```

8.获取店铺信息 GET /api/shop/detail

request| detail
-----|------
id| 店铺id

response| detail
-----|------
id |店铺ID
name| 店铺名称
status | 启用1 停用0
token | token验证结果 成功true, 失败false
account | 平台账号
type | 店铺类型（普通店铺：1，FBA：2）
access | AWS Access Key ID
secret | Secret Key
seller | Seller ID
marketplace | Marketplace ID

示例：
```json
{
  "status" : 200,
  "data": {
     "id": "10000",
     "name": "很厉害的店铺",
     "status": 1,
     "token": true,
     "account": "moemoe@163.com",
     "type": 1,
     "access": "testAccessKey",
     "secret": "testSecretKey",
     "seller": "AED2FSFS823",
     "marketplace": "SADF82317313"
  },
  "msg" : ""
}
```

9.更新店铺状态 POST /api/shop/update

request| detail
-----|------
id| 店铺id
name| 店铺名称
status | 启用1 停用0
account | 平台账号
type | 店铺类型（普通店铺：1，FBA：2）
access | AWS Access Key ID
secret | Secret Key
seller | Seller ID
marketplace | Marketplace ID

response| detail
-----|------
success| 是否成功
detail | 店铺详情

示例：
```json
{
  "status" : 200,
  "data": {
     "success": true,
     "detail":{
       "id": "10000",
       "name": "很厉害的店铺",
       "status": 1,
       "token": true,
       "account": "moemoe@163.com",
       "type": 1,
       "access": "testAccessKey",
       "secret": "testSecretKey",
       "seller": "AED2FSFS823",
       "marketplace": "SADF82317313"
     }
  },
  "msg" : ""
}
```

## commodity

## email & SMS template
- add personal info
- 5.add new email-template
- 6.remove email-template
- 7.get email-template-list
- 8.get email-template-detail


## SMS template
  - 5.add new SMS-template
  - 6.remove SMS-template
  - 7.get SMS-template-list
  - 8.get SMS-template-detail
