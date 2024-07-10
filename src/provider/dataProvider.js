import {createContext, useContext, useEffect, useState} from "react";
import {tokenContext} from "./tokenProvider";

const products_api = JSON.parse(localStorage.getItem("products")) || [
  {
    "id": 1,
    "price": 10,
    "quantity": 100,
    "manufacturer_id": 1,
    "model_id": 1,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 2,
    "price": 12,
    "quantity": 200,
    "model_id": 3,
    "manufacturer_id": 2,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 3,
    "price": 20,
    "quantity": 50,
    "model_id": 2,
    "manufacturer_id": 1,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 4,
    "price": 25,
    "quantity": 30,
    "model_id": 5,
    "manufacturer_id": 2,
    "supplier_id": 2,
    "category_id": 3,
  },
  {
    "id": 5,
    "price": 150,
    "quantity": 10,
    "model_id": 1,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 3,
  },
  {
    "id": 6,
    "price": 10,
    "quantity": 100,
    "model_id": 3,
    "manufacturer_id": 3,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 7,
    "price": 12,
    "quantity": 200,
    "model_id": 5,
    "manufacturer_id": 2,
    "supplier_id": 5,
    "category_id": 4,
  },
  {
    "id": 8,
    "price": 20,
    "quantity": 50,
    "model_id": 1,
    "manufacturer_id": 5,
    "supplier_id": 3,
    "category_id": 1,
  },
  {
    "id": 9,
    "price": 25,
    "quantity": 30,
    "model_id": 2,
    "manufacturer_id": 4,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 10,
    "price": 150,
    "quantity": 10,
    "model_id": 2,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 4,
  },
  {
    "id": 11,
    "price": 10,
    "quantity": 100,
    "model_id": 4,
    "manufacturer_id": 1,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 12,
    "price": 12,
    "quantity": 200,
    "model_id": 5,
    "manufacturer_id": 2,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 13,
    "price": 20,
    "quantity": 50,
    "model_id": 1,
    "manufacturer_id": 1,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 14,
    "price": 25,
    "quantity": 30,
    "model_id": 5,
    "manufacturer_id": 2,
    "supplier_id": 2,
    "category_id": 3,
  },
  {
    "id": 15,
    "price": 150,
    "quantity": 10,
    "model_id": 1,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 3,
  },
  {
    "id": 16,
    "price": 10,
    "quantity": 100,
    "model_id": 3,
    "manufacturer_id": 3,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 17,
    "price": 12,
    "quantity": 200,
    "model_id": 3,
    "manufacturer_id": 2,
    "supplier_id": 5,
    "category_id": 4,
  },
  {
    "id": 18,
    "price": 20,
    "quantity": 50,
    "model_id": 3,
    "manufacturer_id": 5,
    "supplier_id": 3,
    "category_id": 1,
  },
  {
    "id": 19,
    "price": 25,
    "quantity": 30,
    "model_id": 1,
    "manufacturer_id": 4,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 20,
    "price": 150,
    "quantity": 10,
    "model_id": 1,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 4,
  },
  {
    "id": 21,
    "price": 10,
    "quantity": 100,
    "model_id": 1,
    "manufacturer_id": 1,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 22,
    "price": 12,
    "quantity": 200,
    "model_id": 3,
    "manufacturer_id": 2,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 23,
    "price": 20,
    "quantity": 50,
    "model_id": 3,
    "manufacturer_id": 1,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 24,
    "price": 25,
    "quantity": 30,
    "model_id": 2,
    "manufacturer_id": 2,
    "supplier_id": 2,
    "category_id": 3,
  },
  {
    "id": 25,
    "price": 150,
    "quantity": 10,
    "model_id": 2,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 3,
  },
  {
    "id": 26,
    "price": 10,
    "quantity": 100,
    "model_id": 1,
    "manufacturer_id": 3,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 27,
    "price": 12,
    "quantity": 200,
    "model_id": 4,
    "manufacturer_id": 2,
    "supplier_id": 5,
    "category_id": 4,
  },
  {
    "id": 28,
    "price": 20,
    "quantity": 50,
    "model_id": 4,
    "manufacturer_id": 5,
    "supplier_id": 3,
    "category_id": 1,
  },
  {
    "id": 29,
    "price": 25,
    "quantity": 30,
    "model_id": 1,
    "manufacturer_id": 4,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 30,
    "price": 150,
    "quantity": 10,
    "model_id": 2,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 4,
  },
  {
    "id": 31,
    "price": 10,
    "quantity": 100,
    "model_id": 1,
    "manufacturer_id": 1,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 32,
    "price": 12,
    "quantity": 200,
    "model_id": 5,
    "manufacturer_id": 2,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 33,
    "price": 20,
    "quantity": 50,
    "model_id": 2,
    "manufacturer_id": 1,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 34,
    "price": 25,
    "quantity": 30,
    "model_id": 3,
    "manufacturer_id": 2,
    "supplier_id": 2,
    "category_id": 3,
  },
  {
    "id": 35,
    "price": 150,
    "quantity": 10,
    "model_id": 3,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 3,
  },
  {
    "id": 36,
    "price": 10,
    "quantity": 100,
    "model_id": 5,
    "manufacturer_id": 3,
    "supplier_id": 2,
    "category_id": 1,
  },
  {
    "id": 37,
    "price": 12,
    "quantity": 200,
    "model_id": 5,
    "manufacturer_id": 2,
    "supplier_id": 5,
    "category_id": 4,
  },
  {
    "id": 38,
    "price": 20,
    "quantity": 50,
    "model_id": 3,
    "manufacturer_id": 5,
    "supplier_id": 3,
    "category_id": 1,
  },
  {
    "id": 39,
    "price": 25,
    "quantity": 30,
    "model_id": 2,
    "manufacturer_id": 4,
    "supplier_id": 1,
    "category_id": 1,
  },
  {
    "id": 40,
    "price": 150,
    "quantity": 10,
    "model_id": 2,
    "manufacturer_id": 1,
    "supplier_id": 3,
    "category_id": 4,
  }
]

