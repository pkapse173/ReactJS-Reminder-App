import dotenv from'dotenv';
import express from 'express';
import { initialise } from './app/app.js';

//initialisize environment variable 
dotenv.config();

// Creation of express app.
const app = express();

//Assigning a port 4000
const port = process.env.PORT;
initialise(app);

//Display Ports
app.listen(port, ()=> console.log(`Server running on port ${port}`));
