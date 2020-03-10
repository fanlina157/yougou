/**
 * promist 形式  showToast
 * @param {object}
 */

export const showToast=({title})=>{
  return new Promise((resolve, reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      mask: true,
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=> { 
        reject(err)
      }
    })
  })
}
/**
 * promist 形式 登录
 * 
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


