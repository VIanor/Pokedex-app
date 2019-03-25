import React from 'react'
import { observer } from 'mobx-react'

const PokeFilter = observer(
	class PokeFilter extends React.Component {

		select_type = e => {
			var key = e.target[e.target.selectedIndex].getAttribute('id')
			if(key == 50) {
				this.props.store.isTypeSelected = false
			} else {
				this.props.store.isTypeSelected = true
			}
			this.props.store.setTypeUrl(e.target.value) 
		}

		filter_handle = e => { // searching is almost ready
			this.props.store.filter = e.target.value
			if(this.props.store.filter) {
				if(!this.props.store.isTypeSelected) {
					this.props.store.setTypeUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=964")
				}
			} else {
				if(!this.props.store.isTypeSelected) {
					this.props.store.setTypeUrl("https://pokeapi.co/api/v2/pokemon")
				}
			}	
		}

		render() {

			var { filter, data_types } = this.props.store

			if(data_types.state === "fulfilled") {
				const types_list = data_types.value.results.map((item, index) => (
					<option value={item.url} key={index} id={index}>{item.name}</option>
				))
				return( 
					<div className="filter">
						<input value={filter} placeholder="Search" onChange={this.filter_handle.bind(this)}/>
						Type:
						<select onChange={this.select_type.bind(this)}>
							<option value="https://pokeapi.co/api/v2/pokemon" id={50}>all</option>
							{types_list}
						</select>
					</div>
				)
			}

			return null
		}
	}
)

export default PokeFilter