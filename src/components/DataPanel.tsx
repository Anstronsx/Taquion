import React from 'react';

interface PriceData {
  name: string;
  price: string;
  change: number;
}

interface DataPanelProps {
  agriculturalPrices: PriceData[];
  cryptoPrices: PriceData[];
}

const DataPanel: React.FC<DataPanelProps> = ({ agriculturalPrices, cryptoPrices }) => {
  return (
    <div className="flex flex-col space-y-6"> {/* Space between sections */}
      {/* Agricultural Prices Section */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-white text-opacity-90">Agricultural Prices</h3>
        <div className="space-y-3"> {/* Space between price items */}
          {agriculturalPrices.map((item, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-3 rounded-md shadow-sm flex justify-between items-center border border-gray-700"> {/* Styled price item */}
              <span className="text-white text-sm font-medium">{item.name}</span>
              <span className="text-gray-300 text-sm">{item.price}</span>
              <span className={`text-sm font-semibold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Crypto Prices Section */}
      <div>
        <h3 className="text-lg font-bold mt-6 mb-3 text-white text-opacity-90">Crypto Prices</h3>
         <div className="space-y-3"> {/* Space between price items */}
          {cryptoPrices.map((item, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-3 rounded-md shadow-sm flex justify-between items-center border border-gray-700"> {/* Styled price item */}
              <span className="text-white text-sm font-medium">{item.name}</span>
              <span className="text-gray-300 text-sm">{item.price}</span>
             <span className={`text-sm font-semibold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
               {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
             </span>
           </div>
         ))}
        </div>
      </div>
    </div>
  );
};

export default DataPanel;
