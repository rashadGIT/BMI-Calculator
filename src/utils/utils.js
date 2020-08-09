const converter = 2.2046
const lbsToKg = (lbs) => lbs/converter;
const inToCm = (inches) => inches*2.54;
const getBMI = (kg, height) => kg/(height/100*height/100)

module.exports = {
    getBMI,
    lbsToKg,
    inToCm
};