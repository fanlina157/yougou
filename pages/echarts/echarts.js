import * as echarts from '../../ec-canvas/echarts';
// import geoJson from './mapData.js';
import geoJson from './411000.js'
const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  // 请求json

  echarts.registerMap('130000', geoJson);

  wx.request({
    url: 'https://epidemic.cetccloud.com/epidemic/radar/getJson?fileName=130000',
    method:'post',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res)
      // this.setData({
      //   jsonData: res.data.result
      // })
      // echarts.registerMap('130000', res.data.result);
      const option = {
        tooltip: {
          trigger: 'item'
        },

        visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        series: [{
          type: 'map',
          mapType: '130000',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {

            normal: {
              borderColor: '#389BB7',
              areaColor: '#fff',
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          },
          animation: false,

          data: [
            { name: '承德市', value: 100 },
            { name: '张家口市', value: 10 }
          ]

        }],

      };

      chart.setOption(option);

      return chart;
    }
  })



}

Page({
  // onShareAppMessage: function (res) {
  //   return {
  //     title: 'ECharts 可以在微信小程序中使用啦！',
  //     path: '/pages/index/index',
  //     success: function () { },
  //     fail: function () { }
  //   }
  // },
  data: {
    ec: {
      onInit: initChart
    },
    jsonData:{}
  },

  onReady() {
  }
});
