
// add a new 模块
// 由form和button组成，用于用户输入新名字和电话来更新电话簿


const PersonForm = ({
  newName,
  handleNameAdd,
  newNumber,
  handleNumberAdd,
  handleSubmit
}) => {
  return (
<form onSubmit={handleSubmit}>
    <div>
        name: <input 
        value={newName}
        onChange={handleNameAdd}
        placeholder="add a new name"
        />
    </div>
    <div>
        number: <input
        value={newNumber}
        onChange={handleNumberAdd} 
        placeholder="add a new number"
        />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
</form>
  )
}

export default PersonForm
