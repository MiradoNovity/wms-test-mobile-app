import { int, sqliteTable, text, numeric } from "drizzle-orm/sqlite-core";

export const customersTable = sqliteTable("customer", {
  customerId: text().primaryKey(),
  companyName: text(),
  contactName: text(),
  address: text(),
  city: text(),
  region: text(),
  postalCode: text(),
  country: text(),
  phone: text(),
});

export const productsTable = sqliteTable("product", {
  productId: text().primaryKey(),
  productName: text().notNull(),
  description: text(),
  unitPrice: numeric().notNull(),
});

export const ordersTable = sqliteTable("order", {
  orderId: int().primaryKey({ autoIncrement: true }),
  customerId: text()
    .notNull()
    .references(() => customersTable.customerId),
  orderDate: text(),
  shippingDate: text(),
  shippingName: text(),
  shippingAddress: text(),
  shippingCity: text(),
  shippingRegion: text(),
  shippingPostalCode: text(),
  shippingCountry: text(),
  shippingPhone: text(),
});

export const detailOrdersTable = sqliteTable("detailOrder", {
  detailOrderId: int().primaryKey({ autoIncrement: true }),
  orderId: int()
    .notNull()
    .references(() => ordersTable.orderId),
  productId: text()
    .notNull()
    .references(() => productsTable.productId),
  unitPrice: numeric().notNull(),
  quantity: int().notNull(),
});