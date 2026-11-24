import { useState } from 'react';

function Header({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
  cartCount,
  favoritesCount,
  onGlobalSearch
}) {
  const [headerQuery, setHeaderQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onGlobalSearch(headerQuery);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'about', label: 'О нас' }
  ];

  return (
    <header className="site-header">
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <a
            href="#main"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <span className="brand-logo__icon" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            <div>
              <span className="brand-logo__title">ShopProject</span>
              <span className="brand-logo__subtitle">
                Магазин компьютерной периферии и рабочих станций
              </span>
            </div>
          </a>

          <form
            className="header-search"
            role="search"
            onSubmit={handleSearchSubmit}
            aria-label="Поиск товаров по каталогу"
          >
            <label htmlFor="global-search-input" className="visually-hidden">
              Поиск товара по названию
            </label>
            <input
              id="global-search-input"
              className="header-search__input"
              type="search"
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              placeholder="Найти товар (клавиатура, 4K монитор) ..."
            />
            <button className="button button--dark" type="submit">
              Найти
            </button>
          </form>
        </div>
      </div>

      <div className="site-header__nav-bar">
        <div className="container site-header__nav-inner">
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            aria-label={mobileMenuOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span> Меню
          </button>

          <nav
            id="primary-navigation"
            className={`site-nav ${mobileMenuOpen ? 'site-nav--open' : ''}`}
            aria-label="Основная навигация"
          >
            <ul className="site-nav__list">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <li key={item.id} className="site-nav__item">
                    <button
                      type="button"
                      className={`site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className={`header-action-btn ${currentPage === 'favorites' ? 'header-action-btn--active' : ''}`}
              onClick={() => handleNavClick('favorites')}
              aria-label={`Перейти в избранное, товаров: ${favoritesCount}`}
            >
              <span aria-hidden="true">♥</span>
              <span>Избранное</span>
              <span className="header-badge" aria-live="polite">
                {favoritesCount}
              </span>
            </button>

            <button
              type="button"
              className={`header-action-btn ${currentPage === 'cart' ? 'header-action-btn--active' : ''}`}
              onClick={() => handleNavClick('cart')}
              aria-label={`Перейти в корзину, товаров: ${cartCount}`}
            >
              <span aria-hidden="true">🛒</span>
              <span>Корзина</span>
              <span className="header-badge" aria-live="polite">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
              aria-label={
                theme === 'dark'
                  ? 'Переключить на светлую тему оформления'
                  : 'Переключить на тёмную тему оформления'
              }
            >
              <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;