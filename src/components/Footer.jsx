function Footer({ onNavigate }) {
  return (
    <footer className="custom-footer" id="contacts-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <a
              href="#main"
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              <span className="brand-logo__icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <span className="brand-logo__title">ShopProject</span>
            </a>
            <p className="footer-text">
              Магазин компьютерной периферии, 4K-мониторов и эргономичных
              рабочих мест для игр, учёбы и разработки.
            </p>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Разделы</h2>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate('home')}
                >
                  Главная
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate('catalog')}
                >
                  Каталог
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate('favorites')}
                >
                  Избранное
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onNavigate('about')}
                >
                  О нас
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Контакты и соцсети</h2>
            <ul className="footer-contacts">
              <li className="footer-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>г. Москва, Малая Филёвская ул., 18 (м. Пионерская)</span>
              </li>
              <li className="footer-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+79000000000">+7 (900) 000-00-00</a>
              </li>
              <li className="footer-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Ежедневно с 10:00 до 22:00</span>
              </li>
              <li className="footer-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:info@example.com">info@example.com</a>
              </li>
            </ul>

            <div className="social-links-row">
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z" />
                </svg>
                <span>ВКонтакте</span>
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
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 ShopProject. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;