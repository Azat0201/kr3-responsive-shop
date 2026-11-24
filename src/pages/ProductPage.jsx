import {
  formatPrice,
  calculateFinalPrice,
  getProductStatus
} from '../utils/shopHelpers';

function ProductPage({
  products,
  activeProduct,
  onSelectProduct,
  onNavigate,
  onAddToCart,
  isFavorite,
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
        <button
          type="button"
          className="breadcrumbs__link"
          onClick={() => onNavigate('catalog')}
        >
          Каталог
        </button>
        <span className="breadcrumbs__current" aria-current="page">
          {activeProduct.title}
        </span>
      </nav>

      <div className="product-detail-grid">
        <div className="product-detail__left">
          <div className="img-zoom-wrapper product-detail__image-box">
            <img
              className="product-detail__image"
              src={activeProduct.image960}
              srcSet={`${activeProduct.image480} 480w, ${activeProduct.image} 640w, ${activeProduct.image960} 960w`}
              sizes="(max-width: 900px) 100vw, 45vw"
              alt={activeProduct.alt}
              width="800"
              height="600"
            />
          </div>
        </div>

        <div className="product-detail__right">
          <div className="product-detail__badges">
            <span className="product-card__badge--inline badge--hit">
              {activeProduct.categoryLabel}
            </span>
            {activeProduct.badgeText && (
              <span className="product-card__badge--inline badge--sale">
                {activeProduct.badgeText}
              </span>
            )}
            <span
              className={`product-card__badge--inline ${
                activeProduct.isAvailable ? 'badge--new' : 'badge--muted'
              }`}
            >
              {getProductStatus(activeProduct)}
            </span>
          </div>

          <h1 className="page-title">{activeProduct.title}</h1>
          <p className="product-detail__lead">{activeProduct.description}</p>

          <h2 className="h5-title">
            Ключевые технологии и особенности модели:
          </h2>
          <div className="feature-steps">
            {activeProduct.features.map((feat, idx) => (
              <div key={idx} className="feature-step-card">
                <div className="feature-step-card__title">{feat.title}</div>
                <small className="feature-step-card__detail">
                  {feat.detail}
                </small>
              </div>
            ))}
          </div>

          <div className="product-buy-bar">
            <div>
              <span className="text-muted small-block">
                Стоимость с учётом скидки:
              </span>
              <div className="product-buy-bar__price">
                {formatPrice(
                  calculateFinalPrice(
                    activeProduct.price,
                    activeProduct.discountPercent
                  )
                )}
                {activeProduct.discountPercent > 0 && (
                  <span className="product-card__old-price">
                    {formatPrice(activeProduct.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="product-buy-bar__actions">
              <button
                type="button"
                className="button button--primary"
                disabled={!activeProduct.isAvailable}
                onClick={() => onAddToCart(activeProduct)}
              >
                {activeProduct.isAvailable ? 'Добавить в корзину' : 'Нет в наличии'}
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => onToggleFavorite(activeProduct.id)}
              >
                {isFavorite ? '♥ В избранном' : '♡ В избранное'}
              </button>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => onNavigate('catalog')}
              >
                Назад в каталог
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="specs-heading">
        <h2 id="specs-heading" className="section-title">
          Подробные технические характеристики
        </h2>
        <div className="table-wrapper">
          <table className="product-table">
            <caption>
              Технические параметры и комплектация: {activeProduct.title}
            </caption>
            <thead className="product-table__head">
              <tr className="product-table__row">
                <th
                  scope="col"
                  className="product-table__cell product-table__cell--header"
                >
                  Параметр
                </th>
                <th
                  scope="col"
                  className="product-table__cell product-table__cell--header"
                >
                  Значение
                </th>
              </tr>
            </thead>
            <tbody className="product-table__body">
              {activeProduct.specs.map((spec, index) => (
                <tr key={index} className="product-table__row">
                  <th
                    scope="row"
                    className="product-table__cell product-table__cell--title"
                  >
                    {spec.param}
                  </th>
                  <td
                    className="product-table__cell"
                    data-label={spec.param}
                  >
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;