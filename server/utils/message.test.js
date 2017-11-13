const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'Admin';
        const text = 'Some message';

        const result = generateMessage(from, text);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        const from = 'Admin';
        const latitude = 123;
        const longitude = 456;

        const result = generateLocationMessage(from, latitude, longitude);
        expect(result).toInclude({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
        expect(result.createdAt).toBeA('number');
    })
})
