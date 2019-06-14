import React from 'react'
import { render } from 'react-dom';
import AceEditor from 'react-ace'
import brace from 'brace';

import 'brace/mode/java';
import 'brace/theme/github';


export default class Editor extends React.Component {
  constructor (props) {
    super()
    this.state = {
      editorText: ''
    }
  }
  componentWillReceiveProps(newProps){
    if(this.props.editorText !== newProps.editorText){
      this.setState({editorText: newProps.editorText})
    }
  }
  editorOnChange = (newValue) => {
    this.setState({editorText: newValue})
  }
  handleSave = (event) => {
    const {key, ctrlKey, metaKey} = event
    if (window.navigator.platform.match('Mac') ? metaKey : ctrlKey && key === 's'){
      event.preventDefault()
      this.props.saveText(this.state.editorText)
    }
  }
  render () {
    return (
      <div onKeyDown={this.handleSave}>
        <AceEditor
          mode='java'
          theme='github' // doens't work?
          onChange={this.editorOnChange}
          onKeyDown={this.handleSave}
          value={this.state.editorText}
          editorProps={{ $blockScrolling: true }}
        />
        <button />
        {/* <button onClick={()=> {this.refs.editor.editor.undo()}}>Undo</button>
        <button onClick={()=> {this.refs.editor.editor.redo()}}>Redo</button>  */}
      </div>
    )
  }
}
