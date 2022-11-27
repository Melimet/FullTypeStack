import express from "express";
import { getPatients, addPatient, getPatient, addEntryToPatient } from "../services/patientService";
import { toNewEntry, toNewPatientEntry } from "../utils";

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(getPatients());
});

patientRouter.post('/', (req, res) => {
  try{
    const newPatient = toNewPatientEntry(req.body);
    const addedNewPatient = addPatient(newPatient)
    res.json(addedNewPatient)

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.get(`/:id`, (req, res) => {
  const id = req.params.id
  res.send(getPatient(id))
})

patientRouter.post(`/:id/entries`, (req, res) => {
  try{

  const patientId = req.params.id
  const newEntry = toNewEntry(req.body)
  const addedNewEntry = addEntryToPatient(newEntry, patientId)
  console.log("success!")
  res.json(addedNewEntry)
  
  } catch (error: unknown){
    let errorMessage = "Something went wrong"
    if(error instanceof Error) {
      errorMessage += "Error: " + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export { patientRouter };