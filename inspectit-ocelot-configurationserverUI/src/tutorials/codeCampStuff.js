import React from 'react'
import { throwStatement } from '@babel/types'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div>
        <Header />
        <MemeGenerator />
      </div>
    )
  }
}

class MemeGenerator extends React.Component {
  constructor () {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
      loaded: false
    }
    this.handlerChange = this.handlerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    window.fetch('https://api.imgflip.com/get_memes')
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.setState({
          allMemeImgs: response.data.memes,
          loaded: true
        })
      })
  }
  handlerChange (event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit (event) {
    let randomNum = Math.floor(Math.random() * Math.floor(this.state.allMemeImgs.length))

    this.setState(prevState => {
      return { randomImage: prevState.allMemeImgs[randomNum].url }
    }
    )
    event.preventDefault()
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='topText' value={this.state.topText} placeholder='Top' onChange={this.handlerChange} />
          <input type='text' name='bottomText' value={this.state.bottomText} placeholder='Bottom' onChange={this.handlerChange} />
          <button type='submit'>Gen</button>
        </form>
        {this.state.loaded ? <h2>loaded</h2> : <h2>Loading....</h2>}
        <div>
          <img src={this.state.randomImage} alt='' />
          <h2>{this.state.topText}</h2>
          <h2>{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

function Header (props) {
  return (
    <header>
      Bla
    </header>
  )
}
