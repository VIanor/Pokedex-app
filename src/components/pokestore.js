import { observable, action, computed, decorate } from 'mobx'
import { fromPromise } from 'mobx-utils'

class PokeStore {
	pokemons_list
	filter = ""
	type_url = "https://pokeapi.co/api/v2/pokemon"
	pokemon_url
	isTypeSelected = false

	getJson = async (url) => {
		const api_url = await fetch(`${url}`)
		const data = await api_url.json()
		return data
	}

	get data() {
		return fromPromise(this.getJson(this.type_url))
	}

	get data_display() {
		return fromPromise(this.getJson(this.pokemon_url))
	}

	data_types = fromPromise(this.getJson("https://pokeapi.co/api/v2/type"))
	

	setList(list) {
		this.pokemons_list = list
	}

	setTypeUrl(type) {
		this.type_url = type
	}

	filteredPokemons(fil, dat) {
		const filterate = new RegExp(fil, "i")
		return dat.value.results.filter(item => !fil || filterate.test(item.name))
	}

	limit = 10
	offset = 0

	listOptions = (move, count) => {
		if(!this.isTypeSelected) { // this condition block the bug
			if (count > 0) 
			  this.limit = count
			if (move === 1) 
			  this.offset += this.limit
			if (move === -1) 
			  this.offset -= this.limit
			if (this.offset < 0)
			  this.offset = 0
			this.setTypeUrl(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
		}
	}
}

decorate(PokeStore, {
	pokemons_list: observable,
	filter: observable,
	type_url: observable,
	pokemon_url: observable,
	isTypeSelected: observable,
	data: computed,
	data_display: computed,
	data_types: observable,
	setList: action,
	setTypeUrl: action
})

const store = new PokeStore
export default store