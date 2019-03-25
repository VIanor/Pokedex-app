import React from 'react'
import { observer } from 'mobx-react'

const PokeList = observer (
	class PokeList extends React.Component {

		take_url = e => {
			this.props.store.pokemon_url = e.target.id
		}
  	
	  	render() {

	  		const {data, isTypeSelected, filter, listOptions, filteredPokemons} = this.props.store
	  		var list = <div></div>

	  		if(data.state === "fulfilled") {
	  			if(!isTypeSelected && !filter) {
			     	list = data.value.results.map((item, index) => (
						<p onClick={this.take_url} id={item.url} key={index}>{item.name}</p>
					))
				}

				else if(!isTypeSelected && filter) {
					list = filteredPokemons(filter, data).map((item, index) => (
						<p onClick={this.take_url} id={item.url} key={index}>{item.name}</p>
					))
				}

				else {
					list = data.value.pokemon.map((item, index) => (
						<p onClick={this.take_url} id={item.pokemon.url} key={index}>{item.pokemon.name}</p>
					))
				}
			}
	  		return <div className="list">
	  			<div className="pokemons">
	  				{list}
	  			</div>
	  			<div className="buttons">
	  				<button onClick={e => listOptions(-1, 0)}>previous</button>
	  				<button onClick={e => listOptions(1, 0)}>next</button>
	  				<br/>
	  				<button onClick={e => listOptions(0, 10)}>10</button>
	  				<button onClick={e => listOptions(0, 20)}>20</button>
	  				<button onClick={e => listOptions(0, 50)}>50</button>
	  			</div>
	  		</div>
	  	}
	}
)


export default PokeList