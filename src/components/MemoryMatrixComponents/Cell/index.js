import {Component} from 'react'

import './index.css'

class Cell extends Component {
  render() {
    const {highlighted, onClick, disabled} = this.props

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`mm-game-cell ${highlighted ? 'highlighted' : ''}`}
        style={{
          width: '50px',
          height: '50px',
          border: '1px solid black',
          backgroundColor: highlighted ? 'blue' : 'white',
          cursor: disabled ? 'default' : 'pointer',
        }}
        aria-label="Memory Matrix Game Cell"
      />
    )
  }
}

export default Cell
