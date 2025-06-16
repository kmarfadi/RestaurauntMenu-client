import React, { useEffect, useState } from 'react';
import { PizzaCard } from './pizza-card';
import { fetchMenu } from '../../lib/services';
import { motion } from 'framer-motion';
import LottieLoader from './LottieLoader';
import { useTranslation } from 'react-i18next';
import type { Pizza } from '../../types';

interface Category {
  id: number;
  name: string;
  name_ar: string;
}

interface Item {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: number;
  image: string;
  category_id: number;
}

const PizzaMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredPizzas, setFilteredPizzas] = useState<Item[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu();
        setCategories(data.categories);
        setItems(data.items);
        setFilteredPizzas(data.items);
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredPizzas(items);
    } else {
      setFilteredPizzas(items.filter(item => item.category_id === selectedCategory));
    }
  }, [selectedCategory, items]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center font-cairo">{t('menu.title')}</h2>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <LottieLoader />
          <p className="text-gray-600 mt-4">{t('menu.loading')}</p>
        </div>
      </div>
    );
  }

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return i18n.language === 'ar' ? category?.name_ar || '' : category?.name || '';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center font-cairo">{t('menu.title')}</h2>
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-red-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('menu.all')}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-red-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i18n.language === 'ar' ? category.name_ar : category.name}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredPizzas.map((item) => {
          const pizza: Pizza = {
            id: item.id.toString(),
            name: i18n.language === 'ar' ? item.name_ar : item.name,
            description: i18n.language === 'ar' ? item.description_ar : item.description,
            price: item.price,
            image: item.image,
            category: getCategoryName(item.category_id)
          };
          return <PizzaCard key={item.id} pizza={pizza} />;
        })}
      </motion.div>
    </div>
  );
};

export default PizzaMenu;