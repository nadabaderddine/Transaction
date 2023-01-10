import  express from "express"
import { getTransactionById,getTransactionChildren } from './helpers'

const app = express();
const port = 3000;

app.get('/api/transactions', (req, res) => {
  const { connectionInfo,...transaction } = getTransactionById(req.query.transactionId as string)
  const confidenceLevel = Number(req.query.confidenceLevel)  
  const childTransactions = getTransactionChildren(transaction.children,confidenceLevel,transaction)
  res.json({transactions:[transaction,...childTransactions]});
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});