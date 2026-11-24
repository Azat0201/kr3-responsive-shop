import AnimatedCounter from '../components/AnimatedCounter';

function AboutPage({ onNavigate }) {
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
          О нас
        </span>
      </nav>

      <div className="hero-grid">
        <div>
          <span className="hero-badge">История и философия</span>
          <h1 className="page-title">О проекте ShopProject</h1>
          <p className="hero-lead">
            Мы превратили выбор компьютерной периферии в продуманный
            инженерный процесс, где каждая клавиатура, мышь и монитор
            проходят ручную проверку качества.
          </p>
          <p className="text-muted">
            В нашем шоуруме можно лично протестировать тактильные, линейные и
            магнитные свитчи, сравнить посадку геймерских кресел и оценить
            4K-мониторы с заводской калибровкой цвета.
          </p>
          <div className="hero-buttons">
            <button
              type="button"
              className="button button--primary"
              onClick={() => onNavigate('catalog')}
            >
              Выбрать девайсы
            </button>
          </div>
        </div>

        <div className="img-zoom-wrapper hero-image-card">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
            alt="Демонстрационная зона компьютерной периферии и мониторов в шоуруме ShopProject"
            width="640"
            height="420"
            loading="lazy"
          />
        </div>
      </div>

      <div className="about-stats-grid">
        <div className="advantage-card hover-card text-center">
          <div className="about-stat-number">
            <AnimatedCounter target={2500} suffix="+" />
          </div>
          <p className="text-muted">собранных рабочих и игровых мест</p>
        </div>
        <div className="advantage-card hover-card text-center">
          <div className="about-stat-number">
            <AnimatedCounter target={12} />
          </div>
          <p className="text-muted">отборных хитов периферии в каталоге</p>
        </div>
        <div className="advantage-card hover-card text-center">
          <div className="about-stat-number">
            <AnimatedCounter target={24} suffix=" мес." />
          </div>
          <p className="text-muted">расширенной гарантии на мониторы и столы</p>
        </div>
        <div className="advantage-card hover-card text-center">
          <div className="about-stat-number">
            <AnimatedCounter target={4.9} suffix=" / 5.0" decimals={1} />
          </div>
          <p className="text-muted">средняя оценка наших покупателей</p>
        </div>
      </div>

      {/* Блок карты и контактов шоурума, перенесённый со страницы Контакты */}
      <section className="section" aria-labelledby="location-title">
        <h2 id="location-title" className="section-title">
          Как нас найти
        </h2>

        <div className="contacts-grid">
          <div className="advantage-card hover-card contacts-card">
            <div>
              <h3 className="h5-title">Шоурум и пункт выдачи ShopProject</h3>
              <p className="text-muted">
                Приходите протестировать клавиатуры, мониторы и кресла перед покупкой или забрать оформленный заказ.
              </p>
              <hr className="divider" />
              <div className="contact-item">
                <strong>Адрес шоурума:</strong>
                <span>г. Москва, Малая Филёвская улица, 18 (м. Пионерская)</span>
              </div>
              <div className="contact-item">
                <strong>Телефон:</strong>
                <a className="readable-contact-link" href="tel:+79000000000">
                  +7 (900) 000-00-00
                </a>
              </div>
              <div className="contact-item">
                <strong>Режим работы:</strong>
                <span>Ежедневно с 10:00 до 22:00</span>
              </div>
              <div className="contact-item">
                <strong>Электронная почта:</strong>
                <a className="readable-contact-link" href="mailto:info@example.com">
                  info@example.com
                </a>
              </div>
            </div>

            <div className="social-links-row social-links-row--about">
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z" />
                </svg>
                <span>Мы ВКонтакте</span>
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span>Наш Telegram</span>
              </a>

              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="button button--secondary"
              >
                Построить маршрут
              </a>
            </div>
          </div>

          <div className="map-card">
            <iframe
              title="Карта проезда в шоурум ShopProject"
              src="https://www.openstreetmap.org/export/embed.html?bbox=37.4450%2C55.7330%2C37.4650%2C55.7430&layer=mapnik"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;