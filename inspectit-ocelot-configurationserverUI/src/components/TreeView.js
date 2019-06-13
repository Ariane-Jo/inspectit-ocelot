import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Treebeard } from 'react-treebeard'
import design from '../themes/treeViewTheme'
import {Button, TextField} from '@material-ui/core'

const data = {
  id: 1,
  name: 'root',
  toggled: true,
  children: [
    {
      id: 2,
      name: 'parent',
      children: [
        { id: 3,
          name: 'child1' },
        { id: 4,
          name: 'child2' }
      ]
    },
    {
      id: 5,
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      id: 898,
      name: 'parent',
      children: [
        {
          id: 7,
          name: 'nested parent',
          children: [
            {
              id: 8,
              name: 'nested child 1' },
            { id: 9,
              name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
}
function addIdToData(node, parentName){
  // Id of Root shall be 0
  if(!parentName) {
    node.id = 0
    parentName = 0
  }
  // adding id to each child as parentId:childIndex
  if (node.children){
    node.children.forEach((element, index) => {
      element.id = parentName + ':' + index
      addIdToData(element, element.id)
    })
  }
}

export default class TreeView extends PureComponent {
  constructor (props) {
    super(props)
    addIdToData(data)
    this.state = {
      data,
      isFolder: false,
      nodeName: '',
      changeName: ''
     }
    this.onToggle = this.onToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  onToggle (node, toggled) {
    const { cursor, data } = this.state
    if (cursor) {
      // this.setState(() => ({cursor, active: false})) doesn't work
      if (node.id !== data.id && data.active === true) {
        data.active = false
      }
      cursor.active = false
    }
    node.active = true
    if (node.children) {
      node.toggled = toggled
    }
    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }))
  }

  handleDelete (event) {
    let id = this.state.cursor.id
    this.findItem(id, this.state.data)
    this.setState(() => ({ data: Object.assign({}, this.state.data) }))
  }

  findItem (id, subtree) {
    if (subtree.children == null) {
      return
    }
    let children = subtree.children
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        subtree.children.splice(i, 1)
        return
      } else {
        this.findItem(id, children[i])
      }
    }
  }

  handleAdd = () => {
    const {cursor, data, nodeName, isFolder} = this.state
    //Generating the new node and resetting input
    if(nodeName === '')
      return
    const node = {
      name: nodeName,
    }
    if(isFolder === true)
      node.children = []
    this.setState({nodeName: '', isFolder: false})

    //Adding node to data
    if(cursor && cursor.children){
        node.id = cursor.id + ':' + cursor.children.length
        cursor.children.push(node)
        // const cursorCopy = Object.assign({}, cursor) -- doesn't update the actual node in state.data
        // cursorCopy.children.push(node) 
        // this.setState({cursor: cursorCopy})
    } else if (cursor && !cursor.children) {
      const parents = cursor.id.split(':')
      parents.shift()
      parents.pop()
      const parentNode = this.findNode(parents, data)
      node.id = parentNode.id + ':' + parentNode.children.length
      parentNode.children.push(node)
    }
  }

  findNode(parents, node){
    let res = node
    parents.forEach( element => {
      res = res.children[element]
    })
    return res
  }

  handleChange = (event) =>  {
    const { name, value, type, checked } = event.target
    type === 'checkbox' ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  handleChangeNodeName = (event) => {
    const {cursor, changeName} = this.state
    cursor.name = changeName
    this.setState({changeName: ''})
  }

  render () {
    return (
      <div>
        <Treebeard
          data={this.state.data}
          onToggle={this.onToggle}
          style={design}
        />
        <br/>
        <form>
          <Button variant='outlined' color='primary' onClick={this.handleDelete}>Delete Node</Button>
          {/* <input type='button' value='Delete' onClick={this.handleDelete} /> */}
        <br />
          <TextField  label={<p>New Name</p>} variant='outlined' name='nodeName' value={this.state.nodeName} onChange={this.handleChange}/>
          {/* <input type='textfield' name='nodeName' value={this.state.nodeName} onChange={this.handleChange} /> */}
          <TextField  variant='filled' name='isFolder' type='checkbox' value={this.state.isFolder} onChange={this.handleChange}/>
          {/* <input type='checkbox' name='isFolder' checked={this.state.isFolder} onChange={this.handleChange} /> */}
          <Button variant='outlined' color='primary' onClick={this.handleAdd}>Add Node</Button>
          {/* <input type='button' value='Add' onClick={this.handleAdd} /> */}
        <br/>
          <TextField label={<p>Name to Change</p>}variant='outlined' name='changeName' value={this.state.changeName} onChange={this.handleChange} />
          {/* <input type='textfield' name='changeName' value={this.state.changeName} onChange={this.handleChange} /> */}
          <Button variant='outlined' color='primary' onClick={this.handleChangeNodeName}>Change Name</Button>
          {/* <input type='button' value='Change Name' onClick={this.handleChangeNodeName} /> */}
        </form>

      </div>

    )
  }
}
