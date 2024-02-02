import './index.css'

const Tasks = props => {
  const {eachAddedTask} = props
  const {taskName, tagName} = eachAddedTask

  return (
    <li className="tasklist-item">
      <p className="taskname-in-list">{taskName}</p>
      <button type="button" className="tagname-in-list">
        {tagName}
      </button>
    </li>
  )
}

export default Tasks
