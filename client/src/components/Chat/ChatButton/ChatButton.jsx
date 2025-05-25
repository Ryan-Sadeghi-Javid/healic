import './ChatButton.css'
import { Component } from 'react'

export default class ChatButton extends Component {
    constructor(props) {
      super(props)

      this.state = {
        active: false,
      }
    }

    getState() {
      return this.state.active
    }

    render() {
      const { state: { active }, props: { children } } = this
      const activeClass = active ? 'chat-button-active' : ''

      return (
        <button className={`chat-button ${activeClass}`} onMouseDown={() => this.setState({ active: !active })}>{children}</button>
      )
    }
}