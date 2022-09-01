const Inbox = require('./inbox');
const Sent = require('./sent');

const routes = {
    inbox: Inbox,
    sent: Sent
};

module.exports = routes;