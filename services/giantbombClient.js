import request from 'request-promise';

const platforms = {
    'PS4': 146
};
const baseUrl = 'http://www.giantbomb.com/api';

export default class {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    request(url) {
        return request.get(url).then(JSON.parse).then(response => {
            if (response.status_code !== 1) {
                throw new Error('Request to GiantBomb failed');
            }

            return response;
        });
    }

    releasesFor(month, year) {
        return this.request(`${baseUrl}/games?api_key=${this.apiKey}&format=json&field_list=name&filter=platforms:${platforms.PS4},expected_release_year:${year},expected_release_month:${month}`).then(response => {
            return response.results;
        });
    }
}
