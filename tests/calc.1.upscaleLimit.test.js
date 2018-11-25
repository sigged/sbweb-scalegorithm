const sg = require('../build/scripts/scalegorithm.js');

let parameters;

beforeEach(function () {
    parameters = {
        mode: 'fit',
        parentSize : [800, 200],
        childSize : [0, 0],
        padding : [0, 20],
        upscaleLimit : 1.3,
        verbose : true,
    };
});

describe('Testing childen with padding 0 x 20 and limit 1.3', () => {

    test('1. Fit: Horizontal narrow child 468 x 60 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [468,60];

        const result = sg.calc(parms);

        expect(result.scale).toBe(1.3);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBeNull();
    });

    test('2. Fit: Horizontal wide child 1000 x 100 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [1000,100];

        const result = sg.calc(parms);

        expect(result.scale).toBe(0.8);
        expect(result.childLeft).toBe(-100);
        expect(result.childTop).toBeNull();
    });

    test('3. Fit: Vertical low child 50 x 100 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [50,100];

        const result = sg.calc(parms);

        expect(result.scale).toBe(1.3);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBeNull();
    });

    test('4. Fit: Vertical high child 100 x 500 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [100,500];

        const result = sg.calc(parms);

        expect(result.scale).toBe(0.32);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBe(-150);
    });

    test('5. Fit: Square tiny child 50 x 50 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [50,50];

        const result = sg.calc(parms);

        expect(result.scale).toBe(1.3);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBeNull();
    });

    test('6. Fit: Square massive child 2000 x 2000 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [2000,2000];

        const result = sg.calc(parms);

        expect(result.scale).toBe(0.08);
        expect(result.childLeft).toBe(-600);
        expect(result.childTop).toBe(-900);
    });

    test('7. Fit: Square high child 400 x 400 within 800 x 600', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [400,400];

        const result = sg.calc(parms);

        expect(result.scale).toBe(0.4);
        expect(result.childLeft).toBeNull();
        expect(result.childTop).toBe(-100);
    });

});


