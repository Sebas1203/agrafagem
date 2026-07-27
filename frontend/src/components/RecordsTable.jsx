import { useTranslation } from 'react-i18next';

export default function RecordsTable({ records }) {
  const { t } = useTranslation();

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="7">{t('records.title')}</th>
        </tr>
        <tr>
          <th>{t('records.date')}</th>
          <th>{t('records.entryTime')}</th>
          <th>{t('records.exitTime')}</th>
          <th>{t('records.label')}</th>
          <th>{t('records.cardNumber')}</th>
          <th>{t('records.table')}</th>
          <th>{t('records.type')}</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r, i) => (
          <tr key={i}>
            <td>{r.date}</td>
            <td>{r.tipo === 'ENTRAR' ? r.time : ''}</td>
            <td>{r.tipo === 'SAIR' ? r.time : ''}</td>
            <td>{r.label}</td>
            <td>{r.cardCode}</td>
            <td>{r.mesa}</td>
            <td>{r.tipo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
