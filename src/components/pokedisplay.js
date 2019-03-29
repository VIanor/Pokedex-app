import React from 'react'
import { observer } from 'mobx-react'

const PokeDisplay = observer(props => {
  if (props.state.data_display.state === 'fulfilled') {
    const name = props.state.data_display.value.species.name

    const abilities = props.state.data_display.value.abilities.map(
      (item, index) => (
        <li value={item.ability.url} key={index}>
          {item.ability.name}
        </li>
      )
    )

    const weight = props.state.data_display.value.weight
    const height = props.state.data_display.value.height
    const avatar1 = (
      <img src={props.state.data_display.value.sprites.front_default} alt='' />
    )
    const avatar2 = (
      <img src={props.state.data_display.value.sprites.front_female} alt='' />
    )

    return (
      <div className='disp'>
        <div className='infobox'>
          <p>Name: {name}</p>
          <p>Abilities:</p>
          <ul>{abilities}</ul>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          {avatar1}
          {avatar2}
        </div>
      </div>
    )
  }
  return (
    <div className='disp'>
      <div className='infobox'>
        <div className='placehold'>sex and hunger rule the world!</div>
      </div>
    </div>
  )
})

export default PokeDisplay
