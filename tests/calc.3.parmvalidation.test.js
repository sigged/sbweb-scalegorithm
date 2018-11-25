const sg = require('../build/scripts/scalegorithm.js');


let parameters;

beforeEach(function () {
    parameters = {
        mode: 'fit',
        parentSize : [468,60],
        childSize : [20, 20],
        padding : [0, 20],
        upscaleLimit : 0,
        verbose : true, //important for error throwing!
    };
});

describe('Parameter validation', () => {

    test('1. Throws on invalid mode', () => {
        function badMode(){
            const parms = Object.assign({}, parameters);
            parms.mode = 'fill';
            const result = sg.calc(parms);
        }
        expect(badMode).toThrowError(/currently only 'fit' is supported/);
    });

    test('2. Throws on invalid parentSize length', () => {
        function invalidLength(){
            const parms = Object.assign({}, parameters);
            parms.parentSize = [34,45,54];
            sg.calc(parms);
        }
        expect(invalidLength).toThrowError(/parentSize must be of array\[2\]/);
    });

    test('3. Throws on invalid parentSize dimensions', () => {
        function bothInvalid(){
            const parms = Object.assign({}, parameters);
            parms.parentSize = [0, 0];
            sg.calc(parms);
        }
        function heightInvalid(){
            const parms = Object.assign({}, parameters);
            parms.parentSize = [20, -1];
            sg.calc(parms);
        }
        function widthInvalid(){
            const parms = Object.assign({}, parameters);
            parms.parentSize = [-1, 10];
            sg.calc(parms);
        }
        expect(bothInvalid).toThrowError(/parentSize dimensions must both be > 0/);
        expect(heightInvalid).toThrowError(/parentSize dimensions must both be > 0/);
        expect(widthInvalid).toThrowError(/parentSize dimensions must both be > 0/);
    });

    test('4. Throws on invalid childSize length', () => {
        function invalidLength(){
            const parms = Object.assign({}, parameters);
            parms.childSize = [34];
            sg.calc(parms);
        }
        expect(invalidLength).toThrowError(/childSize must be of array\[2\]/);
    });

    test('5. Throws on invalid childSize dimensions', () => {
        function bothInvalid(){
            const parms = Object.assign({}, parameters);
            parms.childSize = [0, 0];
            sg.calc(parms);
        }
        function heightInvalid(){
            const parms = Object.assign({}, parameters);
            parms.childSize = [20, -1];
            sg.calc(parms);
        }
        function widthInvalid(){
            const parms = Object.assign({}, parameters);
            parms.childSize = [-1, 10];
            sg.calc(parms);
        }
        expect(bothInvalid).toThrowError(/childSize dimensions must both be > 0/);
        expect(heightInvalid).toThrowError(/childSize dimensions must both be > 0/);
        expect(widthInvalid).toThrowError(/childSize dimensions must both be > 0/);
    });

    test('6. Throws on invalid padding length', () => {
        function invalidLength(){
            const parms = Object.assign({}, parameters);
            parms.padding = "this ain't paddin'";
            sg.calc(parms);
        }
        expect(invalidLength).toThrowError(/padding must be of array\[2\]/);
    });

    test('7. Throws on invalid padding dimensions', () => {
        function bothInvalid(){
            const parms = Object.assign({}, parameters);
            parms.padding = [-1, -1];
            sg.calc(parms);
        }
        function heightInvalid(){
            const parms = Object.assign({}, parameters);
            parms.padding = [20, -1];
            sg.calc(parms);
        }
        function widthInvalid(){
            const parms = Object.assign({}, parameters);
            parms.padding = [-1, 10];
            sg.calc(parms);
        }
        expect(bothInvalid).toThrowError(/padding dimensions must both be >= 0/);
        expect(heightInvalid).toThrowError(/padding dimensions must both be >= 0/);
        expect(widthInvalid).toThrowError(/padding dimensions must both be >= 0/);
    });

    test('6. Doesn\'t throw on valid parameters', () => {
        function validparms(){
            const parms = Object.assign({}, parameters);
            return sg.calc(parms);
        }
        expect(validparms).toBeTruthy();
    });
});

