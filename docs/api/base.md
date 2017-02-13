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
 - 5.add new shop
 - 6.remove shop
 - 7.get shop-list
 - 8.get shop-detail

## commodity

## email template
  - 5.add new email-template
  - 6.remove email-template
  - 7.get email-template-list
  - 8.get email-template-detail


## SMS template
  - 5.add new SMS-template
  - 6.remove SMS-template
  - 7.get SMS-template-list
  - 8.get SMS-template-detail
