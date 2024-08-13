import React, { useState, useEffect } from "react";
import AddTransactionForm from "./AddTransactionForm";
import TransactionsList from "./TransactionsList";
import Search from "./Search";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async () => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  useEffect(() => {
    // Fetch initial transactions from the backend API
    fetchTransactions();
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);

    // Post the new transaction to the backend API
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => console.log("Transaction added:", data))
      .catch((error) => console.error("Error adding transaction:", error));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => fetchTransactions());
  };

  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList
        transactions={filteredTransactions}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
