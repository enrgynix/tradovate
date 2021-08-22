// Helper Function
// Retrieves the nearest number in an array of numbers, or defaults to the first element in the array or the number itself.

const jStat = require('jStat');

// https://simplestatistics.org/docs/#linearregression
const ss = require('simple-statistics');

const CDF = ss.cumulativeStdNormalProbability;
const LinReg = ss.linearRegression;
const InvCDF = ss.probit;
const StDev = ss.standardDeviation;
const Variance = ss.variance;

const last = (arr=[]) => arr?.length ? arr[arr.length - 1] : undefined;

const PDF = (x) => jStat.normal.pdf(x,0,1);

// NOTE: CDF from ss module might give upside down put deltas.
function AlternateCDF(x,mean=0,std=1) {
  var x = (x - mean) / std
  var t = 1 / (1 + .2315419 * Math.abs(x))
  var d =.3989423 * Math.exp( -x * x / 2)
  var prob = d * t * (.3193815 + t * ( -.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  if( x > 0 ) prob = 1 - prob
  return prob;
}

function NaNZero(num,def=0) {
  return (isNaN(num) || !isFinite(num) || !num) ? def : num;
}

function Indexify(arr) {
	return arr.map((a,i)=>[i+1,a]);
}

function round(value,tail=0.25) {
    return NaNZero(Math.round(value / tail) * tail);
}

// Pause for a moment until a condition is fulfilled, a means of deliberately enforcing an await.then(() => {});
// await waitUntil.call(this,() => this.spotPrice !== 0);
const WaitUntil = (condition) => {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (!condition()) return
      clearInterval(interval)
      resolve()
    }, 100)
  })
}

/**
 * @function sigmoid
 * @description Takes in a number `x` and a shape factor `k` and returns a sigmoid valued -1 to 1, with crossover at zero.
 * @param {Number} x 
 * @param {Number} k 
 * @returns {Number}
 */

function sigmoid(x,k=1) {
	let z = isFinite(x) ? x : x > 0 ? 10e8 : -10e8 || 0;
	return 2 / (1 + Math.exp(-z/k)) - 1;
}

module.exports = { 
	CDF,
	InvCDF,
	Variance,
	StDev,
	LinReg,
  AlternateCDF,
  PDF,
  last,
  NaNZero,
  Indexify,
  round,
  WaitUntil,
  sigmoid
}