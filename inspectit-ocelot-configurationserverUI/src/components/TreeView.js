import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Treebeard } from 'react-treebeard'
import design from '../themes/treeViewTheme'

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

export default class TreeView extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data,
      isFolder: false,
      nodeName: ''
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

  findItem (id, subtree, node) {
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
      id: Math.random() //For now: Just to stop Treebeard from giving off warnings
    }
    if(isFolder === true)
      node.children = []
    this.setState({nodeName: '', isFolder: false})

    //Adding node to data
    if(cursor && cursor.children){
        cursor.children.push(node)
        // const cursorCopy = Object.assign({}, cursor) -- doesn't update the actual node in state.data
        // cursorCopy.children.push(node) 
        // this.setState({cursor: cursorCopy})
    } else if (cursor && !cursor.children) {
      // find parent node
      // add node to parent.children
    }
  }

  handleChange = (event) =>  {
    const { name, value, type, checked } = event.target
    type === 'checkbox' ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  render () {
    return (
      <div>
        <Treebeard
          data={this.state.data}
          onToggle={this.onToggle}
          style={design}
        />
        <form>
          <input type='button' value='Delete' onClick={this.handleDelete} />
          <br />
          <input type='textfield' name='nodeName' value={this.state.nodeName} onChange={this.handleChange} />
          <input type='button' value='Add' onClick={this.handleAdd} />
          <input type='checkbox' name='isFolder' checked={this.state.isFolder} onChange={this.handleChange} />
        </form>

      </div>

    )
  }
}
