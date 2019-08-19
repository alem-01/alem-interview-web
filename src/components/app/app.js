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

	// loginAndGetData = async (code) => {
	//     await this.githubService.getToken(code);
	//     const user = await this.githubService.getUser();
	//     this.setState({
	//         data: user,
	//     })
	// }

	createApolloClient = (authToken) => {


		return new ApolloClient({

			link: new WebSocketLink({
				uri: 'wss://hasura-interview.alem.school/v1/graphql',
				// uri: 'https://hasura-interview.alem.school/v1/graphql',
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

	componentDidMount() {
		// const url = new URL(window.location.href);
		// const code = url.searchParams.get("code")
		// if (code) {
		// this.loginAndGetData(code);
		// }

		// this.githubService.getUser()
		// 	.then((data) => {
		// 		this.setState({
		// 			data: data,
		// 		})
		// 	})
	}

	render() {
		// const { data: { avatar_url, bio, login } } = this.state;
		const jwt_token = localStorage.getItem('jwt')
		// console.log(jwt_token);
		const client = this.createApolloClient(jwt_token)
		return (
			<ApolloProvider client={client}>
				<div className="container bo">
					<Interviews />
				</div>
				<Footer />
			</ApolloProvider>
		)
	}
}

/*

app
	current interview (exist?)
		mutation => (if date - 12 > now)
			interview

	interview header
		interview

	interview list
		mutation => (if date > now, registered = false)
			subscrition interview

*/