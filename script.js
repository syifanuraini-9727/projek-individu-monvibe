// data awal
let transactions = [];

let totalRekening = 5000000;
let limitBulanan = 1000000;

const form = document.getElementById('form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const searchInput = document.getElementById('search-input');
const list = document.getElementById('list');

const txtTotalSaldo = document.getElementById('txt-total-saldo');
const txtBudget = document.getElementById('txt-budget');
const txtExpense = document.getElementById('txt-expense');
const txtLimitBalance = document.getElementById('txt-limit-balance');
const budgetAlert = document.getElementById('budget-alert');
const totalItem = document.getElementById('total-item');
const statusText = document.getElementById('status-text');
