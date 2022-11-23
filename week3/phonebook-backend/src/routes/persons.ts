import express from "express";
import { Person } from "../models/person";

const personRouter = express.Router();

export interface PersonType {
  name: string
  number: string
  id: number
}
interface NewPersonType {
  name: string
  number: string
}

async function getAll() {
  return await Person.find({});
}
personRouter.get("/", async (_req, res) => {
  return res.json(await getAll());
});

personRouter.get("/info", async (_req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `Phonebook contains ${
        persons.length
      } contacts. Time of request: ${new Date()}`
    );
  });
});

personRouter.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const person: PersonType | undefined | null = await Person.findById(userId);
    console.log(person);
    if (!person) return res.status(404).end();

    return res.json(person);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

personRouter.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const updateId = req.params.id;

    if (!updateId || !body) throw new Error("isufficient params");

    const personToBeUpdated: NewPersonType = {
      name: body.name,
      number: body.number,
    };

    const updatedPerson = await Person.findByIdAndUpdate(updateId, personToBeUpdated, {new:true});

    return res.json(updatedPerson);

  } catch (err) {
    return next(err);
  }
});

personRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await Person.findByIdAndDelete(id);
    console.log(`RESULT FROM DELETION: ${response}`);
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

personRouter.post("/", async (req, res, next) => {
  try {
    const newPerson: NewPersonType | undefined = req.body;

    if (!newPerson?.name || !newPerson?.number)
      return res.status(400).send("Missing values");

    if (await Person.findOne({ name: newPerson.name }).exec())
      return res.status(400).send("Name already exists");

    const newPersonEntry = new Person(newPerson);
    const newSavedPerson = await newPersonEntry.save();
    console.log(newSavedPerson);
    return res.status(201).json(newSavedPerson);
  } catch (err) {
    return next(err);
  }
});

export { personRouter };
