/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MessageStore = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\");\n\nconst Compose = {\n\n    renderForm() {\n        let currentMessage = MessageStore.getMessageDraft();\n        let html = `\n        <p class=\"new-message-header\">New Message</p>\n        <form class=\"compose-form\">\n        <input\n            placeholder='Recipient'\n            name='to'\n            type=\"text\"\n            value='${currentMessage.to}'>\n\n        <input\n            placeholder='Subject'\n            name='subject'\n            type=\"text\"\n            value=\"${currentMessage.subject}\">\n\n        <textarea\n            name='body'\n            rows='20'>${currentMessage.body}</textarea>\n            \n        <button type=\"submit\" class=\"submit-btn\">Send</button>\n        </form>\n        `\n        return html;\n    },\n\n    render() {\n        let container = document.createElement(\"div\");\n        container.className = \"new-message\";\n        container.innerHTML = this.renderForm();\n        container.addEventListener('change', e => {\n            let target = e.target;\n            MessageStore.updateDraftField(target.name, target.value);\n        });\n\n        container.addEventListener('submit', e => {\n            e.preventDefault();\n            MessageStore.sendDraft();\n            history.pushState({section: 'inbox'}, \"\", 'inbox');\n        });\n\n        return container;\n    }\n}\n\nmodule.exports = Compose;\n\n//# sourceURL=webpack://frontend/./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((module) => {

eval("const Inbox = {\n\n    async getMessages(container) {\n        const res = await fetch(`/api/inbox`);\n        const data = await res.json();\n        this.handleData(data, container);\n\n    },\n\n    handleData (data, container) {\n        data.forEach(message => {\n            let li = this.renderMessage(message);\n            container.appendChild(li);\n        });\n    },\n\n    renderMessage(message) {\n        let li = document.createElement('li');\n        li.className = 'message';\n        li.innerHTML = `<span class='from'>${message.fields.from_address}</span> <span class='subject'>${message.fields.subject}</span> <span class='body'>${message.fields.body}</span>`;\n        return li;\n    },\n\n    render () {\n        let ul = document.createElement('ul');\n        ul.className = 'messages';\n\n        // fetch messages and attach them to the ul\n        this.getMessages(ul);\n\n        return ul;\n    }\n}\n\nmodule.exports = Inbox;\n\n//# sourceURL=webpack://frontend/./src/inbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Router = __webpack_require__(/*! ./router */ \"./src/router.js\");\nconst routes = __webpack_require__(/*! ./routes */ \"./src/routes.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    // Change path to inbox unless there is a reload\n    if (window.performance.getEntries('navigation')[0].type != 'reload'){\n        window.history.pushState({section: 'inbox'}, \"\", `inbox`);\n    }\n    \n\n    // Get content and pass it to router and then start it\n    let content = document.querySelector('#content');\n    let router = new Router(content, routes);\n    router.start();\n});\n\n\n\n\n//# sourceURL=webpack://frontend/./src/index.js?");

/***/ }),

/***/ "./src/message_store.js":
/*!******************************!*\
  !*** ./src/message_store.js ***!
  \******************************/
/***/ ((module) => {

eval("const user = \"test@test.com\"\n\nclass Message {\n    constructor(from=user, to=\"\", subject=\"\", body=\"\"){\n        this.from = from;\n        this.to = to;\n        this.subject = subject;\n        this.body = body;\n    }\n};\n\nlet messageDraft = new Message();\n\nconst MessageStore = {\n    getMessageDraft() {\n        return messageDraft;\n    },\n\n    updateDraftField(field, value) {\n        messageDraft[field] = value;\n    },\n\n    sendDraft() {\n        console.log('sending...');\n        messageDraft = new Message();\n    }\n}\n\nmodule.exports = MessageStore;\n\n//# sourceURL=webpack://frontend/./src/message_store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((module) => {

eval("\nclass Router {\n    constructor(node, routes){\n        this.node = node;\n        this.routes = routes;\n    }\n\n    start() {\n        const router = this;\n        router.render();\n\n        // Iterate over nav items and add listener. Add listener to compose button as well.\n        document.querySelectorAll('#sidenav > li').forEach(li => {\n            li.onclick = function() {\n                const section = this.id;\n                history.pushState({section: section}, \"\", `${section}`);\n                router.render();\n        }});\n\n        document.querySelector('#compose').onclick = function() {\n            const section = this.id;\n            history.pushState({section: section}, \"\", `${section}`);\n            router.render();\n        }\n    \n        // Add back button functionality\n        window.onpopstate = function(event) {\n            if (history.state){\n                const component = router.routes[event.state.section];\n                router.render(component);\n            }   \n        }\n    }\n        \n\n    activeRoute() {\n        const path = window.location.pathname.substring(1);\n        const component = this.routes[path];\n        return component;\n    }\n\n\n    render(comp = null) {\n        this.node.innerHTML = \"\";\n        let component = comp || this.activeRoute();\n        if (component){\n            let content = component.render();\n            this.node.appendChild(content);\n        }\n    }\n\n\n};\n\nmodule.exports = Router;\n\n//# sourceURL=webpack://frontend/./src/router.js?");

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Inbox = __webpack_require__(/*! ./inbox */ \"./src/inbox.js\");\nconst Sent = __webpack_require__(/*! ./sent */ \"./src/sent.js\");\nconst Compose = __webpack_require__(/*! ./compose */ \"./src/compose.js\");\n\nconst routes = {\n    inbox: Inbox,\n    sent: Sent,\n    compose: Compose\n};\n\nmodule.exports = routes;\n\n//# sourceURL=webpack://frontend/./src/routes.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/***/ ((module) => {

eval("const Sent = {\n\n    async getMessages(container) {\n        const res = await fetch(`/api/sent`);\n        const data = await res.json();\n        this.handleData(data, container);\n\n    },\n\n    handleData (data, container) {\n        data.forEach(message => {\n            let li = this.renderMessage(message);\n            container.appendChild(li);\n        });\n    },\n\n    renderMessage(message) {\n        let li = document.createElement('li');\n        li.className = 'message';\n        li.innerHTML = `<span class='from'>${message.fields.to}</span> <span class='subject'>${message.fields.subject}</span> <span class='body'>${message.fields.body}</span>`;\n        return li;\n    },\n\n    render () {\n        let ul = document.createElement('ul');\n        ul.className = 'messages';\n\n        // fetch messages and attach them to the ul\n        this.getMessages(ul);\n\n        return ul;\n    }\n}\n\nmodule.exports = Sent;\n\n//# sourceURL=webpack://frontend/./src/sent.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;