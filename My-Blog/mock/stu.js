// 提供学员的mock数据接口
import mockjs from "mockjs"
export default {
  'GET /classes/stu': mockjs.mock({
    code: 200,
    message: 'success',
    'data|1-1000': [
      {
        name: '@cname',
        age: '@integer(15,20)',
        score: '@integer(0,100)',
        city: '@city',
        time: '@date',
      },
    ] 
  })
}