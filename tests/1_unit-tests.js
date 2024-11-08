const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Check Function ConvertHandler.getNum(input)', function(){
        // test a whole number
        test('Whole number input', function(){
            let input = "4gal";
            assert.equal(convertHandler.getNum(input), 4);
        });
        // test input number decimal
        test('Decimal input number', function(){
            let input = "25.4km";
            assert.equal(convertHandler.getNum(input), 25.4);
        });
        // test input number fractional
        test('Fractional input number', function(){
            let input = "1/2gal";
            assert.equal(convertHandler.getNum(input), 1/2);
        });
        // test input number fractinoal and decimal
        test('Fractional with decimal input number', function(){
            let input = "4/2.2gal";
            assert.equal(convertHandler.getNum(input), 4/2.2);
        });
        // test invalid input number
        test('Invalid input number', function(){
            let input = "3/2/5.44km";
            assert.equal(convertHandler.getNum(input), undefined);
        });
        // test without input number
        test('Not Numerical input', function(){
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
        });
    });

    suite('Check convertHandler.getUnit(input)', function(){
        test('Input valid unit', function(){
            let input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg',
                'GAL',
                'L',
                'MI',
                'KM',
                'LBS',
                'KG'
            ];
            let output = [
                'gal',
                'L',
                'mi',
                'km',
                'lbs',
                'kg',
                'gal',
                'L',
                'mi',
                'km',
                'lbs',
                'kg'
            ];
            input.forEach(function(ele, index){
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });

            test('Invalid input unit', function(){
                let input = "30cm";
                assert.equal(convertHandler.getUnit(input), undefined);
            });
        });
    });
    suite('Check convertHandler.getReturnUnit(initUnit)', function(){});
    suite('Check convertHandler.getSpeelOutUnit(unit)', function(){});
    suite('Check convertHandler.convert(num, unit)', function(){});

});