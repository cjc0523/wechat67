const request = (path) => {
  const url = "https://www.zhengzhicheng.cn/api/public/v1/" + path;
  return new Promise(function(resolve, reject) {
    mpvue.request({
      url: url,
      success(res) {
        resolve(res);
      }
    });
  });
};

export default request;
