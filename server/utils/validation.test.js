const expect = require('expect');

const {isRealString} = require('../utils/validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(98)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('    ')).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        expect(isRealString('   Mike    ')).toBe(true);
    });
});
