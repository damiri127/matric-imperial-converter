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
        });

        test('Invalid input unit', function(){
            let input = "30cm";
            assert.equal(convertHandler.getUnit(input), undefined);
        });
    });
    suite('Check convertHandler.getReturnUnit(initUnit)', function(){
        // test for each valid input units
        test('For Each Valid Units Input', function(){
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
            input.forEach(function(ele, i){
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
        });
    });

    suite('Check convertHandler.getSpeelOutUnit(unit)', function(){
        test('String unit for each valid input', function(){
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = [
                "gallons",
                "liters",
                "miles",
                "kilometers",
                "pounds",
                "kilograms"
            ];
            input.forEach(function(ele, i){
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
        });
    });
    suite('Check convertHandler.convert(num, unit)', function(){
        // Check Result convert gal to L
        test('Convert gal to L', function(){
            let input = [4, "gal"];
            let expect = 15.14164;
            assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
        });

        // Check Result convert L to gal
        test('Convert L to gal', function(){
            let input = [10, "L"];
            let expect = 2.64172;
            assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
        });

        // Check Result convert mi to km
        test('Convert mi to km', function(){
            let input = [3.2, "mi"];
            let expect = 5.14989;
            let expectUnit = "km";
            assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
            assert.equal(convertHandler.getReturnUnit(input[1]), expectUnit);
        });

        // Check Result convert km to mi
        test('Convert km to mi', function(){
            let input = [1/2, "km"];
            let expect = 0.31069;
            assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
        });

        // Check Result convert lbs to kg
        test('Convert lbs to kg', function(){
            let input = [20, "lbs"];
            let expect = 9.07184;
            assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
        });

        // Check Result convert kg to lbs
        test('Convert kg to lbs', function(){
            let input = [2, "kg"];
            let expect = 4.40925;
            assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
        });
    });

});