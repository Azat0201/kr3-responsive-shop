import ProductList from '../components/ProductList';
import { formatPrice } from '../utils/shopHelpers';

function CatalogPage({
  products,
  preparedProducts,
  catalogState,
  onUpdateCatalogState,
  onResetFilters,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
  totalCartItems,
  totalCartSum
}) {
  const peripheralsCount = products.filter((p) => p.category === 'peripherals').length;
  const audioCount = products.filter((p) => p.category === 'audio').length;
  const monitorsCount = products.filter((p) => p.category === 'monitors').length;

  return (
    <div className="container section animate-fade-up">
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <button
          type="button"
          className="breadcrumbs__link"
          onClick={() => onNavigate('home')}
        >
          Главная
        </button>
        <span className="breadcrumbs__current" aria-current="page">
          Каталог товаров
        </span>
      </nav>

      <div className="section-header-row">
        <div>
          <h1 className="page-title">Каталог товаров для ПК</h1>
          <p className="text-muted">
            Выберите категорию, бюджет или отсортируйте устройства по цене.
          </p>
        </div>
      </div>

      <section
        className="sticky-filter-bar"
        aria-label="Управление каталогом: поиск, фильтрация и сортировка"
      >
        <div className="catalog-controls-grid">
          <div className="catalog-controls__group">
            <label htmlFor="catalog-search">Поиск товара</label>
            <input
              id="catalog-search"
              className="catalog-controls__input"
              type="search"
              value={catalogState.query}
              onChange={(e) =>
                onUpdateCatalogState({ query: e.target.value })
              }
              placeholder="Введите название (мышь, стол...)"
              autoComplete="off"
            />
          </div>

          <div className="catalog-controls__group">
            <label htmlFor="category-filter">Категория</label>
            <select
              id="category-filter"
              className="catalog-controls__select"
              value={catalogState.category}
              onChange={(e) =>
                onUpdateCatalogState({ category: e.target.value })
              }
            >
              <option value="all">Все категории ({products.length})</option>
              <option value="peripherals">Клавиатуры и мыши ({peripheralsCount})</option>
              <option value="audio">Аудио и стриминг ({audioCount})</option>
              <option value="monitors">Мониторы и мебель ({monitorsCount})</option>
            </select>
          </div>

          <div className="catalog-controls__group">
            <label htmlFor="badge-filter">Подборка</label>
            <select
              id="badge-filter"
              className="catalog-controls__select"
              value={catalogState.badge}
              onChange={(e) =>
                onUpdateCatalogState({ badge: e.target.value })
              }
            >
              <option value="all">Все статусы</option>
              <option value="favorites">Избранное ({favorites.length})</option>
              <option value="available">В наличии</option>
              <option value="hit">Хиты продаж</option>
              <option value="new">Новинки</option>
              <option value="sale">Со скидкой</option>
            </select>
          </div>

          <div className="catalog-controls__group">
            <label htmlFor="budget-filter">Бюджет</label>
            <select
              id="budget-filter"
              className="catalog-controls__select"
              value={catalogState.budget}
              onChange={(e) =>
                onUpdateCatalogState({ budget: e.target.value })
              }
            >
              <option value="all">Любой бюджет</option>
              <option value="2000">До 2 000 руб.</option>
              <option value="5000">До 5 000 руб.</option>
              <option value="15000">До 15 000 руб.</option>
            </select>
          </div>

          <div className="catalog-controls__group">
            <label htmlFor="sort-select">Сортировка</label>
            <select
              id="sort-select"
              className="catalog-controls__select"
              value={catalogState.sort}
              onChange={(e) =>
                onUpdateCatalogState({ sort: e.target.value })
              }
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="title-asc">По названию А–Я</option>
              <option value="rating-desc">По рейтингу</option>
            </select>
          </div>

          <div className="catalog-controls__group catalog-controls__group--reset">
            <button
              type="button"
              className="button button--secondary"
              onClick={onResetFilters}
              title="Сбросить фильтры"
              aria-label="Сбросить все фильтры каталога"
            >
              ✕ Сброс
            </button>
          </div>
        </div>
      </section>

      <div className="catalog-status-bar">
        <p className="catalog-count" aria-live="polite">
          Найдено товаров: <strong>{preparedProducts.length}</strong> из{' '}
          {products.length}
        </p>
        <p className="cart-counter" aria-live="polite">
          В корзине: <strong>{totalCartItems}</strong> шт. (
          {formatPrice(totalCartSum)})
        </p>
      </div>

      <ProductList
        products={preparedProducts}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onResetFilters={onResetFilters}
      />
    </div>
  );
}

export default CatalogPage;