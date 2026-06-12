console.log("JS loaded");

// Validate card 
async function validateCard(cartao_codigo) {
    const res = await fetch(`http://192.168.1.66:3000/usuarios/${cartao_codigo}`);
    if (!res.ok) {
        alert("Card not found");
        return false;
    }
    const user = await res.json();
    console.log("Employee found:", user);
    return true;
}

// Button actions
async function action(tipo, mesa, linea) {
    const cardCode = document.getElementById("cartao").value.trim();
    const label = document.getElementById("etiqueta").value.trim() ;

    if (!cardCode || !label) {
        alert("Please scan card and label");
        return;
    }

    const isValid = await validateCard(cardCode);
    if (!isValid) return;

    await fetch("http://192.168.1.66:3000/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cartao_numero: "",
            cartao_codigo: cardCode,
            etiqueta: label,
            tipo: tipo,
            mesa: mesa,
            linea: linea,
        })
    });

    addRecord(cardCode, label, tipo, mesa, linea);

    document.getElementById("cartao").value = "";
    document.getElementById("etiqueta").value = "";
}

//  Add row to table
function addRecord(cardCode, label, tipo, mesa, linea) {
    const table = document.getElementById("tabela");
    const now = new Date();
    const date = now.toLocaleDateString("pt-PT");
    const time = now.toLocaleTimeString("pt-PT");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${date}</td>
        <td>${tipo === "ENTRAR" ? time : ""}</td>
        <td>${tipo === "SAIR" ? time : ""}</td>
        <td>${label}</td>
        <td>${cardCode}</td>
        <td>${mesa}</td>
        <td>${tipo}</td>
    `;
    table.appendChild(row);
}

//Employees modal 
function openModal() {
    document.getElementById("modal").style.display = "flex";
    loadEmployees();
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

async function loadEmployees() {
    const res = await fetch("http://192.168.1.66:3000/usuarios");
    const users = await res.json();
    const list = document.getElementById("lista-colaboradores");
    list.innerHTML = "";

    users.forEach(u => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${u.id}</td>
            <td>${u.cartao_numero}</td>
            <td>${u.cartao_codigo}</td>
            <td>${u.nome}</td>
            <td>${u.rol}</td>
            <td><button class="red" onclick="removeEmployee('${u.cartao_codigo}')">✕</button></td>
        `;
        list.appendChild(row);
    });
}

async function addEmployee() {
    const cardNumber = document.getElementById("novo-cartao-numero").value;
    const cardCode = document.getElementById("novo-cartao-codigo").value;
    const name = document.getElementById("novo-nome").value;
    const role = document.getElementById("novo-rol").value;

    if (!cardNumber || !cardCode || !name || !role) {
        alert("Please fill in all fields");
        return;
    }

    await fetch("http://192.168.1.66:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cartao_numero: cardNumber,
            cartao_codigo: cardCode,
            nome: name,
            rol: role
        })
    });

    document.getElementById("novo-cartao-numero").value = "";
    document.getElementById("novo-cartao-codigo").value = "";
    document.getElementById("novo-nome").value = "";
    document.getElementById("novo-rol").value = "";
    loadEmployees();
}

//Remove employee
async function removeEmployee(cartao_codigo) {
    await fetch(`http://192.168.1.66:3000/usuarios/${cartao_codigo}`, {
        method: "DELETE"
    });
    loadEmployees();
}