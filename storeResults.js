const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'crypto',
	database: 'backtests',
});

connection.connect();

let insertData = (results, data) => {
	insertStrategy(results, data)
		.then(ids => insertAsset(results, data, ids))
		.then(ids => insertCurrency(results, data, ids))
		.then(ids => insertAssetCurrencyJunction(results, data, ids))
		.then(ids => insertRun(results, data, ids))
		.then(ids => insertParams(results, data, ids))
		.then(ids => insertTrades(results, data, ids))
		.catch(err => {
			console.log('error!');
			console.error(err);
			process.exit();
		});
}

let insertStrategy = (results, data, ids = {}) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO strategies (name) VALUES (?)`,
			[data.strategy],
			(err, results) => {
				if (!err) resolve({
					...ids,
					strategy_id: results.insertId
				});
				else {
					connection.query(
						`SELECT strategy_id FROM strategies WHERE name=?`,
						[data.strategy],
						(err, results) => {
							if (err) reject(err);
							resolve({
								...ids,
								strategy_id: results[0].strategy_id,
							});
						}
					);
				}
			}
		);
	});
}

let insertAsset = (results, data, ids = {}) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO assets (name) VALUES (?)`,
			[data.asset],
			(err, results) => {
				if (!err) resolve({
					...ids,
					asset_id: results.insertId
				});
				else {
					connection.query(
						`SELECT asset_id FROM assets WHERE name=?`,
						[data.asset],
						(err, results) => {
							if (err) reject(err);
							resolve({
								...ids,
								asset_id: results[0].asset_id,
							});
						}
					);
				}
			}
		);
	});
}

let insertCurrency = (results, data, ids = {}) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO currencies (name) VALUES (?)`,
			[data.currency],
			(err, results) => {
				if (!err) resolve({
					...ids,
					currency_id: results.insertId
				});
				else {
					connection.query(
						`SELECT currency_id FROM currencies WHERE name=?`,
						[data.currency],
						(err, results) => {
							if (err) reject(err);
							resolve({
								...ids,
								currency_id: results[0].currency_id,
							});
						}
					);
				}
			}
		);
	});
}

let insertAssetCurrencyJunction = (results, data, ids = {}) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT IGNORE INTO assets_currencies (asset_id, currency_id) VALUES (?, ?)`,
			[ids.asset_id, ids.currency_id],
			(err, results) => err ? reject(err) : resolve(ids)
		);
	});
}

let insertRun = (results, data, ids = {}) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO runs (strategy_id, asset_id, currency_id, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
			[
				ids.strategy_id,
				ids.asset_id,
				ids.currency_id,
				results.startTime,
				results.endTime
			],
			(err, results) => {
				if (!err) {
					resolve({
						...ids,
						run_id: results.insertId,
					});
				} else reject(err);
			}
		);
	});
}

let insertParams = (results, data, ids = {}) => {
	let custom = {...results.config};
	delete custom.historySize;
	delete custom.candleSize;

	Object.keys(custom).forEach(key => {
		if (custom[key] == parseInt(custom[key])) {
			custom[key] = parseInt(custom[key]);
		}
	});

	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO run_params (run_id, history_size, candle_size, custom_params) VALUES (?, ?, ?, ?)`,
			[
				ids.run_id,
				results.config.historySize,
				results.config.candleSize,
				JSON.stringify(custom),
			],
			(err, results) => err ? reject(err) : resolve(ids)
		);
	});
}

let insertTrades = (results, data, ids = {}) => {
	return new Promise((resolve, reject) => {
		if (results.trades.length) {

			let insert = `INSERT INTO trades (run_id, type_id, price, balance, time) VALUES `;
			let values = [];

			results.trades.forEach((trade, i) => {
				let date = new Date(trade.date).toISOString().substr(0, 19).replace('T', ' ');
				// insert += `(?, ?, ?, ?, ?)`;
				insert += `(${ids.run_id}, ${trade.action.toLowerCase == 'buy' ? 1 : 2}, ${trade.price}, ${trade.balance}, '${date}')`;
				// values.concat([
				// 	ids.run_id,
				// 	trade.action.toLowerCase == 'buy' ? 1 : 2,
				// 	trade.price,
				// 	trade.balance,
				// 	date
				// ]);

				if (i != results.trades.length - 1) insert += ', ';
			});

			// insert += ')';
			connection.query(insert, values, (err, results) => {
				if (err) reject(err);
					// console.log(err);
					// process.exit();
				resolve(ids);
			});
		}
	});
}

module.exports = function(resultsSet, data) {
	resultsSet.forEach(results => insertData(results, data));
}