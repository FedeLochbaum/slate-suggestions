import React, { Component } from 'react'
import HighlightText from './highlight-text'
import styles from './suggestion-item.scss'
import { currentPath, currentText } from '../utils/slate-utils'

class SuggestionItem extends Component {
  onClick = event => {
    const { suggestion, callback: { closePortal, onEnter, editor } } = this.props
    event.preventDefault()
    event.stopPropagation()
    if (editor) {
      closePortal()
      onEnter(suggestion, editor)
      editor.focus()
    }
  }
  onMouseEnter = () => this.props.setSelectedIndex(this.props.index)

  currentText = () => {
    const { callback: { editor } } = this.props
    return editor && currentPath(editor) ? currentText(editor).text : ''
  }

  render = () => {
    const { index, selectedIndex, suggestion } = this.props
    return (
      <li
        className={index === selectedIndex ? styles.selected : undefined}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
      >
        <HighlightText text={suggestion} search={this.currentText()} />
      </li>
    )
  }
}

export default SuggestionItem
