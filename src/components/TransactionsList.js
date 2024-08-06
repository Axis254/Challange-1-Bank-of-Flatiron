import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, handleDelete }) {
  const [sortCriteria, setSortCriteria] = React.useState('description'); // Default sort by description

  const sortTransactions = (transactions) => {
    return [...transactions].sort((a, b) => {
      if (sortCriteria === 'description') {
        return a.description.localeCompare(b.description);
      }
      if (sortCriteria === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => setSortCriteria('description')}>Sort by Description</button>
        <button onClick={() => setSortCriteria('category')}>Sort by Category</button>
      </div>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Actions</h3>
            </th>
          </tr>
          {sortTransactions(transactions).map(transaction => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onDelete={() => handleDelete(transaction.id)} // Pass the delete handler
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
