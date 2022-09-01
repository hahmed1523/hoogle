const Sent = {

    async getMessages(container) {
        const res = await fetch(`/api/sent`);
        const data = await res.json();
        this.handleData(data, container);

    },

    handleData (data, container) {
        data.forEach(message => {
            let li = this.renderMessage(message);
            container.appendChild(li);
        });
    },

    renderMessage(message) {
        let li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = `<span class='from'>${message.fields.to}</span> <span class='subject'>${message.fields.subject}</span> <span class='body'>${message.fields.body}</span>`;
        return li;
    },

    render () {
        let ul = document.createElement('ul');
        ul.className = 'messages';

        // fetch messages and attach them to the ul
        this.getMessages(ul);

        return ul;
    }
}

module.exports = Sent;