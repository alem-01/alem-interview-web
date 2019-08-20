const prod = {
	url: {
		REDIRECT_URI: "https://interview.alem.school/code",
		GATE_BASE: "https://email-trigger.alem.school",
		API_BASE: "https://api.github.com",
		CLIENT_ID: "208397fc442d1ed91769",
		HASURA_URI: 'wss://hasura-interview.alem.school/v1/graphql',
	},
}

const dev = {
	url: {
		REDIRECT_URI: "http://localhost:3000/code",
		GATE_BASE: "https://email-trigger.alem.school",
		API_BASE: "https://api.github.com",
		CLIENT_ID: "208397fc442d1ed91769",
		HASURA_URI: 'wss://hasura-interview.alem.school/v1/graphql',
	},
	time: (6 * 60 * 60 * 1000),
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;