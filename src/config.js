import { getDatabase } from '@firebase/database';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAwkomrYC3JAWPS6WfOv29nvBfn6i2OmTA",
  authDomain: "spark-spark-a8633.firebaseapp.com",
  databaseURL: "https://spark-spark-a8633-default-rtdb.firebaseio.com",
  projectId: "spark-spark-a8633",
  storageBucket: "spark-spark-a8633.appspot.com",
  messagingSenderId: "168391685568",
  appId: "1:168391685568:web:5063aecad62f8c79384425",
  measurementId: "G-4SCLL7K9J4"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const db = getDatabase()
export { db }