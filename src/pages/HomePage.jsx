import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import AnimatedCounter from '../components/AnimatedCounter';
import { countAvailableProducts } from '../utils/shopHelpers';

function HomePage({
  products,
  popularProducts,
  reviews,
  faqItems,
  favorites,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite
}) {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth < 768 ? 1 : 3);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  const handlePrevReview = () => {
    setReviewIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNextReview = () => {
    setReviewIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Показываем 3 карточки подряд по кругу из массива reviews
  const visibleReviews = [
    reviews[reviewIndex % reviews.length],
    reviews[(reviewIndex + 1) % reviews.length],
    reviews[(reviewIndex + 2) % reviews.length]
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [maxIndex, reviewIndex]);

  return (
    <div className="animate-fade-up">
      <section className="container hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-badge">
              Конструктор игровых и рабочих мест
            </span>
            <h1 className="hero-title">
              Соберите свой идеальный компьютерный сетап
            </h1>
            <p className="hero-lead">
              ShopProject — учебный интернет-магазин проверенной
              компьютерной периферии. Механические и магнитные клавиатуры,
              4K-мониторы, студийный звук и эргономичная мебель с гарантией.
            </p>

            <div className="hero-buttons">
              <button
                type="button"
                className="button button--primary button--lg"
                onClick={() => onNavigate('catalog')}
              >
                Перейти в каталог
              </button>
              <button
                type="button"
                className="button button--secondary button--lg"
                onClick={() => onNavigate('about')}
              >
                Наш подход
              </button>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-box__number">
                  <AnimatedCounter target={products.length} />
                </div>
                <small className="stat-box__label">моделей в каталоге</small>
              </div>
              <div className="stat-box">
                <div className="stat-box__number">
                  <AnimatedCounter target={countAvailableProducts(products)} />
                </div>
                <small className="stat-box__label">доступно на складе</small>
              </div>
              <div className="stat-box">
                <div className="stat-box__number">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <small className="stat-box__label">оригинальная гарантия</small>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="img-zoom-wrapper hero-image-card">
              <picture>
                <source
                  media="(min-width: 1200px)"
                  srcSet="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=960&q=80"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=768&q=80"
                />
                <img
                  className="hero__image"
                  src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=640&q=80"
                  alt="Современное игровое рабочее место с широкоформатным монитором и клавиатурой с подсветкой"
                  width="640"
                  height="440"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container section"
        id="advantages"
        aria-labelledby="advantages-title"
      >
        <h2 id="advantages-title" className="section-title text-center">
          Преимущества нашего магазина
        </h2>
        <div className="advantages-grid">
          <article className="advantage-card hover-card">
            <h3>Тестирование каждого девайса</h3>
            <p>
              Проверяем клавиатуры на отсутствие звона пружин, мониторы — на
              битые пиксели и равномерность подсветки перед отправкой.
            </p>
          </article>
          <article className="advantage-card hover-card">
            <h3>Индивидуальный подбор сетапа</h3>
            <p>
              Помогаем собрать гармоничное рабочее место: от коврика и
              микрофона до стола с электроприводом под ваш рост.
            </p>
          </article>
          <article className="advantage-card hover-card">
            <h3>Официальная гарантия и сервис</h3>
            <p>
              Предоставляем гарантию от 12 до 24 месяцев на все позиции
              каталога и оперативную поддержку инженеров.
            </p>
          </article>
        </div>
      </section>

      <section
        className="container section"
        id="popular"
        aria-labelledby="popular-title"
      >
        <div className="section-header-row">
          <h2 id="popular-title" className="section-title">
            Популярные товары
          </h2>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => onNavigate('catalog')}
          >
            Все товары
          </button>
        </div>

        <ProductList
          products={popularProducts}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </section>

      <section
        className="container section"
        aria-labelledby="reviews-title"
      >
        <div className="section-header-row">
          <h2 id="reviews-title" className="section-title">
            Отзывы покупателей
          </h2>
          <div className="carousel-controls">
            <button
              type="button"
              className="button button--secondary"
              aria-label="Предыдущий отзыв"
              onClick={handlePrevReview}
            >
              ←
            </button>
            <button
              type="button"
              className="button button--secondary"
              aria-label="Следующий отзыв"
              onClick={handleNextReview}
            >
              →
            </button>
          </div>
        </div>

        <div className="reviews-carousel-viewport">
          <div
            className="reviews-carousel-track"
            style={{
              transform: `translateX(-${reviewIndex * (100 / cardsPerView)}%)`
            }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="reviews-carousel-slide"
                style={{ flex: `0 0 ${100 / cardsPerView}%` }}
              >
                <article className="review-card hover-card">
                  <div className="review-card__header">
                    <strong>{rev.author}</strong>
                    <span className="review-card__stars" aria-label="Оценка покупателя">
                      {rev.rating}
                    </span>
                  </div>
                  <span className={`product-card__badge--inline ${rev.badgeClass}`}>
                    {rev.productName}
                  </span>
                  <p className="review-card__text">{rev.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section" id="FAQ" aria-labelledby="faq-title">
        <h2 id="faq-title" className="section-title">
          Часто задаваемые вопросы
        </h2>
        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <h3 className="faq-item__heading">
                  <button
                    type="button"
                    className="faq-item__button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                {isOpen && (
                  <div className="faq-item__answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;