import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    order_no: +new Date(),
    timestamp: +Mock.Random.date('T'),
    username: '@name()',
    price: '@float(1000, 15000, 0, 2)',
    'status|1': ['success', 'pending']
  }))
}

export default {
  getList: () => {
    return {
      total: List.length,
      items: List
    }
  }
}
