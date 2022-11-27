interface Result { periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number 
}

function parseArguments(args: string[]):number[] {
  if (args.length < 3) throw new Error("Not enough arguments");

  const [,, ...days] = args;

  return  days.map(workoutHoursInDay => +workoutHoursInDay)
    .filter(day => !Number.isNaN(day));
}

function ratingGrading(avgHours: number, target: number):number{
  const grade = avgHours / target;

  if (grade >= 0.9) return 3;
  else if (grade < 0.6) return 1;
  return 2;

}

function ratingFeedback(grade: number):string{
  if (grade == 1) return "very bad";
  else if (grade == 2) return "pretty good";
  return "very good!";
}

function calculateExercises(trainingDays: number[], target: number):Result{
  const avgHours = trainingDays.reduce((sum, hours) => (sum + hours),0) / trainingDays.length;
  const rating = ratingGrading(avgHours, target);

  return { periodLength: trainingDays.length,
  trainingDays: trainingDays.filter(a => (a != 0)).length,
  success: avgHours > target,
  rating,
  ratingDescription: ratingFeedback(rating),
  target,
  average: avgHours};
}

try {
  
  const trainingDays = parseArguments(process.argv);
  console.log(calculateExercises(trainingDays, trainingDays.length * 2));
  
} catch(error: unknown){
  console.log(`error: ${error instanceof Error ? error.message : "unknown"}`);
}

export { calculateExercises }; 