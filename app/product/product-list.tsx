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

export default function ProductList() {

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<typeof dbSchema.productsTable.$inferSelect[] | null>([]);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {
            const productResult = await dbService.getProducts();
            setProduct(productResult);
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
                    headerTitle: "Liste des produits",
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
                        flex: 2,
                        padding: constants.SIZES.medium,
                    }}
                >
                    <Navbar pageId={2} />

                    <View style={styles.container}>
                        <Text>Liste des produits</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={product}
                            contentContainerStyle={{
                                paddingBottom: 5
                            }}
                            keyExtractor={(item) => item.productId}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Text>Numéro : {item.productId}</Text>
                                    <Text>Désignation :  {item.productName}</Text>
                                    <Text>Prix unitaire :  {item.unitPrice} </Text>
                                    <Text>Description : </Text>
                                    <Text>{item.description}  </Text>
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
    card:{
        padding:constants.SIZES.small,
        borderRadius: constants.SIZES.medium,
        borderWidth: 1,
        borderColor: constants.COLORS.secondary,
        marginBottom:constants.SIZES.small
    }
});
