import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NameFormProps {
  onGenerateNames: (formData: any) => void;
}

const NameForm: React.FC<NameFormProps> = ({ onGenerateNames }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    gender: '',
    characteristics: '',
    parentNames: '',
    birthDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateNames(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('gender.label')}
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {['male', 'female', 'neutral'].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => handleGenderSelect(gender)}
              className={`py-2 px-4 rounded-md text-sm sm:text-base font-medium transition-colors duration-200 ${
                formData.gender === gender
                  ? gender === 'male'
                    ? 'bg-blue-500 text-white'
                    : gender === 'female'
                    ? 'bg-pink-500 text-white'
                    : 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t(`gender.options.${gender}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="characteristics" className="block text-sm font-medium text-gray-700 mb-1">
            {t('characteristics.label')}
          </label>
          <input
            type="text"
            id="characteristics"
            name="characteristics"
            value={formData.characteristics}
            onChange={handleChange}
            placeholder={t('characteristics.placeholder')}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="parentNames" className="block text-sm font-medium text-gray-700 mb-1">
            {t('parentNames.label')}
          </label>
          <input
            type="text"
            id="parentNames"
            name="parentNames"
            value={formData.parentNames}
            onChange={handleChange}
            placeholder={t('parentNames.placeholder')}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            {t('birthDate.label')}
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        {t('generateButton')}
      </button>
    </form>
  );
};

export default NameForm;