// fungsi untuk valiadsi input number
function numberStringSpilter(input){
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}

// fungsi untuk melihat hasil bagi
function cekDiv(possibleFraction){
  let nums = possibleFraction.split("/");
  if(nums.length > 2){
    return false;
  }

  return nums;
}



function ConvertHandler() {
  
  // fungsi mendapatkan number
  this.getNum = function(input) {
    let result = numberStringSpilter(input)[0];
    let nums = cekDiv(result);
    if (!nums){
      return undefined;
    }

    let number1 = nums[0];
    let number2 = nums[1] || "1";
    result = parseFloat(number1) / parseFloat(number2);
    if (isNaN(number1) || isNaN(number2)){
      return undefined;
    }
    return result;
  };
  
  // fungsi untuk mendapatkan unit
  this.getUnit = function(input) {
    let result = numberStringSpilter(input)[1].toLowerCase();
    switch(result){
      case 'km':
        return "km";
      case 'gal':
        return "gal";
      case 'lbs':
        return "lbs";
      case "mi":
        return "mi";
      case 'l':
        return "L";
      case 'kg':
        return "kg";
      default:
        return undefined;
    }
  };
  
  // fungsi untuk mendapatkan nilai unit ketika diconvert
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    
    switch(unit){
      case 'km':
        return "mi";
      case 'gal':
        return "L";
      case 'lbs':
        return "kg";
      case 'mi':
        return "km";
      case 'l':
        return "gal";
      case 'kg':
        return "lbs";
      default:
        return undefined;
    }
  };

  // fungsi untuk menjelaskan singkatan unit
  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch(unit){
      case 'km':
        return "kilometer";
      case 'gal':
        return "gallons";
      case 'mi':
        return "miles";
      case 'lbs':
        return "pounds";
      case 'kg':
        return "kilograms";
      case 'l':
        return "liters";
      default:
        return "have no idea";
    }
  };
  
  // fungsi perhitungan (converter)
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;
    
    switch(unit){
      case 'km':
        result = initNum / miToKm;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  // fungsi mengembalikan hasil akhir perhitungan
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
