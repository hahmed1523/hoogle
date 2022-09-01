
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
    }
        

    activeRoute() {
        const path = window.location.pathname.substring(1);
        const component = this.routes[path];
        return component;
    }


    render() {
        this.node.innerHTML = "";
        let component = this.activeRoute();
        if (component){
            let content = component.render();
            this.node.appendChild(content);
        }
    }


};

module.exports = Router;