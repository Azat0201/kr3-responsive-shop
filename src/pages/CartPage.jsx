import { formatPrice, calculateFinalPrice } from '../utils/shopHelpers';

function CartPage({
  cart,
  totalCartItems,
  totalCartSum,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onNavigate
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
          Корзина
        </span>
      </nav>

      <h1 className="page-title">Корзина выбранных товаров</h1>

      {cart.length === 0 ? (
        <div className="products-empty">
          <h3>Ваша корзина пока пуста</h3>
          <p>Добавьте товары из каталога, чтобы оформить заявку.</p>
          <button
            type="button"
            className="button button--primary"
            onClick={() => onNavigate('catalog')}
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cart.map((item) => {
              const unitPrice = calculateFinalPrice(
                item.price,
                item.discountPercent
              );
              return (
                <article key={item.id} className="cart-item-card">
                  <img
                    src={item.image480}
                    alt={item.title}
                    className="cart-item-card__img"
                    width="120"
                    height="90"
                  />
                  <div className="cart-item-card__info">
                    <h3>{item.title}</h3>
                    <p className="text-muted">
                      {formatPrice(unitPrice)} за шт.
                    </p>
                  </div>
                  <div className="cart-item-card__qty">
                    <button
                      type="button"
                      className="button button--secondary"
                      aria-label={`Уменьшить количество ${item.title}`}
                      onClick={() => onUpdateCartQty(item.id, -1)}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      className="button button--secondary"
                      aria-label={`Увеличить количество ${item.title}`}
                      onClick={() => onUpdateCartQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-card__sum">
                    <strong>{formatPrice(unitPrice * item.quantity)}</strong>
                  </div>
                  <button
                    type="button"
                    className="button button--ghost"
                    aria-label={`Удалить ${item.title} из корзины`}
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    ✕
                  </button>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary-box">
            <h2>Итого по заказу</h2>
            <p>
              Позиций в корзине: <strong>{totalCartItems} шт.</strong>
            </p>
            <p className="cart-summary-box__total">
              Сумма: <strong>{formatPrice(totalCartSum)}</strong>
            </p>
            <p className="text-muted small-block">
              Состояние корзины автоматически сохраняется в localStorage.
            </p>
            <div className="cart-summary-box__actions">
              <button
                type="button"
                className="button button--primary button--full"
                onClick={() => onNavigate('order')}
              >
                Перейти к оформлению заявки
              </button>
              <button
                type="button"
                className="button button--secondary button--full"
                onClick={onClearCart}
              >
                Очистить корзину
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;