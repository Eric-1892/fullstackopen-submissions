const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

// 是专门用于解析 POST（或 PUT、PATCH）
// 请求中带有 JSON 格式数据的请求体（body）
app.use(express.json())

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

const cors = require('cors')
app.use(cors())


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const total = persons.length
  const currentTime = new Date()
  response.send(
    `<p>Phonebook has info for ${total} people</p><p>${currentTime}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id) 

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(404).json({
      error: `name or number is missing`
    })
  }

  const nameExist = persons.some( person => person.name === body.name)

  if(nameExist){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: Math.floor(Math.random() * 10000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
