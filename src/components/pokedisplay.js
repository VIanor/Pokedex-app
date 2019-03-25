import React from 'react'
import { observer } from 'mobx-react'

const PokeDisplay = observer(
	class PokeDisplay extends React.Component {
		render() {

			const { data_display } = this.props.store

			if(data_display.state === "fulfilled") {
				
				const name = data_display.value.species.name

				const abilities = data_display.value.abilities.map((item, index) => (
					<li value={item.ability.url} key={index}>{item.ability.name}</li>
				))

				const weight = data_display.value.weight

				const height = data_display.value.height

				const avatar1 = <img src={data_display.value.sprites.front_default} alt="" />

				const avatar2 = <img src={data_display.value.sprites.front_female} alt="" />

				console.log(data_display.value.sprites.front_default)

				return <div className="disp">
					<div className="infobox">
						<p>Name: {name}</p>
						<p>Abilities:</p>
						<ul>{abilities}</ul>
						<p>Height: {height}</p>
						<p>Weight: {weight}</p>
						{avatar1}
						{avatar2}
					</div>
				</div>
			}
			return <div className="disp"><div className="infobox">sex and hunger rule the world!</div></div>
		}
})

export default PokeDisplay