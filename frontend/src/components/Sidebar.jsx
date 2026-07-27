import { useTranslation } from 'react-i18next';
import logo from '../assets/lear_logo.png';
import LanguageSwitcher from './LanguageSwitcher';

export default function Sidebar({ cartao, etiqueta, onCartaoChange, onEtiquetaChange, onAction, onOpenModal }) {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <LanguageSwitcher />

      <img src={logo} alt="Logo da empresa" width="300" height="200" />
      <h1>{t('brand')}</h1>

      <input
        type="text"
        placeholder={t('sidebar.cardPlaceholder')}
        value={cartao}
        onChange={(e) => onCartaoChange(e.target.value)}
      />
      <input
        type="text"
        placeholder={t('sidebar.labelPlaceholder')}
        value={etiqueta}
        onChange={(e) => onEtiquetaChange(e.target.value)}
      />

      <h2>{t('sidebar.line', { numero: '1000' })}</h2>
      <button className="green" onClick={() => onAction('ENTRAR', 'M1', '1000')}>{t('sidebar.enter')} M1</button>
      <button className="red" onClick={() => onAction('SAIR', 'M1', '1000')}>{t('sidebar.exit')} M1</button>

      <button className="green" onClick={() => onAction('ENTRAR', 'M2', '1000')}>{t('sidebar.enter')} M2</button>
      <button className="red" onClick={() => onAction('SAIR', 'M2', '1000')}>{t('sidebar.exit')} M2</button>

      <h2>{t('sidebar.line', { numero: '2000' })}</h2>
      <button className="green" onClick={() => onAction('ENTRAR', 'MR2', '2000')}>{t('sidebar.enter')} MR2</button>
      <button className="red" onClick={() => onAction('SAIR', 'MR2', '2000')}>{t('sidebar.exit')} MR2</button>

      <button className="admin-btn bottom-btn" onClick={onOpenModal}>
        {t('sidebar.manageEmployees')}
      </button>
    </aside>
  );
}
