function success({ context, msg }) {
  context.$message(msg);
}

function fail({ context, msg }) {
  context.$message(msg);
}

function cancel({ context, msg }) {
  context.$message({
    type: 'info',
    message: msg,
  });
}

export default function option({
  url,
  type = 'GET',
  data,
  context,
  optionName = '删除',
  confirm = true,
  confirmMsg = '确认删除?',
  successFunc = success,
  failFunc = fail,
  cancelFunc = cancel,
}) {
  const promise = confirm ?
  context.$confirm(confirmMsg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  :
  Promise.resolve();
  promise
  .then(() => {
    fetch({
      url,
      type,
      data,
    })
    .then((r) => {
      if (r.success) {
        // context.$message('停用成功');
        successFunc({
          context,
          data: r.data,
          msg: `${optionName}成功`,
        });
        // this.list[index].status = 0;
      } else {
        // context.$message('停用失败，请重试');
        failFunc({
          context,
          data: r.data,
          msg: `${optionName}失败，请重试`,
        });
      }
    });
  })
  .catch(() => {
    cancelFunc({
      context,
      // data: r.data,
      msg: `已取消${optionName}`,
    });
  });
}
