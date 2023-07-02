import express from 'express';
import db from './db/database.js';
import bodyparser from 'body-parser';
import UserRoutes from './controller/users.controller.js';

const app = express();
const port = 5000;

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api/users', UserRoutes);
app.use((err,req,res,next)=>{
  console.log(err);
  res.status(err.status || 500).send("something went wrong!")
})

//db connection
db.query("SELECT 1")
  .then(() => {
    console.log(`db connection success`)
    //this is where we listen after db connection is successful
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
  })
  .catch(err => console.log(`db connection failed \n ${err}`));

export default app;