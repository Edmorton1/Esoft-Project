if (process.env.NODE_ENV !== 'production') {
  console.error(`
    ОШИБКА: NODE_ENV Должен быть "production".

    NODE_ENV=production npm run build:back

    ИЛИ

    NODE_ENV=production npm run start:back
    `);
  process.exit(1);
}