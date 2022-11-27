import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from "../types";

const getDiagnoses = (): Array<Diagnose> => diagnoseData;

export { getDiagnoses };