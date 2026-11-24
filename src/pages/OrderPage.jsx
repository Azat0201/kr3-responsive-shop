import { formatPrice, calculateFinalPrice } from '../utils/shopHelpers';

function OrderPage({
  cart,
  totalCartItems,
  totalCartSum,
  orderForm,
  orderErrors,
  orderSuccess,
  onInputChange,
  onSubmit,
  onReset,
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
          onClick={() => onNavigate('cart')}
        >
          Корзина
        </button>
        <span className="breadcrumbs__current" aria-current="page">
          Оформление заявки
        </span>
      </nav>

      <div className="form-card-container">
        <div className="form-card">
          <div className="form-card__header">
            <h1 className="h4-title">Оформление заявки на заказ</h1>
          </div>

          <div className="form-card__body">
            <p className="form-note">
              Заполните контактные данные для подтверждения заказа. Поля, отмеченные звёздочкой (*), обязательны.
            </p>

            {orderSuccess && (
              <div className="success-message" role="status" aria-live="polite">
                <strong>Заявка успешно принята!</strong> {orderSuccess}
              </div>
            )}

            {/* Блок состава заказа из корзины вместо выбора одного товара */}
            <div className="order-cart-summary">
              <div className="order-cart-summary__header">
                <h2 className="h5-title">Состав заказа из корзины</h2>
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => onNavigate('cart')}
                >
                  Изменить корзину
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="order-cart-empty">
                  <p>
                    Ваша корзина пуста. Оформить заявку можно только после добавления товаров в корзину.
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
                <>
                  <ul className="order-cart-list">
                    {cart.map((item) => {
                      const unitPrice = calculateFinalPrice(
                        item.price,
                        item.discountPercent
                      );
                      return (
                        <li key={item.id} className="order-cart-list__item">
                          <span className="order-cart-list__title">
                            {item.title} <strong>× {item.quantity} шт. </strong>
                          </span>
                          <span className="order-cart-list__price">
                            {formatPrice(unitPrice * item.quantity)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="order-cart-summary__total">
                    <span>Итого ({totalCartItems} шт.):</span>
                    <strong>{formatPrice(totalCartSum)}</strong>
                  </div>
                </>
              )}
              {orderErrors.cart && (
                <p className="form-error" role="alert">
                  {orderErrors.cart}
                </p>
              )}
            </div>

            <form
              className="order-form order-form--aligned"
              id="order-form"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="order-form__group">
                <label className="order-form__label" htmlFor="order-name">
                  Ваше имя *
                </label>
                <input
                  className="order-form__input"
                  id="order-name"
                  name="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  autoComplete="given-name"
                  value={orderForm.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  aria-invalid={Boolean(orderErrors.name)}
                  aria-describedby={orderErrors.name ? 'order-name-error' : undefined}
                  required
                />
                {orderErrors.name && (
                  <p id="order-name-error" className="form-error" role="alert">
                    {orderErrors.name}
                  </p>
                )}
              </div>

              <div className="order-form__group">
                <label className="order-form__label" htmlFor="order-email">
                  E-mail *
                </label>
                <input
                  className="order-form__input"
                  id="order-email"
                  name="email"
                  type="email"
                  placeholder="example@mail.ru"
                  autoComplete="email"
                  value={orderForm.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  aria-invalid={Boolean(orderErrors.email)}
                  aria-describedby={orderErrors.email ? 'order-email-error' : undefined}
                  required
                />
                {orderErrors.email && (
                  <p id="order-email-error" className="form-error" role="alert">
                    {orderErrors.email}
                  </p>
                )}
              </div>

              <div className="order-form__group">
                <label className="order-form__label" htmlFor="order-phone">
                  Телефон *
                </label>
                <input
                  className="order-form__input"
                  id="order-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+7 (900) 000-00-00"
                  value={orderForm.phone}
                  onChange={(e) => onInputChange('phone', e.target.value)}
                  aria-invalid={Boolean(orderErrors.phone)}
                  aria-describedby={orderErrors.phone ? 'order-phone-error' : undefined}
                  required
                />
                {orderErrors.phone && (
                  <p id="order-phone-error" className="form-error" role="alert">
                    {orderErrors.phone}
                  </p>
                )}
              </div>

              <div className="order-form__group">
                <label className="order-form__label" htmlFor="order-topic">
                  Способ получения *
                </label>
                <select
                  className="order-form__select"
                  id="order-topic"
                  name="topic"
                  value={orderForm.topic}
                  onChange={(e) => onInputChange('topic', e.target.value)}
                  required
                >
                  <option value="product">Курьерская доставка</option>
                  <option value="pickup">Самовывоз из шоурума</option>
                  <option value="consultation">Доставка с проверкой и настройкой</option>
                </select>
              </div>

              <div className="order-form__group order-form__group--wide">
                <label className="order-form__label" htmlFor="order-date">
                  Желаемая дата доставки
                </label>
                <input
                  className="order-form__input"
                  id="order-date"
                  name="date"
                  type="date"
                  value={orderForm.date}
                  onChange={(e) => onInputChange('date', e.target.value)}
                />
              </div>

              <div className="order-form__group order-form__group--wide">
                <label className="order-form__label" htmlFor="order-comment">
                  Комментарий к заказу
                </label>
                <textarea
                  className="order-form__textarea"
                  id="order-comment"
                  name="comment"
                  rows="3"
                  placeholder="Укажите адрес доставки или удобное время для звонка"
                  value={orderForm.comment}
                  onChange={(e) => onInputChange('comment', e.target.value)}
                />
              </div>

              <div className="order-form__group order-form__group--wide">
                <label className="checkbox-label" htmlFor="order-agreement">
                  <input
                    className="order-form__checkbox"
                    id="order-agreement"
                    name="agreement"
                    type="checkbox"
                    checked={orderForm.agreement}
                    onChange={(e) => onInputChange('agreement', e.target.checked)}
                    aria-invalid={Boolean(orderErrors.agreement)}
                    aria-describedby={
                      orderErrors.agreement ? 'order-agreement-error' : undefined
                    }
                    required
                  />
                  <span>Я согласен на обработку персональных данных *</span>
                </label>
                {orderErrors.agreement && (
                  <p
                    id="order-agreement-error"
                    className="form-error"
                    role="alert"
                  >
                    {orderErrors.agreement}
                  </p>
                )}
              </div>

              <div className="order-form__actions order-form__group--wide">
                <button
                  className="button button--primary"
                  type="submit"
                  disabled={cart.length === 0}
                >
                  Подтвердить заявку
                </button>
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={onReset}
                >
                  Очистить форму
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;