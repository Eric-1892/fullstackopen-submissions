import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'





const App = () => {
  // 全部person的列表
  const [persons, setPersons] = useState([])

  // 添加栏中的输入内容
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // 搜索栏中的输入内容
  const [filterContent, setFilter] = useState('')

  // 交互完成后显示的提示信息
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  // 只在初次渲染时触发，用于请求数据库内容用于渲染
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleSubmit = (event) => {
    // 防止默认刷新页面
    event.preventDefault()
    console.log('add button clicked!!!', event.target)
    
    // 查重名
    const existingPerson  = persons.find(person => person.name === newName)
    
    // 如果存在重名，则走更新逻辑
    if (existingPerson ) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (!confirmUpdate) return

      // 复制重名对象，但更新number
      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
    }else{
      // 不存在重名，则走新增逻辑
      const newPerson = {
        name: newName,
        number: newNumber
      }
      // 把新增的对象post发给服务器后，从服务器返回的对象更新入persons
      personService
        .create(newPerson)
        // .then() 是“我得到了上一个异步操作的返回值后，我要对它做点事”
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          // 设置成功信息
          setSuccessMessage(`Added ${returnedPerson.name}`)
          // 5秒后重置为null
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error =>{
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }

  const handleNameAdd = (event) => {
    // event 是 一个事件对象， 在这里就是用户input的内容
    console.log(event.target)
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    // event 是 一个事件对象， 在这里就是用户input的内容
    console.log(event.target)
    setNewNumber(event.target.value)
  }

  // 更新filterContent的状态值
  const handleFilter = (event) => {
    console.log(event.target)
    setFilter(event.target.value)
  }

  // 通过在personsToShow的每个person后面加一个按钮，点击后向服务器发送delete
  // 并对前端的persons数组进行更新
  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (!confirmDelete) return

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }


  // 搜索栏逻辑, 返回一个包含所有搜索栏输入内容的person对象的列表
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterContent.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filterContent={filterContent} 
              handleFilter={handleFilter}
      >
      </Filter>

      <h2>add a new</h2>
      <PersonForm newName={newName}
                  handleNameAdd={handleNameAdd}
                  newNumber={newNumber}
                  handleNumberAdd={handleNumberAdd}
                  handleSubmit={handleSubmit} 
      >
      </PersonForm>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default App