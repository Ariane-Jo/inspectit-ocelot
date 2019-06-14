import React from 'react'
import AceEditor from 'react-ace'

//doesn't work either
import brace from 'brace'
import 'brace/ext/searchbox'
import 'brace/mode/java'
import 'brace/theme/github'


export default class Editor extends React.Component {
  constructor () {
    super()
    this.state = {
      editorText: ''
    }
  }
  editorOnChange = (newValue) => {
    this.setState({editorText: newValue})
  }
  handleSave = (event) => {
    const {key, ctrlKey, metaKey} = event
    if (window.navigator.platform.match('Mac') ? metaKey : ctrlKey && key === 's'){
      event.preventDefault()
      //TODO: Override value of file with this.state.editorText
    }
  }
  render () {
    return (
      <div onKeyDown={this.handleSave}>
        <AceEditor
          mode='java'
          theme='solarized_dark' // doens't work?
          onChange={this.editorOnChange}
          onKeyDown={this.handleSave}
          value={this.state.editorText}
          editorProps={{ $blockScrolling: true }}
        />
        {/* <button onClick={()=> {this.refs.editor.editor.undo()}}>Undo</button>
        <button onClick={()=> {this.refs.editor.editor.redo()}}>Redo</button>  */}
      </div>
    )
  }
}
