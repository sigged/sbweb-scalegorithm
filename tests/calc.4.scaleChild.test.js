const sg = require('../build/scalegorithm.js');


let parameters;
let mockDom;

beforeEach(function () {
    parameters = {
        mode: 'fit',
        parentSize : [800, 200],
        childSize : [2000, 2000],
        padding : [0, 20],
        upscaleLimit : 1.3,
        verbose : true, //important for error throwing!
    };

    mockDom = {
        mockParent : {
            offsetWidth: 800,
            clientHeight: 200,
        },
        mockChild : {
            offsetWidth: 2000,
            clientHeight: 2000,
            style : {
                top : null,
                left : null,
                transform : null,
            }
        }
    }
});

describe('DOM ScaleChild method', () => {

    it('Fills correct style attributes', () => {
        const parms = Object.assign({}, parameters);
        sg.scaleChild(mockDom.mockParent, mockDom.mockChild, parms);

        expect(mockDom.mockChild.style.transform).toBe("scale(0.08)");
        expect(mockDom.mockChild.style.left).toBe("-600px");
        expect(mockDom.mockChild.style.top).toBe("-900px");
    });

    it('Sets position style to empty if no movement needed', () => {
        const parms = Object.assign({}, parameters);
        parms.childSize = [50, 100];
        mockDom.mockChild.offsetWidth = 50;
        mockDom.mockChild.clientHeight = 100;

        sg.scaleChild(mockDom.mockParent, mockDom.mockChild, parms);

        expect(mockDom.mockChild.style.transform).toBe("scale(1.3)");
        expect(mockDom.mockChild.style.left).toBe("");
        expect(mockDom.mockChild.style.top).toBe("");
    });

    it('Runs callback and returns child element', () => {
        const parms = Object.assign({}, parameters);

        const completedHandler = jest.fn();

        sg.scaleChild(mockDom.mockParent, mockDom.mockChild, parms, completedHandler);

        expect(completedHandler).toBeCalledWith(mockDom.mockChild);
    });

    //todo: create tests for parms.childSize & mockDom.offsetWidth difference

});

