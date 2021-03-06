/* Magic Mirror
 * Module: MMM-WWI
 * Weather Without Icons
 * By Mykle1 - [Powered by Dark Sky](https://darksky.net/poweredby/)
 * MIT Licensed
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getWWI: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
				var result = JSON.parse(body);
			//		console.log(response.statusCode); // for checking
                    this.sendSocketNotification('WWI_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_WWI') {
            this.getWWI(payload);
        }
    }
});
