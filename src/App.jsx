import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import { products, reviews, faqItems } from './data/products';
import {
  calculateTotalPrice,
  getPreparedProducts,
  findProductById,
  runConsoleVerification
} from './utils/shopHelpers';
import {
  formatPhoneMask,
  validateNameField,
  validateEmailField,
  validatePhoneField,
  validateOrderForm
} from './utils/validation';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return sessionStorage.getItem('shop_current_page') || 'home';
  });
  const [selectedProductId, setSelectedProductId] = useState(1);

  useEffect(() => {
    sessionStorage.setItem('shop_current_page', currentPage);
  }, [currentPage]);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('shop_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shop_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('shop_favorites');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [catalogState, setCatalogState] = useState({
    query: '',
    category: 'all',
    badge: 'all',
    budget: 'all',
    sort: 'default'
  });

  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    topic: 'product',
    comment: '',
    agreement: false
  });
  const [orderErrors, setOrderErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('shop_theme', theme);
    } catch {
      // Игнорируем ограничения хранилища
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('shop_cart', JSON.stringify(cart));
    } catch {
      // Игнорируем ограничения хранилища
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('shop_favorites', JSON.stringify(favorites));
    } catch {
      // Игнорируем ограничения хранилища
    }
  }, [favorites]);

  useEffect(() => {
    runConsoleVerification(products);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const preparedProducts = useMemo(
    () => getPreparedProducts(products, { ...catalogState, favorites }),
    [catalogState, favorites]
  );

  const popularProducts = useMemo(
    () => products.filter((p) => p.isPopular),
    []
  );

  const favoriteProducts = useMemo(
    () => products.filter((p) => favorites.includes(p.id)),
    [favorites]
  );

  const activeProduct = useMemo(
    () => findProductById(products, selectedProductId) || products[0],
    [selectedProductId]
  );

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalCartSum = useMemo(() => calculateTotalPrice(cart), [cart]);

  const handleAddToCart = (product) => {
    if (!product.isAvailable) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Товар «${product.title}» добавлен в корзину`);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const item = findProductById(products, productId);
      if (item) {
        showToast(
          exists
            ? `«${item.title}» удалён из избранного`
            : `«${item.title}» добавлен в избранное`
        );
      }
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    navigateTo('product');
  };

  const handleGlobalSearch = (queryText) => {
    setCatalogState((prev) => ({ ...prev, query: queryText }));
    navigateTo('catalog');
  };

  const handleResetFilters = () => {
    setCatalogState({
      query: '',
      category: 'all',
      badge: 'all',
      budget: 'all',
      sort: 'default'
    });
  };

  const handleOrderInputChange = (field, value) => {
    const nextValue = field === 'phone' ? formatPhoneMask(value) : value;
    setOrderForm((prev) => ({ ...prev, [field]: nextValue }));
    setOrderSuccess('');

    setOrderErrors((prev) => {
      const updated = { ...prev };
      if (field === 'name') {
        const err = validateNameField(nextValue);
        err ? (updated.name = err) : delete updated.name;
      }
      if (field === 'email') {
        const err = validateEmailField(nextValue);
        err ? (updated.email = err) : delete updated.email;
      }
      if (field === 'phone') {
        const err = validatePhoneField(nextValue);
        err ? (updated.phone = err) : delete updated.phone;
      }
      if (field === 'agreement' && nextValue) {
        delete updated.agreement;
      }
      return updated;
    });
  };

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    const errors = validateOrderForm(orderForm, cart);
    setOrderErrors(errors);
    if (Object.keys(errors).length > 0) {
      setOrderSuccess('');
      return;
    }

    const payload = {
      name: orderForm.name.trim(),
      email: orderForm.email.trim(),
      phone: orderForm.phone.trim(),
      topic: orderForm.topic,
      date: orderForm.date || 'Ближайшая дата',
      items: cart.map((i) => `${i.title} (x${i.quantity})`).join(', '),
      totalSum: totalCartSum
    };
    console.table(payload);

    setOrderSuccess(
      `Заказ на сумму ${totalCartSum.toLocaleString('ru-RU')} руб. успешно оформлен! Мы свяжемся с вами по номеру ${orderForm.phone}.`
    );
    setCart([]);
    setOrderForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      topic: 'product',
      comment: '',
      agreement: false
    });
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Перейти к основному содержимому
      </a>

      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={() => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))}
        cartCount={totalCartItems}
        favoritesCount={favorites.length}
        onGlobalSearch={handleGlobalSearch}
      />

      {toastMessage && (
        <div className="toast-banner" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      <main id="main" className="main-content">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            popularProducts={popularProducts}
            reviews={reviews}
            faqItems={faqItems}
            favorites={favorites}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            products={products}
            preparedProducts={preparedProducts}
            catalogState={catalogState}
            onUpdateCatalogState={(patch) =>
              setCatalogState((prev) => ({ ...prev, ...patch }))
            }
            onResetFilters={handleResetFilters}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            totalCartItems={totalCartItems}
            totalCartSum={totalCartSum}
          />
        )}

        {currentPage === 'product' && (
          <ProductPage
            products={products}
            activeProduct={activeProduct}
            onSelectProduct={setSelectedProductId}
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.includes(activeProduct.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'favorites' && (
          <FavoritesPage
            favoriteProducts={favoriteProducts}
            favorites={favorites}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            totalCartItems={totalCartItems}
            totalCartSum={totalCartSum}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={(id) =>
              setCart((prev) => prev.filter((item) => item.id !== id))
            }
            onClearCart={() => setCart([])}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'order' && (
          <OrderPage
            cart={cart}
            totalCartItems={totalCartItems}
            totalCartSum={totalCartSum}
            orderForm={orderForm}
            orderErrors={orderErrors}
            orderSuccess={orderSuccess}
            onInputChange={handleOrderInputChange}
            onSubmit={handleOrderSubmit}
            onReset={() => {
              setOrderForm({
                name: '',
                email: '',
                phone: '',
                date: '',
                topic: 'product',
                comment: '',
                agreement: false
              });
              setOrderErrors({});
              setOrderSuccess('');
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
      </main>

      <Footer onNavigate={navigateTo} cartCount={totalCartItems} />

      <a
        href="#main"
        className="scroll-to-top back-to-top"
        aria-label="Наверх к началу страницы"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        ↑
      </a>
    </div>
  );
}

export default App;