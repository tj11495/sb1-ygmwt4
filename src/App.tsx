import React, { useState } from 'react';
import { Baby, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NameForm from './components/NameForm';
import NameList from './components/NameList';
import { NameData } from './types';
import { generateNames } from './services/openaiService';

function App() {
  const { t, i18n } = useTranslation();
  const [generatedNames, setGeneratedNames] = useState<NameData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateNames = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const names = await generateNames(formData);
      setGeneratedNames(names.map(name => ({ ...name, isFavorite: false })));
    } catch (err) {
      setError(t('errorMessage'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'th' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8 relative">
        <button
          onClick={toggleLanguage}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          <Languages size={20} />
        </button>
        <header className="text-center mb-6 sm:mb-8">
          <Baby className="inline-block text-pink-500 mb-2 sm:mb-4" size={36} />
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">{t('title')}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t('subtitle')}</p>
        </header>
        <NameForm onGenerateNames={handleGenerateNames} />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {isLoading && <p className="text-center mb-4">{t('generatingNames')}</p>}
        {generatedNames.length > 0 && <NameList names={generatedNames} />}
        <footer className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
          © 2024-2025 Namefast by TJN
        </footer>
      </div>
    </div>
  );
}

export default App;