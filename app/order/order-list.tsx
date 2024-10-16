import { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView, ScrollView, View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';


import migrations from '@/drizzle/migrations';
import * as dbService from "@/services/database/dbService";
import * as dbSchema from "@/services/database/schema";
import * as constants from "@/constants/index"

import { Navbar } from "@/components"

export default function OrderList() {

    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState<typeof dbSchema.ordersTable.$inferSelect[] | null>([]);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {
            const orderResult = await dbService.getOrders();
            setOrder(orderResult);
            setIsLoading(false);
        } catch (error) {
            alert("Une erreur s'est produite");
            setIsLoading(true)
        } finally {
            // setIsLoading(true)
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [getData]),
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: constants.COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: constants.COLORS.lightWhite },
                    headerShadowVisible: true,
                    headerTitle: "Liste des commandes",
                }}
            />

            {isLoading ? (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color={constants.COLORS.primary} />
                    <Text>chargement ...</Text>
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        padding: constants.SIZES.medium,
                    }}
                >
                    <Navbar pageId={3} />

                    <View style={styles.container}>
                        <Text>Liste des commandes</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={order}
                            contentContainerStyle={{
                                paddingBottom: 5,
                            }}
                            keyExtractor={(item) => item.orderId.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Text>N Commande :{item.orderId}</Text>
                                    <Text>Client :  {item.customerId}</Text>
                                    <Text>Date de commande : {item.orderDate}</Text>
                                    <Text>Date de livraison : {item.shippingDate}</Text>
                                    <Text>Détail de livraison : </Text>
                                    <Text>{item.shippingAddress}, {item.shippingPostalCode} </Text>
                                    <Text>{item.shippingCity}, {item.shippingRegion}, {item.shippingCountry}</Text>
                                </View>

                            )}
                            ListEmptyComponent={
                                <View>
                                    <Text>
                                        Aucune commande pour le moment
                                    </Text>
                                </View>
                            }

                        />
                    </View>
                </View>

            )}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        padding: constants.SIZES.small,
        borderRadius: constants.SIZES.medium,
        borderWidth: 1,
        borderColor: constants.COLORS.secondary,
        marginBottom: constants.SIZES.small,
      }
});
