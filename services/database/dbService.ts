import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq, lt, gte, ne } from 'drizzle-orm';

import {
    customersTable,
    productsTable,
    ordersTable,
    detailOrdersTable
} from "@/services/database/schema";

type NewOrder = typeof ordersTable.$inferInsert;
type NewDetailOrder = typeof detailOrdersTable.$inferInsert;

import {
    seedCustomerQuery,
    seedProdductQuery
} from "@/services/database/sqlQuery";

export const expoDb = SQLite.openDatabaseSync("wmsapp.db");

export const drizzleDb = drizzle(expoDb);

export const initDb = async (): Promise<string> => {
    try {
        await drizzleDb.delete(detailOrdersTable);
        await drizzleDb.delete(ordersTable);
        await drizzleDb.delete(productsTable);
        await drizzleDb.delete(customersTable);
        await expoDb.execAsync(seedCustomerQuery);
        await expoDb.execAsync(seedProdductQuery);

        return "Initialisation de la base de donnée !";
    } catch (exception) {
        console.log("error " + exception);
        return "Erreur d'initialisation de la base de donnée !";
    }

};

export const getCustomers = async () => {
    const customer = await drizzleDb.select().from(customersTable);

    return customer;
}

export const getOrders = async () => {
    const order = await drizzleDb.select().from(ordersTable);

    return order;
}

export const getProducts = async () => {
    const customer = await drizzleDb.select().from(productsTable);

    return customer;
}

export const getOrderDetails = async () => {
    const detailOrder = await drizzleDb.select().from(detailOrdersTable);

    return detailOrder;
}

export const createOrder = async(
    customerId:string,
    detailOrder:{
        productId: string;
        unitPrice: string;
        quantity: number;
      }[]
) => {
    return await drizzleDb.transaction(async (tx) => {

        const customers = await tx.select().from(customersTable).where(eq(customersTable.customerId, customerId));
        
        const order: NewOrder = {
            customerId,
            shippingAddress: customers[0].address,
            shippingCity: customers[0].city,
            shippingCountry: customers[0].country,
            shippingName: customers[0].companyName + " "+ customers[0].contactName,
            shippingPhone: customers[0].phone,
            orderDate: new Date().toISOString(),
        }; 
        const createdOrder = await tx.insert(ordersTable).values(order).returning();
        const data: NewDetailOrder[] = detailOrder.map((d) => ({
            orderId: createdOrder[0].orderId,
            productId: d.productId,
            unitPrice: d.unitPrice,
            quantity: d.quantity,
        }));

        await tx.insert(detailOrdersTable).values(data)
    });

}