import ProductCard from './ProductCard';

function ProductList({
  products,
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onResetFilters,
  emptyTitle = 'По выбранным условиям товары не найдены',
  emptyDescription = 'Попробуйте изменить поисковый запрос или сбросить параметры фильтрации.'
}) {
  if (!products || products.length === 0) {
    return (
      <div className="products-empty" role="status" aria-live="polite">
        <h3>{emptyTitle}</h3>
        <p>{emptyDescription}</p>
        {onResetFilters && (
          <button
            type="button"
            className="button button--primary"
            onClick={onResetFilters}
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="products-grid" data-products-container>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default ProductList;