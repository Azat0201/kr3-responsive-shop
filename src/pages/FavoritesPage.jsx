import ProductList from '../components/ProductList';

function FavoritesPage({
  favoriteProducts,
  favorites,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite
}) {
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
          Избранное
        </span>
      </nav>

      <div className="section-header-row">
        <div>
          <h1 className="page-title">Избранные товары</h1>
          <p className="text-muted">
            Сохранённые устройства для вашего будущего рабочего места ({favoriteProducts.length}).
          </p>
        </div>
        <button
          type="button"
          className="button button--secondary"
          onClick={() => onNavigate('catalog')}
        >
          Вернуться в каталог
        </button>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="products-empty">
          <h3>В избранном пока нет товаров</h3>
          <p>
            Нажмите на значок сердечка (♡) на карточке любого устройства в каталоге, чтобы сохранить его здесь.
          </p>
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate('catalog')}
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <ProductList
          products={favoriteProducts}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}

export default FavoritesPage;