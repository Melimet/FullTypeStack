import mongoose from "mongoose";
if (process.argv.length < 3) {
  console.log("give password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster1.ylovrqe.mongodb.net/PhonebookDb?retryWrites=true&w=majority`;

if (process.argv.length == 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  createPersonInDb(name, number);
} else {
  getPersonsFromDb();
}

function generatePersonSchema() {
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  return mongoose.model("Person", personSchema);
}

function createPersonInDb(name: string, number: string) {
  mongoose.connect(url);

  const Person = generatePersonSchema();

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    mongoose.connection.close();
  });
}

async function getPersonsFromDb() {
  mongoose.connect(url);

  const Person = generatePersonSchema();

  const result = await Person.find({});

  console.log(result);

  mongoose.connection.close();
}
