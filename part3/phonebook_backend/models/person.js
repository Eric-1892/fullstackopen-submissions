
// 连接 MongoDB

// 定义了联系人数据模型（Person）

// 提供了对数据库的操作（增删改查）接口

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    // 自定义验证器
    validate: {
      validator: function (v) {
        // 自定义验证逻辑
        // 检查是否至少 8 位
        if (v.length < 8) return false
        // 检查格式是否匹配 “xx(x)-数字”
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()  // 把 _id 转成 id
    delete returnedObject._id                          // 删掉 _id
    delete returnedObject.__v                          // 删掉 __v
  }
})

module.exports = mongoose.model('Person', personSchema)
