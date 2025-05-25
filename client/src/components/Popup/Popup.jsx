import './Popup.css'
import { Component, createRef } from 'react'

export default class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    }
    this.popupRef = createRef()
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  show(visible) {
    this.setState({ visible })
  }

  handleOutsideClick(e) {
    if(this.props.outsideClick && this.popupRef.current && !this.popupRef.current.contains(e.target)) {
      this.show(false)
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  render() {
    const { visible } = this.state
    const suffix = visible ? 'popup-show' : ''

    return (
      <>
        <div ref={this.popupRef} className={`popup ${suffix}`}>
          {this.props.children}
        </div>
        {visible && <div className="popup-blocker" />}
      </>
    )
  }
}
