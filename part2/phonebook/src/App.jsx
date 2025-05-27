import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  // state hooks
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  // 记录当前状态，用来加工其他变量，而不直接展示在页面
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')



  const handleNoteChange = (event) => {
    // event 是 一个事件对象， 在这里就是用户input的内容
    console.log(event.target)
    // 把input这个事件对象的值赋值给newNote
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    
    // 防止默认刷新页面
    event.preventDefault()
    // event 是 一个事件对象， 在这里就是是 <form> 本身
    console.log('save button clicked!!!', event.target)

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    // 把新输入的内容装进新对象，并把新对象存入note列表
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  let notesToShow 

  if (showAll) {
    notesToShow = notes
  } else {
    notesToShow = notes.filter(note => note.important === true)
  }
  // 等效写法
  // const notesToShow = showAll
  // ? notes
  // : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}
          // 控制showAll的开关,点击来调用setShowAll改变showAll的状态（T/F）
        >
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          // 让这个 input 的值受控，始终与状态变量 newNote 同步
          value={newNote}
          // 当 input 的内容发生变化时，调用 handleNoteChange 函数
          onChange={handleNoteChange}
          // 输入框初始提示词
          placeholder="a new note..."

        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App