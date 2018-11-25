const sg = require('../build/scripts/scalegorithm.js');

let parameters;

beforeEach(function () {
    parameters = {
        mode: 'fit',
        parentSize : [800, 200],
        childSize : [0, 0],
        padding : [0, 20],
        upscaleLimit : 0,
        verbose : true,
    };
});

describe('Testing childen with padding 0 x 20 and no upscale limit 0', () => {

    test('1. Fit: Horizontal narrow child 468 x 60 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [468,60];

        const result = sg.calc(parms);

        expect(result.scale).toBe(1.7094017094017095);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBeNull();
    });

    test('2. Fit: Vertical low child 50 x 100 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [50, 100];

        const result = sg.calc(parms);

        expect(result.scale).toBe(1.6);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBeNull();
    });

    test('3. Fit: Square tiny child 50 x 50 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [50,50];

        const result = sg.calc(parms);

        expect(result.scale).toBe(3.2);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBeNull();
    });

});

