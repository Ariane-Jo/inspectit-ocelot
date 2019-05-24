import React from 'react'
import ReactDOM from 'react-dom'

class Form extends React.Component {
  constructor (props) {
    super(props)

    this.initialState = {
      name: '',
      job: ''
    }
    this.state = this.initialState
  }

  handleChange = event => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  submitForm = () => {
    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  }

  render() {
    const {name, job} = this.state

    return (
      <form>
        <label>Name</label>
        <input type = 'text' name = 'name' value = {name} onChange = {this.handleChange} />
        <label>Job</label>
        <input type = 'text' name='job' value={job} onChange={this.handleChange} />
        <input type='button' value='Submit' onClick={this.submitForm} />
      </form>
    )
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  )
}

const TableBody = function (props) {
  const rows = props.charachterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

class Table extends React.Component {
  render () {
    const props = this.props
    return (
      <table>
        <TableHeader />
        <TableBody charachterData={props.charachterData} removeCharacter={props.removeCharacter} />
      </table>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      char: []
    }
  }
  removeCharacter = index => {
    const {char} = this.state
    console.log(char)
    this.setState({
      char: this.state.char.filter((char, i) => {
        return i !== index
      })
    })
  }
  handleSubmit = character => {
    this.setState({
      char: [...this.state.char, character]
    })
  }
  render () {
    return (
      <div className='container'>
        <Table charachterData={this.state.char} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
  
}

function displayApp () {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

export default displayApp
