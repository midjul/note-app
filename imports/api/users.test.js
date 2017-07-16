const square = (a) => a * a;
describe('square', function () {
    it('should square a number', function () {
        const res = square(6);

        if (res !== 36) {
            throw new Error('Number not squared')
        }
    })
})


