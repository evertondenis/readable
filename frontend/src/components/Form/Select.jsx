import React, { PureComponent } from 'react'
import ProptTypes from 'prop-types'
import map from 'lodash/map'

class Select extends PureComponent {

  renderOptions = ({ name, path }) => {
    return (
      <option key={name} value={path} >{name}</option>
    )
  }

  render() {
    const { options, handlerOnChange } = this.props
    return (
      <select
        onChange={event => handlerOnChange(event.target.value)}
      >
        <option value="" default>Select category</option>
        {map(options, option => this.renderOptions(option))}
      </select>
    )
  }
}

Select.propTypes = {
  options: ProptTypes.array.isRequired,
  handlerOnChange: ProptTypes.func.isRequired
}

export default Select
