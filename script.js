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

// update status
function updateUI() {
    let totalPengeluaran = 0;
    transactions.forEach(function(item) {
        totalPengeluaran += item.amount;
    });

    let sisaRekening = totalRekening - totalPengeluaran;
    let sisaLimit = limitBulanan - totalPengeluaran;

    txtTotalSaldo.textContent = formatRupiah(sisaRekening);
    txtBudget.textContent = formatRupiah(limitBulanan);
    txtExpense.textContent = formatRupiah(totalPengeluaran);
    txtLimitBalance.textContent = formatRupiah(sisaLimit);
    totalItem.textContent = transactions.length + ' item';

    if (totalPengeluaran >= limitBulanan) {
        statusText.textContent = 'Limit Habis';
        statusText.style.color = '#9f1239'; 
        budgetAlert.classList.remove('hidden');
        budgetAlert.style.backgroundColor = '#ffe4e6';
        budgetAlert.innerHTML = `<span>🚨 Peringatan Kritis! Anggaran bulanan Anda telah habis.</span>`;
    } else if (totalPengeluaran >= (limitBulanan * 0.8)) {
        statusText.textContent = 'Waspada';
        statusText.style.color = '#e11d48'; 
        budgetAlert.classList.remove('hidden');
        budgetAlert.style.backgroundColor = '#fff1f2';
        budgetAlert.innerHTML = `<span>⚠️ Perhatian! Pengeluaran Anda sudah melewati 80% dari batas limit.</span>`;
    } else {
        statusText.textContent = 'Aman';
        statusText.style.color = '#16a34a'; 
        budgetAlert.classList.add('hidden'); 
    }

    renderTransactions(transactions);
}

// menghapus data
function hapusData(id) {
    transactions = transactions.filter(function(item) {
        return item.id !== id;
    });
    updateUI();
    tampilkanNotifikasi('Transaksi berhasil dihapus!', 'sukses');
}

// menambah data
form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    let isiDesc = descInput.value.trim();
    let isiAmount = Number(amountInput.value);

    if (isiDesc === '' || isiAmount <= 0) {
        tampilkanNotifikasi('Harap isi keterangan dan nominal dengan benar!', 'error');
        return;
    }

    let pengeluaranSementara = 0;
    transactions.forEach(function(item) {
        pengeluaranSementara += item.amount;
    });
    let sisaUangSaatIni = totalRekening - pengeluaranSementara;

    if (isiAmount > sisaUangSaatIni) {
        tampilkanNotifikasi('Transaksi Gagal! Saldo rekening tidak cukup.', 'error');
        return;
    }

    let dataBaru = {
        id: Date.now(),
        desc: isiDesc,
        amount: isiAmount
    };

    transactions.push(dataBaru);
    
    form.reset();
    updateUI();
    tampilkanNotifikasi('Transaksi baru berhasil ditambahkan!', 'sukses');
});