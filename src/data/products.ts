export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;  // Made image required
  }
  
  export const products: Product[] = [
    {
      id: '1',
      name: 'NPK 20-20-20',
      description: 'Balanced fertilizer for all crops',
      price: 1200,
      image: 'https://via.placeholder.com/150?text=NPK+20-20-20'
    },
    {
      id: '2',
      name: 'Urea',
      description: 'Nitrogen-rich fertilizer',
      price: 800,
      image: 'https://via.placeholder.com/150?text=Urea'
    },
    {
      id: '3',
      name: 'DAP',
      description: 'Diammonium Phosphate fertilizer',
      price: 1500,
      image: 'https://via.placeholder.com/150?text=DAP'
    },
    {
      id: '4',
      name: 'Potash',
      description: 'Potassium-rich fertilizer',
      price: 1000,
      image: 'https://via.placeholder.com/150?text=Potash'
    },
    {
      id: '5',
      name: 'Ammonium Sulphate',
      description: 'Sulphur-containing nitrogen fertilizer',
      price: 900,
      image: 'https://via.placeholder.com/150?text=Ammonium+Sulphate'
    },
    {
      id: '6',
      name: 'Single Super Phosphate',
      description: 'Phosphorus fertilizer with calcium',
      price: 1100,
      image: 'https://via.placeholder.com/150?text=Single+Super+Phosphate'
    },
    {
      id: '7',
      name: 'Zinc Sulphate',
      description: 'Micronutrient fertilizer for zinc deficiency',
      price: 1300,
      image: 'https://via.placeholder.com/150?text=Zinc+Sulphate'
    },
    {
      id: '8',
      name: 'Boronated DAP',
      description: 'DAP with boron micronutrient',
      price: 1600,
      image: 'https://via.placeholder.com/150?text=Boronated+DAP'
    },
    {
      id: '9',
      name: 'NPK 10-26-26',
      description: 'High phosphorus and potassium fertilizer',
      price: 1400,
      image: 'https://via.placeholder.com/150?text=NPK+10-26-26'
    },
    {
      id: '10',
      name: 'Calcium Nitrate',
      description: 'Calcium and nitrogen fertilizer',
      price: 950,
      image: 'https://via.placeholder.com/150?text=Calcium+Nitrate'
    }
  ];