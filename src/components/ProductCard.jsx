import {
  formatPrice,
  calculateFinalPrice,
  getProductStatus
} from '../utils/shopHelpers';

function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const hasDiscount = product.discountPercent > 0;
  const statusText = getProductStatus(product);

  const badgeClassMap = {
    sale: 'badge--sale',
    hit: 'badge--hit',
    new: 'badge--new'
  };

  return (
    <article
      className={`product-card hover-card ${
        hasDiscount ? 'product-card--discount' : ''
      } ${product.badgeType === 'hit' ? 'product-card--featured' : ''}`}
    >
      <div className="product-card__media img-zoom-wrapper">
        <img
          className="product-card__image"
          src={product.image}
          srcSet={`${product.image480} 480w, ${product.image} 640w, ${product.image960} 960w`}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          alt={product.alt || product.title}
          width="640"
          height="480"
          loading="lazy"
        />

        {product.badgeText && (
          <span
            className={`product-card__badge ${
              badgeClassMap[product.badgeType] || 'badge--hit'
            }`}
          >
            {product.badgeText}
          </span>
        )}

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-label={
            isFavorite
              ? `Убрать ${product.title} из избранного`
              : `Добавить ${product.title} в избранное`
          }
          aria-pressed={isFavorite}
        >
          <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
        </button>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">{product.categoryLabel}</span>
          <span className="product-card__rating" aria-label={`Рейтинг ${product.rating} из 5`}>
            ★ {product.rating}
          </span>
        </div>

        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(finalPrice)}</span>
          {hasDiscount && (
            <span className="product-card__old-price">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <p
          className={`product-card__status ${
            product.isAvailable ? 'product--status-in' : 'product--status-out'
          }`}
        >
          ● {statusText}
        </p>

        <div className="product-card__actions">
          <button
            type="button"
            className="button button--primary"
            disabled={!product.isAvailable}
            data-action="add-to-cart"
            data-product-id={product.id}
            onClick={() => onAddToCart(product)}
          >
            {product.isAvailable ? 'В корзину' : 'Нет в наличии'}
          </button>

          <button
            type="button"
            className="button button--secondary"
            onClick={() => onSelectProduct(product.id)}
          >
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;