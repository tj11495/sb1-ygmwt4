import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { NameData } from '../types';

interface NameListProps {
  names: NameData[];
}

const NameList: React.FC<NameListProps> = ({ names }) => {
  const [favoriteNames, setFavoriteNames] = useState<NameData[]>([]);

  const toggleFavorite = (name: NameData) => {
    if (favoriteNames.some((n) => n.thai === name.thai)) {
      setFavoriteNames(favoriteNames.filter((n) => n.thai !== name.thai));
    } else {
      setFavoriteNames([...favoriteNames, name]);
    }
  };

  const exportNames = () => {
    const namesText = names
      .map((name) => `${name.thai} (${name.phonetic}): ${name.meaning}\nAcronym: ${name.acronym}`)
      .join('\n\n');
    const blob = new Blob([namesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thai_baby_names.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Generated Names</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((name, index) => (
          <div key={index} className="bg-gray-100 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
            <h3 className="text-lg sm:text-xl font-semibold mb-1">{name.thai}</h3>
            <p className="text-gray-600 mb-1">{name.phonetic}</p>
            <p className="text-sm text-gray-500 mb-2">{name.meaning}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">Acronym: {name.acronym}</p>
            <button
              onClick={() => toggleFavorite(name)}
              className={`mr-2 p-1 rounded-full ${
                favoriteNames.some((n) => n.thai === name.thai)
                  ? 'text-red-500'
                  : 'text-gray-400'
              }`}
            >
              <Heart size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
          AI-generated names based on your input criteria
        </p>
        <button
          onClick={exportNames}
          className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 text-sm"
        >
          <Share2 size={16} className="mr-2" />
          Export Names
        </button>
      </div>
    </div>
  );
};

export default NameList;