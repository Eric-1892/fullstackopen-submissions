// 用于过滤搜索指定人名，大小写不敏感
const Filter = ({filterContent, handleFilter}) => {
    return (
        <div>
            filter shown with: <input 
            value={filterContent}
            onChange={handleFilter}
            placeholder="search a name"
            />
        </div>
  )
}

export default Filter
