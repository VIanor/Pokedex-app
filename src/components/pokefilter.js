import React from 'react'
import { observer } from 'mobx-react'

const PokeFilter = observer(props => {
  if (props.state.data_types.state === 'fulfilled') {
    const types_list = props.state.data_types.value.results.map(
      (item, index) => (
        <option value={item.url} key={index} id={index}>
          {item.name}
        </option>
      )
    )
    return (
      <div className='filter'>
        <input
          value={props.state.filter}
          placeholder='Search'
          onChange={e => props.filter_handle(e)}
        />
        Type:
        <select onChange={e => props.select_type(e)}>
          <option value='https://pokeapi.co/api/v2/pokemon' id={50}>
            all
          </option>
          {types_list}
        </select>
      </div>
    )
  }
  return null
})

export default PokeFilter
