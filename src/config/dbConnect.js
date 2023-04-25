import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://felipelima:felipelima@koala0.iinawhz.mongodb.net/alura-node"
);

let db = mongoose.connection;

export default db;