import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp:Mock.Random.date('T'),
    'kind|1': ['考试', '电子书', '教辅', '小说','文学', '艺术' ,'计算机'],
    goodsName: /[a-z]{2}[A-Z]{2}[0-9]/,
    sales:'@integer(40,400)',
    //sales:'@integer(1,5)',
    originPrice:'@integer(10,200)',
    price:'@integer(20,600)',
    'status|1': ['published', 'draft', 'deleted']
  }))
}

export default {
  getList: config => {
    const { kind, goodsName,sales,price, page = 1, limit = 20, } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (kind && item.kind !== kind) return false
      if (goodsName && item.goodsName !== goodsName) return false
      if (item.sales < sales-100 || item.sales > sales) return false
      if (item.price < price-100 || item.price > price) return false
      //if(title !== item.title) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
