const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  // 通过 className =“xxx” 来指定css的样式，与.notification {}呼应
  return (
    <div className={type === 'error' ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification
