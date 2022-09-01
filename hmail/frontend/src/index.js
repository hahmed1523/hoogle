const Router = require('./router');
const routes = require('./routes');

document.addEventListener("DOMContentLoaded", () => {

    // Change path to inbox unless there is a reload
    if (window.performance.getEntries('navigation')[0].type != 'reload'){
        window.history.pushState({section: 'inbox'}, "", `inbox`);
    }
    

    // Get content and pass it to router and then start it
    let content = document.querySelector('#content');
    let router = new Router(content, routes);
    router.start();
});


