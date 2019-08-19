import React, { Component } from 'react';
import './loading.css'

export default class Loading extends Component {
	render() {
		const st = {
			width: "100%",
			height: "100%"
		}
		return (
			<div className="lds-css ng-scope load">
				<div style={st} className="lds-flickr">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<style type="text/css">

				</style>
			</div>
		)
	}
}
