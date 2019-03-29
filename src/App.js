import React from 'react'
import { fromPromise } from 'mobx-utils'
import { useObservable } from 'mobx-react-lite'

import './App.scss'

import Header from './components/pokeheader'
import Filter from './components/pokefilter'
import List from './components/pokelist'
import Disp from './components/pokedisplay'

export default function pokeStore () {
  const getJson = async url => {
    const api_url = await fetch(`${url}`)
    const data = await api_url.json()
    return data
  }

  const state = useObservable({
    type_url: 'https://pokeapi.co/api/v2/pokemon',
    filter: '',
    data: fromPromise(getJson('https://pokeapi.co/api/v2/pokemon')),
    data_types: fromPromise(getJson('https://pokeapi.co/api/v2/type')),
    data_display: fromPromise(getJson(undefined)),
    pokemons_list: undefined,
    pokemon_url: undefined,
    isTypeSelected: false
  })

  function setData (type) {
    state.data = fromPromise(getJson(type))
  }

  function filteredPokemons (fil, dat) {
    var filterate = new RegExp(fil, 'i')
    return dat.value.results.filter(item => !fil || filterate.test(item.name))
  }

  var limit = 10
  var offset = 0
  function listOptions (move, count) {
    if (!state.isTypeSelected) {
      if (count > 0) limit = count
      if (move === 1) offset += limit
      if (move === -1) offset -= limit
      if (offset < 0) offset = 0

      setData(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      )
    }
  }

  var filter_handle = e => {
    state.filter = e.target.value
    if (state.filter) {
      if (!state.isTypeSelected) {
        setData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=964')
      }
    } else {
      if (!state.isTypeSelected) {
        setData('https://pokeapi.co/api/v2/pokemon')
      }
    }
  }

  const select_type = e => {
    var key = e.target[e.target.selectedIndex].getAttribute('id')
    if (key == 50) {
      state.isTypeSelected = false
    } else {
      state.isTypeSelected = true
    }

    state.data = fromPromise(getJson(e.target.value))
  }

  const take_url = e => {
    state.data_display = fromPromise(getJson(e.target.id))
  }

  return (
    <div>
      <Header />
      <Filter
        state={state}
        select_type={select_type}
        filter_handle={filter_handle}
      />
      <div className='menu'>
        <List
          state={state}
          listOptions={listOptions}
          take_url={take_url}
          filteredPokemons={filteredPokemons}
        />
        <Disp state={state} />
      </div>
    </div>
  )
}
