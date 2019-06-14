import React, { PureComponent } from 'react'
import { Treebeard } from 'react-treebeard'
import design from '../themes/treeViewTheme'
import {Button, TextField, Checkbox, Grid} from '@material-ui/core'
import {handlerGet} from '../interface/handler'

export default class TreeView extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: handlerGet('all'),
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
    type === 'checkbox' ? this.setState({ [value]: checked }) : this.setState({ [name]: value })
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
          <Grid container direction='row' alignItems='center' spacing={1}>
            <Grid item xs={12}>
              <Button 
              variant='outlined' 
              color='primary' 
              onClick={this.handleDelete}>
              Delete Node
              </Button>
            </Grid>

            <Grid item xs={6}>
              <TextField  
              label={<p>New Name</p>} 
              variant='outlined' 
              margin='normal' 
              name='nodeName' 
              value={this.state.nodeName} 
              onChange={this.handleChange}
              />
            </Grid>

            <Grid>
              <Checkbox
                value='isFolder'
                type='checkbox'
                disableRipple={true}
                checked={this.state.isFolder}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item>
              <Button variant='outlined' color='primary' onClick={this.handleAdd}>Add Node</Button>
            </Grid>

            <Grid item xs={6}>
              <TextField label={<p>Name to Change</p>} margin='normal' variant='outlined' name='changeName' value={this.state.changeName} onChange={this.handleChange} />
            </Grid>

            <Grid item>
              <Button variant='outlined' color='primary' onClick={this.handleChangeNodeName}>Change Name</Button>
            </Grid>
          </Grid>
        </form>

      </div>

    )
  }
}
