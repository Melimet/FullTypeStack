import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json())


app.get("/hello", (_req, res): void => {
  res.send("Hello world!!!!!");
});

app.get("/bmi", (req, res):void => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!weight || !height){
      res.status(400).send(JSON.stringify({"error": "malformed parameters"}));
    }

    const response = {height, weight, bmi: calculateBmi(Number(height), Number(weight))};
    res.send(JSON.stringify(response));
});

app.post("/exercise", (req, res):void => {
  const exercises = req.body

  const days = exercises.daily_exercises;
  const target = +exercises.target;

  const validDays = days.map((day: string) => +day)
    .filter((hoursInDay: number) => !Number.isNaN(hoursInDay));

  if (!days || !Number.isFinite(target)){
    res.status(400).send(JSON.stringify({"error": "incorrect parameters"}));
  }

  const result = calculateExercises(validDays, target);

  res.json(result);

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});