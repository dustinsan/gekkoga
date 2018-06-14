const randomExt = require('random-ext');

const config = {
    stratName: 'StochRSI',
    gekkoConfig: {
        watch: {
            exchange: 'poloniex',
            currency: 'USDT',
            asset: 'XMR',
        },

        daterange: 'scan',

        // daterange: {
        //  from: '2018-02-24 15:04:00',
        //  to: '2018-03-01 14:04:00'
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
            receiver: '8287859387@tmomail.net',
            senderservice: 'gmail',
            sender: 'dmanke@gmail.com',
            senderpass: 'password',
        },
    },

    candleValues: [5,10,15,30,60,120,240],
    getProperties: () => ({

        historySize: randomExt.integer(100, 20),
        candleSize: randomExt.integer(960, 1), //randomExt.pick(config.candleValues)

        // short: randomExt.integer(15,5),
        // long: randomExt.integer(40,15),
        // signal: randomExt.integer(12,6),
        interval: randomExt.integer(32,1),

        thresholds: {
            // up: randomExt.float(20,0).toFixed(2),
            // down: randomExt.float(0,-20).toFixed(2),
            low: randomExt.integer(99, 1),
            high: randomExt.integer(99, 1),
            persistence: randomExt.integer(20, 0),
        },

        // candleSize: 15,
    })
};

module.exports = config;