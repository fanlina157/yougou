// 这里主要是处理请求的文件
// 这么写主要解决回调地狱问题
// 要学习一下 Promise  es6


// 同时发送异步代码的次数
let ajaxTimes = 0
export const request=(params)=>{

  ajaxTimes ++;

  // 显示加载中

  wx.showLoading({
    title: '加载中',
    mask:true
  })

    const baseUrl = 'https://api.zbztb.cn/api/public/v1'
    return new Promise((reslove,reject)=>{
        wx.request({
            ...params,
            url:baseUrl + params.url,
            success:(result)=>{
                reslove(result)
                
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{

              // 关闭加载中
              // 如果同时发送3个请求，一个成功了，就关闭了，但是其他两个还没有完成，就会出现问题
              // 所以要定义一下同时发送ajax  的次数
              ajaxTimes--;
              if (ajaxTimes === 0) {
                wx.hideLoading()
              }
            }
                                               
        });
    })
}

