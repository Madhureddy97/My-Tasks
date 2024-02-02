import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Tasks from './components/Tasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    searchInput: '',
    taskList: [],
    activeOptionId: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {searchInput, activeOptionId} = this.state
    const newTaskItem = {
      id: uuidv4(),
      taskName: searchInput,
      tagName: activeOptionId,
    }

    if (searchInput.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTaskItem],
        searchInput: '',
        activeOptionId: tagsList[0].optionId,
      }))
    }
  }

  onClickDisplayText = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {searchInput, taskList, activeOptionId, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(e => e.tagName === activeTag)

    return (
      <div className="bg-container">
        <div className="left-container">
          <h1 className="create-task-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="label-input-container">
              <label className="label-element" htmlFor="taskInput">
                Task
              </label>
              <input
                type="text"
                className="input-element"
                placeholder="Enter the task here"
                id="taskInput"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
            <div className="label-select-container">
              <label className="label-element" htmlFor="tagsInput">
                Tags
              </label>
              <select
                className="select-element"
                id="tagsInput"
                value={activeOptionId}
                onChange={this.onChangeOption}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="Add-task-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="unordered-list-container">
            {tagsList.map(tag => {
              const isActive = activeTag === tag.optionId
              return (
                <li>
                  <button
                    id={tag.optionId}
                    type="button"
                    value={tag.optionId}
                    className="list-item"
                    onClick={this.onClickDisplayText}
                    isActive={isActive}
                  >
                    {tag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          <ul className="tasklist-container">
            {taskList.length === 0 ? (
              <p className="no-tasks-description">No Tasks Added Yet</p>
            ) : (
              filteredTaskList.map(eachAddedTask => (
                <Tasks eachAddedTask={eachAddedTask} key={eachAddedTask.id} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
