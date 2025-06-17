import { useState, useEffect } from "react"
import { PizzaCard } from "./pizza-card"
import { fetchMenu } from "../../lib/services"
import { motion } from "framer-motion";
import LottieLoader from "./LottieLoader";
import { useTranslation } from "react-i18next";

interface Category {
  id: number
  name: string
  cover_image: string
}

interface Item {
  id: number
  name: string
  description: string
  price: number
  image: string
  category_id: number
  category?: string
}

export function PizzaMenu() {
  const { t } = useTranslation();

  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [category, setCategory] = useState<string>("all")
  const [filteredPizzas, setFilteredPizzas] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await fetchMenu()
        setCategories([ ...data.categories])
        setItems(data.items)
        setFilteredPizzas(data.items)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (category === "all") {
      setFilteredPizzas(items)
    } else {
      const filtered = items.filter((item) => item.category_id === parseInt(category))
      setFilteredPizzas(filtered)
    }
  }, [category, items])

  return (
    <div className="py-8 font-cairo">
      <h2 className="text-3xl font-cairo font-bold mb-8 text-center dark:text-white">{t("menu.title")}</h2>
      <div className="flex justify-center mb-8 pb-2">
        <div className="flex space-x-reverse space-x-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === "all"
                ? "bg-red-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {t("menu.all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id.toString())}
              className={`ml-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat.id.toString()
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {/* Use translation , or fallback to cat.name */}
              {t(`categories.${cat.id}`, cat.name)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap- max-w-5xl mx-auto">
        {loading ? (
          <div className="col-span-full flex flex-col justify-center items-center min-h-[300px]">
            <LottieLoader />
            <span className="mt-4 text-muted-foreground text-xs">{t("menu.loading")}</span>
          </div>
        ) : (
          category === "all" ? (
            categories.map((cat) => {
              const pizzasInCat = items.filter(item => item.category_id === cat.id);
              if (pizzasInCat.length === 0) return null;

              // You can define a color map for categories, or use a property from your category object if available.
              // Example color map (customize as needed):
              const categoryColors: Record<number, string> = {
                1: "bg-red-500",
                2: "bg-yellow-500",
                3: "bg-green-500",
                4: "bg-blue-500",
                // ...add more as needed
              };
              const lineColor = categoryColors[cat.id] || "bg-red-500";

              return (
                <div key={cat.id} className="col-span-full mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <motion.span
                      className={`inline-block w-10 h-px rounded mx-2 ${lineColor}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      style={{ originX: 0, display: "inline-block" }}
                    />
                    <motion.h3
                      className="text-xl font-extrabold tracking-tight dark:text-white text-center mx-2 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                    >
                      {t(`categories.${cat.id}`, cat.name)}
                    </motion.h3>
                    <motion.span
                      className={`inline-block w-10 h-px rounded mx-2 ${lineColor}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      style={{ originX: 1, display: "inline-block" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pizzasInCat.map((pizza) => (
                      <motion.div
                        key={pizza.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1 }}
                      >
                        <PizzaCard pizza={{ ...pizza, id: pizza.id.toString(), category: pizza.category || "" }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            filteredPizzas.map((pizza) => (
              <motion.div
                key={pizza.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <PizzaCard pizza={{ ...pizza, id: pizza.id.toString(), category: pizza.category || "" }} />
              </motion.div>
            ))
          )
        )}
      </div>
    </div>
  );
}