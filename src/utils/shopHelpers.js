export function formatPrice(price) {
  const numPrice = Number(price);
  if (!Number.isFinite(numPrice)) {
    return '0 руб.';
  }
  return `${numPrice.toLocaleString('ru-RU')} руб.`;
}

export function calculateDiscount(price, discountPercent = 0) {
  return Math.round((price * discountPercent) / 100);
}

export function calculateFinalPrice(price, discountPercent = 0) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

export function getProductStatus(product) {
  if (product && product.isAvailable === true) {
    return 'В наличии';
  }
  return 'Нет в наличии';
}

export function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const status = getProductStatus(product);
  return `${product.title}: ${formatPrice(finalPrice)} (скидка ${product.discountPercent}%). Статус: ${status}.`;
}

export function getProductTitles(products) {
  return products.map((product) => product.title);
}

export function getAvailableProducts(products) {
  return products.filter((product) => product.isAvailable === true);
}

export function searchProducts(products, query = '') {
  const normalizedQuery = String(query).trim().toLowerCase();
  if (normalizedQuery === '') {
    return products;
  }
  return products.filter((product) => {
    const inTitle = product.title.toLowerCase().includes(normalizedQuery);
    const inDesc = product.description.toLowerCase().includes(normalizedQuery);
    return inTitle || inDesc;
  });
}

export function filterProductsByCategory(products, category = 'all') {
  if (category === 'all') {
    return products;
  }
  return products.filter((product) => product.category === category);
}

export function filterProductsByBadgeAndBudget(
  products,
  badge = 'all',
  maxBudget = 'all',
  favorites = []
) {
  return products.filter((product) => {
    const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
    const matchesBadge =
      badge === 'all' ||
      (badge === 'available' && product.isAvailable) ||
      (badge === 'favorites' && favorites.includes(product.id)) ||
      product.badgeType === badge;
    const matchesBudget =
      maxBudget === 'all' || finalPrice <= Number(maxBudget);
    return matchesBadge && matchesBudget;
  });
}

export function sortProductsByPrice(products, direction = 'default') {
  const productsCopy = [...products];

  if (direction === 'price-asc' || direction === 'asc') {
    return productsCopy.sort(
      (a, b) =>
        calculateFinalPrice(a.price, a.discountPercent) -
        calculateFinalPrice(b.price, b.discountPercent)
    );
  }
  if (direction === 'price-desc' || direction === 'desc') {
    return productsCopy.sort(
      (a, b) =>
        calculateFinalPrice(b.price, b.discountPercent) -
        calculateFinalPrice(a.price, a.discountPercent)
    );
  }
  if (direction === 'title-asc') {
    return productsCopy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }
  if (direction === 'rating-desc') {
    return productsCopy.sort((a, b) => b.rating - a.rating);
  }
  return productsCopy;
}

export function findProductById(products, id) {
  return products.find((product) => product.id === Number(id));
}

export function calculateTotalPrice(products) {
  return products.reduce((sum, product) => {
    const itemPrice = calculateFinalPrice(product.price, product.discountPercent || 0);
    const qty = product.quantity ? Number(product.quantity) : 1;
    return sum + itemPrice * qty;
  }, 0);
}

export function countAvailableProducts(products) {
  return getAvailableProducts(products).length;
}

export function calculateAveragePrice(products) {
  if (!Array.isArray(products) || products.length === 0) {
    return 0;
  }
  const totalPrice = calculateTotalPrice(products);
  return Math.round(totalPrice / products.length);
}

export function getPreparedProducts(
  products,
  {
    query = '',
    category = 'all',
    badge = 'all',
    budget = 'all',
    sort = 'default',
    favorites = []
  } = {}
) {
  let result = [...products];
  result = searchProducts(result, query);
  result = filterProductsByCategory(result, category);
  result = filterProductsByBadgeAndBudget(result, badge, budget, favorites);
  result = sortProductsByPrice(result, sort);
  return result;
}

export function runConsoleVerification(products) {
  console.group('=== ПРОВЕРКА ПР №15 и ПР №16: ShopProject ===');
  const firstProduct = products[0];
  console.log('1. Первый объект товара (ПР 15):', firstProduct);
  console.log('2. Краткая сводка createProductSummary (ПР 15):', createProductSummary(firstProduct));
  console.table(
    products.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      price: p.price,
      finalPrice: calculateFinalPrice(p.price, p.discountPercent),
      isAvailable: p.isAvailable
    }))
  );
  console.log('3. Названия всех товаров getProductTitles (ПР 16):', getProductTitles(products));
  console.log('4. Всего товаров:', products.length, '| В наличии:', countAvailableProducts(products));
  console.log('5. Общая стоимость каталога:', formatPrice(calculateTotalPrice(products)));
  console.log('6. Средняя цена товара:', formatPrice(calculateAveragePrice(products)));
  console.groupEnd();
}