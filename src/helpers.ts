import { TRANSACTIONS_DATA } from "./constants";
import { transactionType } from './types'

export const getTransactionById = (id:string):transactionType => {
  let findedTransaction:transactionType;
  const getTransaction = (transactions:transactionType[], id:string) => {
    transactions?.forEach((item) => {
      if (item.id === id) {
        findedTransaction = item;
      } else {
        return getTransaction(item.children ?? [], id);
      }
    });
    return findedTransaction;
  };
  return getTransaction(TRANSACTIONS_DATA, id);
};

export const getTransactionChildren = (
  transactionChildren :transactionType[],
  confidenceLevel:number,
  parentItem:transactionType
):transactionType[] => {
  let children = [];
  const getChildren = (childs, confidenceLevel, parent) => {    
    childs?.forEach((item) => {   
      let itemWithCombinedConnectionInfo;
      if (item.connectionInfo.confidence >= confidenceLevel) {
         itemWithCombinedConnectionInfo = {
          ...item,
          combinedConnectionInfo: {
            types: `${parent?.combinedConnectionInfo?.types ?? ""} ${
              item?.connectionInfo?.type ?? ""
            }`
          }
        }
        children.push(itemWithCombinedConnectionInfo);
      }
      return getChildren(item.children ?? [], confidenceLevel, itemWithCombinedConnectionInfo);
    });
    return children;
  };
  return getChildren(transactionChildren, confidenceLevel, parentItem);
};
