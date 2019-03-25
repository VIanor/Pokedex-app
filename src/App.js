import React from 'react'

import store from './components/pokestore'

import './App.css';

import Header from './components/pokeheader'
import Filter from './components/pokefilter'
import List from './components/pokelist'
import Display from './components/pokedisplay'

export default class App extends React.Component {
	render() {
		return( 
			<div>
				<Header />
				<Filter store={store} />
				<div className="menu">
					<List store={store} />
					<Display store={store} />
				</div>
				
			</div>
		);		
	}
}
