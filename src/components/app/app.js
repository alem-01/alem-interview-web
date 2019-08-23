import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';
import './app.css'
import Interviews from '../interviews';
import Footer from '../footer';
import { config } from '../../config';
import Filter from '../filter';
import Info from '../info';

const hasuraUri = config.url.HASURA_URI;

export default class App extends Component {

	state = {
		filterStatus: 'all',
	}

	createApolloClient = (authToken) => {
		return new ApolloClient({

			link: new WebSocketLink({
				uri: hasuraUri,
				options: {
					reconnect: true,
					lazy: true,
					timeout: 100000,
					connectionParams: {
						headers: {
							Authorization: `Bearer ${authToken}`,
						}
					},
				}
			}),
			cache: new InMemoryCache(),
		});
	};

	updateFilterStatus = (newStatus) => {
		this.setState({
			filterStatus: newStatus,
		})
	}

	render() {
		const jwt_token = localStorage.getItem('jwt')
		const client = this.createApolloClient(jwt_token)
		return (
			<ApolloProvider client={client}>
				<div className="container bo">
					<Info logout={this.props.auth.logout} />
					<Filter updateFilterStatus={this.updateFilterStatus} filterStatus={this.state.filterStatus} />
					<Interviews filterStatus={this.state.filterStatus} />
				</div>
				<Footer />
			</ApolloProvider>
		)
	}
}