const manufacturers_api = JSON.parse(localStorage.getItem("manufacturers")) || [
  {
    "id": 1,
    "name": "Компания A",
    "country": "США",
    "contact_phone": "+1-123-456-7890",
    "email": "contact@companya.com",
    "address": "123 Main St, City, USA",
    "createdAt": "2023-01-01",
    "updatedAt": "2024-06-01 17:39:03"
  },
  {
    "id": 2,
    "name": "Компания B",
    "country": "Германия",
    "contact_phone": "+49-123-456-7890",
    "email": "contact@companyb.com",
    "address": "456 Hauptstrasse, Berlin",
    "createdAt": "2023-02-15 16:21:10",
    "updatedAt": "2024-06-10 09:11:03"
  },
  {
    "id": 3,
    "name": "Компания C",
    "country": "Япония",
    "contact_phone": "+81-123-456-7890",
    "email": "contact@companyc.jp",
    "address": "789 Tokyo St, Tokyo",
    "createdAt": "2023-03-20 12:53:10",
    "updatedAt": "2024-06-20 11:21:43"
  },
  {
    "id": 4,
    "name": "Компания D",
    "country": "Китай",
    "contact_phone": "+86-123-456-7890",
    "email": "contact@companyd.cn",
    "address": "101 Beijing Rd, Beijing",
    "createdAt": "2023-04-25 05:53:10",
    "updatedAt": "2024-06-25 01:17:43"
  },
  {
    "id": 5,
    "name": "Компания E",
    "country": "Южная Корея",
    "contact_phone": "+82-123-456-7890",
    "email": "contact@companye.kr",
    "address": "202 Seoul St, Seoul",
    "createdAt": "2023-05-30",
    "updatedAt": "2024-06-30"
  }
]

const models_api = JSON.parse(localStorage.getItem("models")) || [
    {
      "id": 1,
      "name": "Сервер",
      "description": "Мощный сервер для хранения данных и работы приложений.",
      "imageUrl": "https://dummyimage.com/50x50"
    },
    {
      "id": 2,
      "name": "Маршрутизатор",
      "description": "Устройство для распределения интернет-трафика в сети.",
      "imageUrl": "https://dummyimage.com/50x50"
    },
    {
      "id": 3,
      "name": "Ноутбук",
      "description": "Портативный компьютер для работы в офисе и удаленно.",
      "imageUrl": "https://dummyimage.com/50x50"
    },
    {
      "id": 4,
      "name": "Коммутатор",
      "description": "Сетевое устройство для соединения нескольких устройств в сети.",
      "imageUrl": "https://dummyimage.com/50x50"
    },
    {
      "id": 5,
      "name": "Брандмауэр",
      "description": "Устройство для обеспечения безопасности сети.",
      "imageUrl": "https://dummyimage.com/50x50"
    }
]

