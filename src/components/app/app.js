import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';
import './app.css'
import Interviews from '../interviews';
import Footer from '../footer';

export default class App extends Component {

	state = {
		data: {},
	}

	createApolloClient = (authToken) => {
		return new ApolloClient({

			link: new WebSocketLink({
				uri: 'wss://hasura-interview.alem.school/v1/graphql',
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

	render() {
		const jwt_token = localStorage.getItem('jwt')
		const client = this.createApolloClient(jwt_token)
		return (
			<ApolloProvider client={client}>
				<div className="container bo">
					<Interviews logout={this.props.auth.logout} />
				</div>
				<Footer />
			</ApolloProvider>
		)
	}
}