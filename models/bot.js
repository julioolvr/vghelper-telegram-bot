import GiantbombClient from '../services/giantbombClient';
import TelegramClient from '../services/telegramClient';
import moment from 'moment';

const BOT_USERNAME = 'VGHelperBot';

const giantbombClient = new GiantbombClient(process.env.GIANTBOMB_API_KEY);
const telegramClient = new TelegramClient(process.env.BOT_TOKEN);

function messageIsCommand(message) {
    return message.text && message.text.startsWith('/');
}

function extractCommand(message) {
    return message.match(/\/(\w+)(?:@\w+)?(?:\s+(.+))?/).slice(1);
}

export default class {
    respondTo(message) {
        let promise;

        if (!messageIsCommand(message)) {
            return;
        }

        return this.respondToCommand(extractCommand(message.text)).then(response => {
            telegramClient.sendMessage(response, message.chat.id);
        });
    }

    respondToCommand([command, args]) {
        if (!command) {
            return;
        }

        switch (command) {
        case 'start':
            // TODO: Ugh
            return { then: (cb) => cb('Ask for releases with /releases ${month} ${year}') };
        case 'releases':
            return this.respondToReleases(args.split(' ')); // TODO: Split somewhere else
        }
    }

    respondToReleases([month, year]) {
        return giantbombClient.releasesFor(month, year).then(games => {
            let message = [`Releases for ${moment(month, 'M').format('MMMM')}, ${year}:`];
            games.forEach(game => message.push(`* ${game.name}`));
            return message.join('\n');
        });
    }
}
