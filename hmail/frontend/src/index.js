const Router = require('./router');
const routes = require('./routes');

// const showSection = section => {
//     fetch(`/api/${section}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// };

document.addEventListener("DOMContentLoaded", () => {

       
    // // Iterate over nav items and add listener. 
    // document.querySelectorAll('#sidenav > li').forEach(li => {
    //     li.onclick = function() {
    //         const section = this.id;
    //         history.pushState({section: section}, "", `${section}`);
    //         showSection(section);
    //     }
    // });

    // Change path to inbox
    window.history.pushState({section: 'inbox'}, "", `inbox`);

    // Get content and pass it to router and then start it
    let content = document.querySelector('#content');
    let router = new Router(content, routes);
    router.start();

    // // Add back button functionality
    // window.onpopstate = function(event) {
    //     if (history.state){
    //         showSection(event.state.section);
    //     }
        
    // }

    // if (window.performance.getEntries('navigation')[0].type ==='reload'){
    //     showSection(window.location.pathname.substring(1));
    // }


});

