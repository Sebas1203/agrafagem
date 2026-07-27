import { useState } from 'react';
import './App.css';
import i18n from './i18n';
import Sidebar from './components/Sidebar';
import EmployeeModal from './components/EmployeeModal';
import RecordsTable from './components/RecordsTable';

async function validateCard(cartaoCodigo) {
  const res = await fetch(`/usuarios/${cartaoCodigo}`);
  if (!res.ok) {
    alert(i18n.t('alerts.cardNotFound'));
    return false;
  }
  await res.json();
  return true;
}

function App() {
  const [cartao, setCartao] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function action(tipo, mesa, linea) {
    const cardCode = cartao.trim();
    const label = etiqueta.trim();

    if (!cardCode || !label) {
      alert(i18n.t('alerts.scanCardAndLabel'));
      return;
    }

    const isValid = await validateCard(cardCode);
    if (!isValid) return;

    await fetch('/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartao_numero: '',
        cartao_codigo: cardCode,
        etiqueta: label,
        tipo,
        mesa,
        linea,
      }),
    });

    const now = new Date();
    setRecords((prev) => [
      ...prev,
      {
        date: now.toLocaleDateString('pt-PT'),
        time: now.toLocaleTimeString('pt-PT'),
        label,
        cardCode,
        mesa,
        tipo,
      },
    ]);

    setCartao('');
    setEtiqueta('');
  }

  return (
    <div className="container">
      <Sidebar
        cartao={cartao}
        etiqueta={etiqueta}
        onCartaoChange={setCartao}
        onEtiquetaChange={setEtiqueta}
        onAction={action}
        onOpenModal={() => setModalOpen(true)}
      />

      <EmployeeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main className="content">
        <RecordsTable records={records} />
      </main>
    </div>
  );
}

export default App;
