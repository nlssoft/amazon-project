import { fromatCurency } from "../scripts/utils/money.js";


describe('test suite: formatCurency', () => {
    it('convert cents into dollar', () => {
        expect(fromatCurency(2025)).toEqual('20.25');
    });
});


