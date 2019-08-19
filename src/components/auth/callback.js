import React, { Component } from "react";
import loading from "./loading.svg";
import './callback.css';
import Loading from "../loading";

class Callback extends Component {
	render() {
		return (
			<div className="wrapper-loading">
				<Loading />
			</div>
		);
	}
}

export default Callback;
