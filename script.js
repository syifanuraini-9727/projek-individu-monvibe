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

// alertnya
function tampilkanNotifikasi(pesan, tipe = 'error') {
    const toast = document.createElement('div');
    toast.textContent = pesan;
    
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = (tipe === 'error') ? '#e11d48' : '#16a34a'; 
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '1000';
    
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000); 
}

// merupiahkan
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

function renderTransactions(dataArray) {
    list.innerHTML = '';
    
    if (dataArray.length === 0) {
        list.innerHTML = `<li style="text-align: center; color: #94a3b8; padding: 1rem; font-size: 0.85rem;">Belum ada pengeluaran apa pun.</li>`;
        return;
    }

    dataArray.forEach(function(item) {
        const li = document.createElement('li');
        li.className = 'list-item';
        
        li.innerHTML = `
            <div class="item-info">
                <span>${item.desc}</span>
                <span>-${formatRupiah(item.amount)}</span>
            </div>
            <button class="btn-delete" onclick="hapusData(${item.id})">Hapus</button>
        `;
        list.appendChild(li);
    });
}
