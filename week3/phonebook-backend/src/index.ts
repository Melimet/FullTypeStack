require('dotenv').config();
import express, { response } from "express";
import { personRouter } from "./routes/persons";
import morgan from "morgan";
import cors from "cors";
const app = express();

declare module 'http' {
    interface IncomingMessage {
        body: any;
    }
}

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token('body', (request, _response) => JSON.stringify(request.body));
app.use(express.static('build'));
app.use("/api/persons", personRouter);

app.get("/", (_req, res) => {
  res.send("Hello world");
});

function unknownEndpoint() {
  return response.status(404).send({error: "unknown endpoint"});
}
app.use(unknownEndpoint);

function errorHandler(error: any, _request: any, response: any, next: any){
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
