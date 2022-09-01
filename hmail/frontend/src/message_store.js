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

    sendDraft() {
        console.log('sending...');
        messageDraft = new Message();
    }
}

module.exports = MessageStore;