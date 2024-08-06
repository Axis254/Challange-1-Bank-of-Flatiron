import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions") // Updated URL with port 8001
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);

    fetch("http://localhost:8001/transactions", {
      // Updated URL with port 8001
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

  const handleDelete = (id) => {
    // Remove transaction locally
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );

    // Remove transaction from the backend
    fetch(`http://localhost:8001/transactions/${id}`, {
      // Updated URL with port 8001
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Transaction deleted");
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList
        transactions={filteredTransactions}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default AccountContainer;
