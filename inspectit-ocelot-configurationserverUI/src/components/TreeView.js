import React, { PureComponent } from 'react'
import { Treebeard } from 'react-treebeard'
import design from '../themes/treeViewTheme'
import {Button, TextField, Checkbox, Grid} from '@material-ui/core'
import '../interface/handler'
import Editor from './Editor'
import { mockHandlerGet, handlerDelete, handlerPut, handlerGet, handlerMove } from '../interface/handler';

export default class TreeView extends PureComponent {
  constructor (props) {
    const res = mockHandlerGet('all')
    addIdToData(res)

    super(props)
    this.state = {
      data: res,
      isFolder: false,
      nodeName: '',
      changeName: '',
      editorFileId: 'x',
      editorText: ''
     }
  }

  //-Clicked Something-------------------------
  onToggle = (node, toggled) => {
    const { cursor, data } = this.state
    if (cursor) {
      // this.setState(() => ({cursor, active: false})) doesn't work
      if (node.id !== data.id && data.active === true) {
        data.active = false // for root 
      }
      cursor.active = false
    }

    node.active = true
    if (node.children) {
      node.toggled = toggled
    }

    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }))
    
    if(!node.children)
      this.displayNode(node.id)
  }

  //-HELPER FUNKTIONS-------------------------
  handleChange = (event) =>  {
    const { name, value, type, checked } = event.target
    type === 'checkbox' ? this.setState({ [value]: checked }) : this.setState({ [name]: value })
  }

  displayNode(id){
    const res = mockHandlerGet(id.toString())
    this.setState({
      editorFileId: id,
      editorText: res.text
    })
  }

  findNode(parents, node){
    let res = node
    parents.forEach( element => {
      res = res.children[element]
    })
    return res
  }

  //-HANDLERS---------------------------------
  handleDelete = (event) => {
    const {data, cursor, editorFileId, editorText} = this.state
    if(!cursor) return

    const currentId = cursor.id.toString()
    const parents = currentId.split(':')
    parents.shift()
    parents.pop()

    const parentNode = this.findNode(parents, data)
    parentNode.children.forEach((element, index) => {
      if (element.id === currentId){
        parentNode.children.splice(index, 1)

        const newEditorText = editorFileId.includes(cursor.id.toString()) ? '' : editorText
        addIdToData(data)

        this.setState(() => ({ 
          data: Object.assign({}, data),
          editorText: newEditorText
        }))
        
        console.log('TODO: Send Delete')
        handlerDelete(cursor)
      }
    })
  }

  handleAdd = () => {
    const {cursor, data, nodeName, isFolder} = this.state
    if(nodeName === '') return

    const node = {name: nodeName}
    if(isFolder === true)
      node.children = []

    this.setState({nodeName: '', isFolder: false})

    //Adding node to data
    if(cursor && cursor.children){
        node.id = cursor.id + ':' + cursor.children.length
        cursor.children.push(node)
    } else if (cursor && !cursor.children) {
      const parents = cursor.id.split(':')
      parents.shift()
      parents.pop()

      const parentNode = this.findNode(parents, data)

      node.id = parentNode.id + ':' + parentNode.children.length
      parentNode.children.push(node)
    }

    console.log('TODO:Send Put')
    handlerPut(node)
    
  }

  handleChangeNodeName = (event) => {
    const {cursor, changeName} = this.state
    if(!cursor || cursor.name === changeName) return

    cursor.name = changeName
    this.setState({changeName: ''})

    console.log('TODO:Send Put')
    handlerPut(cursor)
  }

  handleSaveFile = (newText) => {
    console.log(newText)
    console.log('TODO: Send Put')
    // if(editorFileId !== '')
    //   const idToString = editorFileId.toString()
    // const parents = idToString.splice(':')
    handlerPut()
  }

  //-RENDER
  render () {
    return (
      <Grid container justify='center' spacing={2}>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
        <Editor editorText={this.state.editorText} saveText={this.handleSaveFile}/>
      </Grid>
    </Grid>



    )
  }
}

//-HELPER FUNKTION-------------------------
function addIdToData (node, parentName) {
  // Id of Root shall be 0
  if (!parentName) {
    node.id = 0
    parentName = 0
  }
  // adding id to each child as parentId:childIndex
  if (node.children) {
    node.children.forEach((element, index) => {
      element.id = parentName + ':' + index
      addIdToData(element, element.id)
    })
  }
}
