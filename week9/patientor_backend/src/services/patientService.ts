import { data } from "../../data/patients";
import { PatientWithoutSsn, Patient, NewPatient, Entry } from "../types";
import { v1 as uuid } from 'uuid';
import { toNewEntry } from "../utils";

const getPatients = (): PatientWithoutSsn[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id, name, dateOfBirth, gender, occupation, entries,
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const newPatientEntry = {id: uuid(), ...newPatient};
  
  data.push(newPatientEntry)
  
  return newPatientEntry;
};

function getPatient(patientId: string):Patient | undefined {
  return data.find((patient) => patient.id === patientId)
}

function addEntryToPatient(entry: Entry, patientId: string): Entry | undefined{
  
  console.log("patientId " + patientId)
  const newEntry = toNewEntry(entry)
  
  const patient = getPatient(patientId)
  if (!patient) {
    console.log("unluigi")
    return undefined
  }
  patient.entries.push(newEntry)
  console.log(patient)
  return entry
}

export { getPatients, addPatient, getPatient, addEntryToPatient };