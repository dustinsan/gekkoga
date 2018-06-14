const randomExt = require('random-ext');

const config = {
	stratName: 'TMA',
	gekkoConfig: {
		watch: {
			exchange: 'poloniex',
			currency: 'USDT',
			asset: 'XMR',
		},

		daterange: 'scan',

		// daterange: {
		//  from: '2018-02-25 00:00',
		//  to: '2018-05-24 00:00'
		// },

		simulationBalance: {
			'asset': 1,
			'currency': 1
		},

		slippage: 0.05,
		feeTaker: 0.25,
		feeMaker: 0.15,
		feeUsing: 'taker', // maker || taker

	},
	apiUrl: 'http://localhost:3000',

	// Population size, better reduce this for larger data
	populationAmt: 20,

	// How many completely new units will be added to the population (populationAmt * variation must be a whole number!!)
	variation: 0.5,

	// How many components maximum to mutate at once
	mutateElements: 7,

	// How many parallel queries to run at once
	parallelqueries: 5,

	// profit || score
	// score = ideas? feedback?
	// profit = recommended!
	mainObjective: 'profit',

	// optionally recieve and archive new all time high every new all time high
	notifications: {
		email: {
			enabled: false,
			receiver: 'destination@some.com',
			senderservice: 'gmail',
			sender: 'origin@gmail.com',
			senderpass: 'password',
		},
	},

	// candleValues: [5,10,15,30,60,120,240],
	getProperties: () => ({

		historySize: randomExt.integer(100, 20),
		candleSize: randomExt.integer(960, 1),

		short: randomExt.integer(50,1),
		medium: randomExt.integer(75, 25),
		long: randomExt.integer(100,50),

		thresholds: {
			low: randomExt.float(20,-50).toFixed(2),
			high: randomExt.float(100,-20).toFixed(2),
			persistence: randomExt.integer(9,0),
		},
	})
};

module.exports = config;