const suppliers_api = JSON.parse(localStorage.getItem("suppliers")) || [
  {
    "id": 1,
    "name": "Поставщик A",
    "contact_phone": "+7-123-456-7890",
    "email": "supplierA@domain.com",
    "address": "ул. Пушкина, д. 1",
    "createdAt": "2022-11-25",
    "updatedAt": "2024-06-05"
  },
  {
    "id": 2,
    "name": "Поставщик B",
    "contact_phone": "+7-234-567-8901",
    "email": "supplierB@domain.com",
    "address": "ул. Лермонтова, д. 2",
    "createdAt": "2023-03-10",
    "updatedAt": "2024-06-15 11:42:12"
  },
  {
    "id": 3,
    "name": "Поставщик C",
    "contact_phone": "+7-345-678-9012",
    "email": "supplierC@domain.com",
    "address": "ул. Чехова, д. 3",
    "createdAt": "2023-05-15",
    "updatedAt": "2024-06-25 01:17:43"
  },
  {
    "id": 4,
    "name": "Поставщик D",
    "contact_phone": "+7-456-789-0123",
    "email": "supplierD@domain.com",
    "address": "ул. Толстого, д. 4",
    "createdAt": "2023-07-20",
    "updatedAt": "2024-06-30"
  },
  {
    "id": 5,
    "name": "Поставщик E",
    "contact_phone": "+7-567-890-1234",
    "email": "supplierE@domain.com",
    "address": "ул. Достоевского, д. 5",
    "createdAt": "2023-09-25",
    "updatedAt": "2024-07-01 12:31:23"
  }
]

const categories_api = JSON.parse(localStorage.getItem("categories")) || [
  {
    "id": 1,
    "name": "Батареи",
    "description": "Различные типы батарей",
    "createdAt": "2022-12-01",
    "updatedAt": "2024-06-01 17:39:03"
  },
  {
    "id": 2,
    "name": "Зарядные устройства",
    "description": "Зарядные устройства",
    "createdAt": "2023-01-20",
    "updatedAt": "2024-06-10 09:11:03"
  },
  {
    "id": 3,
    "name": "Аккумуляторы",
    "description": "Автомобильные аккумуляторы",
    "createdAt": "2023-02-25",
    "updatedAt": "2024-06-20 11:21:43"
  },
  {
    "id": 4,
    "name": "Солнечные панели",
    "description": "Солнечные панели и аксессуары",
    "createdAt": "2023-03-15",
    "updatedAt": "2024-06-15 11:42:12"
  },
  {
    "id": 5,
    "name": "Повербанки",
    "description": "Портативные зарядные устройства",
    "createdAt": "2023-04-10",
    "updatedAt": "2024-06-25 01:17:43"
  }
]

export const dataProvider = createContext();

export function DataProvider({children}) {
  // Data
  const [products, setProducts] = useState(products_api)
  const [manufacturers, setManufacturers] = useState(manufacturers_api);
  const [models, setModels] = useState(models_api);
  const [suppliers, setSuppliers] = useState(suppliers_api);
  const [categories, setCategories] = useState(categories_api);
  // Modals
  const [isProducts, setIsProducts] = useState(false);
  const [isManufacturers, setIsManufacturers] = useState(false);
  const [isModels, setIsModels] = useState(false);
  const [isSuppliers, setIsSuppliers] = useState(false);
  const [isCategories, setIsCategories] = useState(false);
  // Ids
  const [productId, setProductId] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [modelId, setModelId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const {currentUser} = useContext(tokenContext);

  useEffect(() => {
    currentUser.token && localStorage.setItem("products", JSON.stringify(products))
    currentUser.token && localStorage.setItem('manufacturers', JSON.stringify(manufacturers))
    currentUser.token && localStorage.setItem('models', JSON.stringify(models))
    currentUser.token && localStorage.setItem("suppliers", JSON.stringify(suppliers))
    currentUser.token && localStorage.setItem('categories', JSON.stringify(categories))
  }, [currentUser, products, manufacturers, models, suppliers, categories])

  return (
    <dataProvider.Provider
      value={{
        products, setProducts, manufacturers, models, setModels,
        setManufacturers, categories, setCategories, suppliers,
        setSuppliers, isProducts, setIsProducts, isManufacturers,
        setIsManufacturers, isModels, setIsModels, isSuppliers,
        setIsSuppliers, isCategories, setIsCategories,
        productId, setProductId, manufacturerId, setManufacturerId,
        modelId, setModelId, supplierId, setSupplierId, categoryId,
        setCategoryId
      }}>
      {children}
    </dataProvider.Provider>
  )
}