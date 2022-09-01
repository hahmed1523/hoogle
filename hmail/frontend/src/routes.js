const Inbox = require('./inbox');
const Sent = require('./sent');
const Compose = require('./compose');

const routes = {
    inbox: Inbox,
    sent: Sent,
    compose: Compose
};

module.exports = routes;