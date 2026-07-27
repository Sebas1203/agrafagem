import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EmployeeModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadEmployees();
    }
  }, [isOpen]);

  async function loadEmployees() {
    const res = await fetch('/usuarios');
    const users = await res.json();
    setEmployees(users);
  }

  async function addEmployee() {
    if (!cardNumber || !cardCode || !name || !role) {
      alert(t('alerts.fillAllFields'));
      return;
    }

    await fetch('/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartao_numero: cardNumber,
        cartao_codigo: cardCode,
        nome: name,
        rol: role,
      }),
    });

    setCardNumber('');
    setCardCode('');
    setName('');
    setRole('');
    loadEmployees();
  }

  async function removeEmployee(codigo) {
    await fetch(`/usuarios/${codigo}`, { method: 'DELETE' });
    loadEmployees();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t('modal.title')}</h2>

        <div className="modal-form">
          <input
            type="text"
            placeholder={t('modal.cardNumberPlaceholder')}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('modal.namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('modal.cardCodePlaceholder')}
            value={cardCode}
            onChange={(e) => setCardCode(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">{t('modal.roleSelectPlaceholder')}</option>
            <option value="OPERADOR">{t('modal.roleOperator')}</option>
          </select>

          <button className="btn-verde" onClick={addEmployee}>{t('modal.add')}</button>
        </div>

        <table id="colaboradores-table">
          <thead>
            <tr>
              <th>{t('modal.table.id')}</th>
              <th>{t('modal.table.cardNumber')}</th>
              <th>{t('modal.table.cardCode')}</th>
              <th>{t('modal.table.name')}</th>
              <th>{t('modal.table.role')}</th>
              <th>{t('modal.table.remove')}</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.cartao_numero}</td>
                <td>{u.cartao_codigo}</td>
                <td>{u.nome}</td>
                <td>{u.rol}</td>
                <td>
                  <button className="red" onClick={() => removeEmployee(u.cartao_codigo)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="red" onClick={onClose}>{t('modal.close')}</button>
      </div>
    </div>
  );
}
