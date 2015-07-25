import request from 'request-promise';

export default class {
    constructor(token) {
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }

    sendMessage(text, chatId) {
        return request.post(`${this.baseUrl}/sendMessage`, { form: { text: text, chat_id: chatId } });
    }
}
