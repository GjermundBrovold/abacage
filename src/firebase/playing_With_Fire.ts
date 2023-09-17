import { push } from "firebase/database";
import  db_Realtime  from "./firebase";

const newData = {
  name: "John",
  age: 30,
};

const newPostRef = push(db_Realtime, newData);
