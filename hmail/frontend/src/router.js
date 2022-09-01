
class Router {
    constructor(node, routes){
        this.node = node;
        this.routes = routes;
    }

    start() {
        const router = this;
        router.render();

        // Iterate over nav items and add listener. 
        document.querySelectorAll('#sidenav > li').forEach(li => {
            li.onclick = function() {
                const section = this.id;
                history.pushState({section: section}, "", `${section}`);
                router.render();
        }});
    
        // Add back button functionality
        window.onpopstate = function(event) {
            if (history.state){
                const component = router.routes[event.state.section];
                router.render(component);
            }   
        }

        // Add reload button functionality
        // let current_path = window.location.pathname.substring(1);
        // console.log(current_path);
        // if (window.performance.getEntries('navigation')[0].type ==='reload'){
        //     console.log("hello");
        //     debugger
        //     console.log(window.location.pathname.substring(1));
        //     const component = this.activeRoute();
        //     router.render(component);
        // }
    }
        

    activeRoute() {
        const path = window.location.pathname.substring(1);
        const component = this.routes[path];
        return component;
    }


    render(comp = null) {
        this.node.innerHTML = "";
        let component = comp || this.activeRoute();
        if (component){
            let content = component.render();
            this.node.appendChild(content);
        }
    }


};

module.exports = Router;