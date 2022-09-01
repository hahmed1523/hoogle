const user = "test@test.com"

class Message {
    constructor(from=user, to="", subject="", body=""){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
    }
};

let messageDraft = new Message();

const MessageStore = {
    getMessageDraft() {
        return messageDraft;
    },

    updateDraftField(field, value) {
        messageDraft[field] = value;
    },

    getCookie(name){
        let cookieValue = null;
        if(document.cookie && document.cookie !== ''){
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++){
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },

    sendDraft() {
        const token = this.getCookie('csrftoken');
        let data = {
                    from: user,
                    to: messageDraft['to'],
                    subject: messageDraft['subject'],
                    body: messageDraft['body']
                    };
        
        fetch('/api/sent', {
            method: "POST",
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => console.log(data));
        messageDraft = new Message();
    }
}

module.exports = MessageStore;