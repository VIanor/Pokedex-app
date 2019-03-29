import React from 'react'
import { observer } from 'mobx-react'

const PokeList = observer(props => {
  var list = <div />

  if (props.state.data.state === 'fulfilled') {
    if (!props.state.isTypeSelected && !props.state.filter) {
      list = props.state.data.value.results.map((item, index) => (
        <p onClick={e => props.take_url(e)} id={item.url} key={index}>
          {item.name}
        </p>
      ))
    } else if (!props.state.isTypeSelected && props.state.filter) {
      list = props
        .filteredPokemons(props.state.filter, props.state.data)
        .map((item, index) => (
          <p onClick={e => props.take_url(e)} id={item.url} key={index}>
            {item.name}
          </p>
        ))
    } else {
      list = props.state.data.value.pokemon.map((item, index) => (
        <p onClick={e => props.take_url(e)} id={item.pokemon.url} key={index}>
          {item.pokemon.name}
        </p>
      ))
    }
  }

  return (
    <div className='list'>
      <div className='pokemons'>{list}</div>
      <div className='buttons'>
        <button onClick={e => props.listOptions(-1, 0)}>previous</button>
        <button onClick={e => props.listOptions(1, 0)}>next</button>
        <br />
        <button onClick={e => props.listOptions(0, 10)}>10</button>
        <button onClick={e => props.listOptions(0, 20)}>20</button>
        <button onClick={e => props.listOptions(0, 50)}>50</button>
      </div>
    </div>
  )
})

export default PokeList
