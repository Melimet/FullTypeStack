//import {parseArguments} from "./parseArguments"

function calculateBmi(height: number, weight: number):string {

  const bmi = +(weight / (height ** 2) * 10000).toFixed(2);
  if (bmi < 18.5){
    return `bmi of ${bmi}, underweight`;
  } else if (bmi >= 25){
    return `bmi of ${bmi}, overweight`;
  }
  return `bmi of ${bmi}, healthy weight`; 

}
/** 
function validateAndCalculateBmi() {
  try {
    const {value1: height, value2: weight} = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch(error: unknown){
    console.log(`error : ${error instanceof Error ? error.message : "unknown"}`)
  }
}

*/
export { calculateBmi };