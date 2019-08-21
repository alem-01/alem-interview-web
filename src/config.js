const prod = {
	url: {
		REDIRECT_URI: "https://interview.alem.school/code",
		GATE_BASE: "https://email-trigger.alem.school",
		CLIENT_ID: "208397fc442d1ed91769",
		HASURA_URI: 'wss://hasura-interview.alem.school/v1/graphql',
		LOGOUT: "https://interview.alem.school/",
	},
}

const dev = {
	url: {
		REDIRECT_URI: "http://localhost:3000/code",
		GATE_BASE: "https://email-trigger.alem.school",
		CLIENT_ID: "208397fc442d1ed91769",
		HASURA_URI: 'wss://hasura-interview.alem.school/v1/graphql',
		LOGOUT: "http://localhost:3000/",
	},
	time: (2 * 60 * 60 * 1000),
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;