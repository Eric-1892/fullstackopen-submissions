require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person') // 引入 Mongoose 模块


// 用于在 Vite 项目前端目录下构建生产版本
app.use(express.static('build'))

// 是专门用于解析 POST（或 PUT、PATCH）
// 请求中带有 JSON 格式数据的请求体（body）
app.use(express.json())


// 自定义中间件，用于打印request日志
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)


// 把 Morgan 日志中间件添加到你的 Express 应用中，
// 并使用 'tiny' 预设格式来记录每一个 HTTP 请求的信息
app.use(morgan('tiny')) // 必须在所有路由中间件前面use


// 自定义mogan的日志内容
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// 
// output: 
// POST /api/persons 200 47 - 1.967 ms {"name":"Zhou","number":"123-456"}


// morgan.token('body', (req) => {
//   return req.method === 'POST' ? JSON.stringify(req.body) : ''
// })


// 这两个域名/端口不同，属于“跨域请求”(前端react； 后端node.js)
// 浏览器会拦截这样的请求，除非后端设置了 CORS 允许跨域。
app.use(cors())



app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const currentTime = new Date()
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${currentTime}</p>`
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) // 如果id格式不对，交给错误处理中间件
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = {
    name,
    number
  }

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(200).json({ message: '删除成功!' })
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(404).json({
      error: `name or number is missing`
    })
  }

  //const nameExist = persons.some( person => person.name === body.name)

  // if(nameExist){
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})



// 「兜底处理」：告诉用户「404：未知端点」
//  要提前于错误中间件
//  要在所有router之后
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


// 错误处理中间件
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// 监听端口
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
