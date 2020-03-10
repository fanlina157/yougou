import { login } from '../../utils/asyncWx.js'
import { request } from "../../request/index.js"

Page({
 

   getUserInfo(e){
    console.log(e)
    // getUserInfo 拿到 encryptedData, rawData, iv, signature
    const { encryptedData, rawData, iv, signature } = e.detail

    // 登录拿到code

    wx.login({
      timeout:10000,
      success:(result=>{
        console.log(result)
        const {code} = result
        console.log(code)


        // 拿token
        const params = {
          encryptedData, rawData, iv, signature, code
        }
        request({
          url: '/users/wxlogin',
          data: params
        }).then(res => {
          console.log(res)
          const {token} = res
          wx.setStorageSync('token', token)
          wx.navigateBack({
            delta:1  // 返回上一层
          })
        })
      })
    })


    

  }


  // 使用async .....  await
    // async getUserInfo(e){
    //   try{
    //     console.log(e)
    //     // getUserInfo 拿到 encryptedData, rawData, iv, signature
    //     const { encryptedData, rawData, iv, signature } = e.detail

    //     // 登录拿到code
    //     const { code } = await login()
    //     const params = {
    //       encryptedData, rawData, iv, signature, code
    //     }
    //     const { token } = await request({
    //       url: '',
    //       data: params,
    //       method: 'post'
    //     })
    //     wx.setStorageSync('token', token)
    //     wx.navigateBack({
    //       delta: 1  // 返回上一层
    //     })
    //   }catch(err){
    //     console.log(err)
    //   }
    // }

  
})