let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
    updateSummary();
}

function displayTransactions() {

    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${transaction.description}
                <small> (${transaction.category})</small>
            </span>

            <span>
                ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount}
                <button onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </span>
        `;

        list.appendChild(li);
    });
}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateSummary();
}

function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    const balance = income - expense;

    document.getElementById("income").textContent = "₹" + income;
    document.getElementById("expense").textContent = "₹" + expense;
    document.getElementById("balance").textContent = "₹" + balance;
}

displayTransactions();
updateSummary();