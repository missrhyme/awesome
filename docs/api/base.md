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
 - 1. login
 - 2. register
 - 3. reset password
 - 4. kaptcha

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
