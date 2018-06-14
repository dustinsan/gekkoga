const randomExt = require('random-ext');

let historySize = randomExt.integer(100, 20);

const config = {
    stratName: 'CCI',
    gekkoConfig: {
        watch: {
            exchange: 'poloniex',
            currency: 'USDT',
            asset: 'DASH',
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
    populationAmt: 5,

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

        constant: randomExt.float(0, 0.2), // 0.015,
        historySize: historySize,
        history: historySize - randomExt.integer(historySize, 19),
        candleSize: randomExt.integer(960, 1),

        // short: randomExt.integer(50,1),
        // long: randomExt.integer(100,1),
        // signal: randomExt.integer(20,1),

        thresholds: {
            up: randomExt.float(100, 0).toFixed(2),
            down: randomExt.float(0, -100).toFixed(2),
            persistence: randomExt.integer(9,0),
        },

    })
};

// # constant multiplier. 0.015 gets to around 70% fit
// constant = 0.015

// # history size, make same or smaller than history
// history = 90

// [thresholds]
// up = 100
// down = -100
// persistence = 0

module.exports = config;