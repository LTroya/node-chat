const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'Admin';
        const text = 'Some message';

        const result = generateMessage(from, text);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, text});
    });
});
