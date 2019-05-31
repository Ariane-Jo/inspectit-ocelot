import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Treebeard } from 'react-treebeard'
import customTheme from './themes/design'

class ConfigTree extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: 'root',
      children: []
      }
  }
  onSubmit = file => {
    console.log(file)
    const currentState = this.state
    console.log(currentState)
    // file is pushed as a child to root
    currentState.children.push(file)
    this.setState({data: currentState})
  }
  onToggle = (node, toggled) => {
    const {cursor, data} = this.state

    // Unhighligths the old node
    if(cursor) {
      this.setState( () => ({cursor, active: false}))
    }
        // Highliths the new node
    node.active = true
    if (node.children) {
      node.toggled = toggled
    }
    this.setState( () => ({cursor: node, data: Object.assign( {}, data)}))
    //this.setState(() => ({ cursor: node, data: Object.assign({}, data) }))
  }
  render () {
    const props = this.props
    return (
      <div>
      <Treebeard
        data={this.state}
        onToggle={this.onToggle}
        style={customTheme}
      />
      <AddFile onSubmit = {this.onSubmit} />
      </div>
    )
  }

}

class AddFile extends PureComponent {
  constructor(props) {
    super(props)
    this.initialstate = {
      name: ''
    }
    /*this.state = {
      name: this.initialstate,
      folder: false
    }*/
    this.state = this.initialstate
  }
  onChange = event => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }
  submitForm = () => {
    this.props.onSubmit(this.state)
    this.setState(this.initialstate)
  }
  render(){
    const {name} = this.state
    return (
      <div className = 'AddContainer'>
        <label>Filename:</label>
        <input type='text' name='name' value={name} onChange={this.onChange} />
        <input type = 'checkbox' name='folder' //onChange={()=>{this.state.folder = !this.state.folder}} 
        />
        <label for='folder'>Folder</label>
        <input type ='button' name='submit' value='Submit' onClick={this.submitForm} />
      </div>
    )
  }
}

function displayTree () {
  ReactDOM.render(
    <ConfigTree />,
    document.getElementById('root')
  )
}
export {displayTree}
