const randomExt = require('random-ext');

const config = {
	stratName: 'MACD',
	gekkoConfig: {
		watch: {
			exchange: /*binance, poloniex, etc*/'poloniex',
			currency: /*BTC,ETH,USDT, etc*/  'USDT',
			asset: /*XRP,ADA,LTC, etc*/ 'BTC'
		},

//    daterange: 'scan',

		daterange: {
			from: '2018-01-01 00:00',
			to: '2018-02-01 00:00'
		},

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

	candleValues: [5,10,15,30,60,120,240],
	getProperties: () => ({

		historySize: randomExt.integer(100, 20),

		short: randomExt.integer(15,5),
		long: randomExt.integer(40,15),
		signal: randomExt.integer(12,6),

		thresholds: {
			up: randomExt.float(20,0).toFixed(2),
			down: randomExt.float(0,-20).toFixed(2),
			persistence: randomExt.integer(9,0),
		},

		candleSize: randomExt.pick(config.candleValues)
	})
};

module.exports = config;