import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  return (
    <div className="language-switcher">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={code === current ? 'lang-active' : ''}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
