import React from 'react';

interface DataPanelProps {
  agriculturalPrices: any[]; // Replace any with the actual type
  cryptoPrices: any[]; // Replace any with the actual type
}

const DataPanel: React.FC<DataPanelProps> = ({ agriculturalPrices, cryptoPrices }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Agricultural Prices</h3>
      {agriculturalPrices.map((item, index) => (
        <div key={index} className="text-sm">
          {item.name}: {item.price} ({item.change}%)
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4 mb-2">Crypto Prices</h3>
      {cryptoPrices.map((item, index) => (
        <div key={index} className="text-sm">
          {item.name}: {item.price} ({item.change}%)
        </div>
      ))}
    </div>
  );
};

export default DataPanel;
