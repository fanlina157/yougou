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


