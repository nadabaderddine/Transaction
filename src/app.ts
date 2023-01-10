import  express from "express"
import { TRANSACTIONS_DATA } from "./constants"
const app = express();
const port = 3000;

app.get('/api/transactions', (req, res) => {
    console.log("test",req.query);
    
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});