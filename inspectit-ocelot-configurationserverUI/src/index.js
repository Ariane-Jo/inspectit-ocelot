import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Treebeard } from 'react-treebeard'

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1.js' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: [
        { name: 'nested child 1' },
        { name: 'nested child 2' }
      ]
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
}

class TreeExample extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (node, toggled) {
    console.log(this.props.data)
    const { cursor, data } = this.state
    if (cursor) {
      this.setState(() => ({ cursor, active: false }))
    }
    node.active = true
    if (node.children) {
      node.toggled = toggled
    }
    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }))

  }

  render () {
    return (
      <Treebeard
        data={this.props.data}
        onToggle={this.onToggle}
      />
    )
  }
}

class AddDelete extends React.Component {
  constructor (props) {
    super(props)
    this.initialstate = {
      name: ''
    }
    this.state = this.initialstate
  }

  onChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  submitForm = () => {
    this.props.onSubmit(this.state)
    this.setState(this.initialstate)
  }

  render () {
    const { name } = this.state
    return (
      <div className='AddDeleteContaner'>
        <label>filename</label>
        <input type='text' name='name' value={name} onChange={this.onChange} />
        <input type='button' value='Submit' onClick={this.submitForm} />
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      name: 'root',
      children: [
        {
        name: 'parent',
        children: [
          { name: 'child1.js' },
          { name: 'child2' }
        ]
      }]
    }
  }
  submit = file => {
    const dummy = this.state
    dummy.children.push(file)
    this.setState(dummy)
  }
  render() {
    return(
      <div className='App'>
        <TreeExample data={this.state} />
        <AddDelete onSubmit={this.submit}/>
      </div>
    )
  }
}

const content = document.getElementById('root')
ReactDOM.render(
  <App />, content)
