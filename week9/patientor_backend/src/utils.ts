import { Entry, Gender, HealthCheckRating, NewPatient } from './types';
import { v1 as uuid } from 'uuid'

function isString(text: unknown): text is string{
  return typeof text === 'string' || text instanceof String;
}

function parseText(text: unknown): string{
  if(!text || !isString(text)){
    throw new Error('Incorrect or missing text')
  }
  return text
}

function isGender(param: any): param is Gender{
  return Object.values(Gender).includes(param)
}

function parseGender(gender: unknown): Gender{
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`)
  }
  return gender
}

function isList(list: unknown): list is string[]{
  return Array.isArray(list) && list.every((item) => isString(item))
}

function parseList(list: unknown): Array<string> | undefined{
  if (list === undefined) return undefined
  if (!isList(list)) throw new Error(`invalid list: ${list}`)
  return list
}

function isType(type: unknown): type is string{
  const types = ['Hospital', 'OccupationalHealthcare', 'HealthCheck']
  return types.some((realType) => type === realType ) && isString(type)
}

function parseType(type: unknown): string{
  if (!type || !isType(type)) throw new Error('Type missing or invalid')
  return type
}

function isHealthCheckRating(healthCheckRating: any): healthCheckRating is HealthCheckRating{
  return Number.isInteger(healthCheckRating) && Object.values(HealthCheckRating).includes(healthCheckRating)
}

function parseHealthCheckRating(healthCheckRating: unknown): HealthCheckRating {
  if (!isHealthCheckRating(healthCheckRating)) throw new Error("HealthCheckRating missing or invalid!")
  return healthCheckRating
}

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }

function toNewPatientEntry({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient{
  const newPatient: NewPatient = {
    name: parseText(name),
    dateOfBirth: parseText(dateOfBirth),
    ssn: parseText(ssn),
    gender: parseGender(gender),
    occupation: parseText(occupation),
    entries: []
    }

  return newPatient
}


type EntryFields = { description: unknown, date: unknown, 
  specialist: unknown, diagnosisCodes?: unknown, type: unknown,
  discharge?: DischargeFields, employerName?: unknown, sickLeave?: SickLeaveFields, healthCheckRating?: unknown }
type DischargeFields = { date: unknown, criteria: unknown }
type SickLeaveFields = { startDate: unknown, endDate: unknown }

function toNewEntry( entryFields: EntryFields ): Entry{
  
  const newEntryBase = {
    id: uuid(),
    description: parseText(entryFields.description),
    date: parseText(entryFields.date),
    specialist: parseText(entryFields.specialist),
    diagnosisCodes: parseList(entryFields.diagnosisCodes)
  }

  const type = parseType(entryFields.type)

  switch (type){
    case 'HealthCheck':
      return { 
        type,
        ...newEntryBase,
        healthCheckRating: parseHealthCheckRating(Number(entryFields.healthCheckRating))  
    } 
    case 'Hospital':
      return {
        type,
        ...newEntryBase,
        discharge: {date: parseText(entryFields.discharge?.date), criteria: parseText(entryFields.discharge?.criteria)}
      }
    case 'OccupationalHealthcare':
      return {
        type,
        ...newEntryBase,
        employerName: parseText(entryFields.employerName),
        sickLeave: {startDate: parseText(entryFields.sickLeave?.startDate), endDate: parseText(entryFields.sickLeave?.endDate)}
      }
    default: return newEntryBase as Entry
  }


}

export { toNewPatientEntry, toNewEntry};