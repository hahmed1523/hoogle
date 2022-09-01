const MessageStore = require('./message_store');

const Compose = {

    renderForm() {
        let currentMessage = MessageStore.getMessageDraft();
        let html = `
        <p class="new-message-header">New Message</p>
        <form class="compose-form">
        <input
            placeholder='Recipient'
            name='to'
            type="text"
            value='${currentMessage.to}'>

        <input
            placeholder='Subject'
            name='subject'
            type="text"
            value="${currentMessage.subject}">

        <textarea
            name='body'
            rows='20'>${currentMessage.body}</textarea>
            
        <button type="submit" class="submit-btn">Send</button>
        </form>
        `
        return html;
    },

    render(router=null) {
        let container = document.createElement("div");
        container.className = "new-message";
        container.innerHTML = this.renderForm();
        container.addEventListener('change', e => {
            let target = e.target;
            MessageStore.updateDraftField(target.name, target.value);
        });

        container.addEventListener('submit', e => {
            e.preventDefault();
            MessageStore.sendDraft();
            history.pushState({section: 'inbox'}, "", 'inbox');
            router.render();
        });

        return container;
    }
}

module.exports = Compose;