import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://felipelima:<password>@koala0.iinawhz.mongodb.net/alura-node"
); 

let db = mongoose.connection;

export default db;
