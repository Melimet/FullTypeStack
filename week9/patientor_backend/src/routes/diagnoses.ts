import express from "express";
import { getDiagnoses } from "../services/diagnoseService";
const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  res.send(getDiagnoses());
});

export { diagnoseRouter };