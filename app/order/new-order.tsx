import { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router, useFocusEffect } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Stack, useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';


import migrations from '@/drizzle/migrations';
import * as dbService from "@/services/database/dbService";
import * as dbSchema from "@/services/database/schema";
import * as constants from "@/constants/index"

import { Navbar } from "@/components"

export default function NewOrder() {

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<typeof dbSchema.productsTable.$inferSelect[] | null>([]);
    const [customer, setCustomer] = useState<typeof dbSchema.customersTable.$inferSelect[] | null>([]);
    const [productOptions, setProductOptions] = useState<
        { label: string; value: string }[]
    >([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customerOptions, setCustomerOptions] = useState<
        { label: string; value: string }[]
    >([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [orderDetail, setOrdderDetail] = useState<
        { productId: string; productName: string; quantity: number, unitPrice: string }[]
    >([]);

    const [openDropdownCustomer, setOpenDropdownCustomer] = useState(false);
    const [openDropdownProduct, setOpenDropdownProduct] = useState(false);
    const [currentQuantity, setCurrentQuantity] = useState('');

    const getData = async () => {
        setIsLoading(true);
        try {
            const productResult = await dbService.getProducts();
            setProduct(productResult);
            const productOptionsTemp = productResult.map((p) => {
                return { label: p.productName, value: p.productId }
            });
            setProductOptions(productOptionsTemp);

            const customerResult = await dbService.getCustomers();
            setCustomer(customerResult);
            const customerOptionsTemp = customerResult.map((c) => {
                return { label: c.contactName ?? "Pas de nom", value: c.customerId }
            });
            setCustomerOptions(customerOptionsTemp);

            setIsLoading(false);
        } catch (error) {
            alert("Une erreur s'est produite");
            setIsLoading(true)
        } finally {
            // setIsLoading(true)
        }
    };

    const addProduct = () => {
        setIsLoading(true);
        //Verification à faire pour l'itegrite
        const p = product?.find((p) => p.productId === selectedProduct);
        let qtt = Number(currentQuantity);
        if (p && qtt) {
            const c = orderDetail?.find((p) => p.productId === selectedProduct);

            if (c) {
                const temp = orderDetail.map((item) => {
                    if (item.productId === selectedProduct) {
                        return { productId: item.productId, productName: item.productName, quantity: qtt, unitPrice: item.unitPrice }
                    }
                    else {
                        return item;
                    }
                });

                setOrdderDetail(temp);
            }
            else {
                orderDetail.push({ productId: p.productId, productName: p.productName, quantity: qtt, unitPrice: p.unitPrice });
                setOrdderDetail(orderDetail);
            }
        }
        else {
            alert("Saisie invalide !");
        }
        setTimeout(() => { 
            setSelectedProduct(null);
            setCurrentQuantity('');
            setIsLoading(false); 
        }, 1000);

    }

    const saveOrder = async () => {
        setIsLoading(true);
        try {

            const currentCustomer = customer?.find((c) => c.customerId === selectedCustomer);
            if (!currentCustomer) {
                alert("Client vide !");
            }
            else {
                await dbService.createOrder(selectedCustomer, orderDetail);
                router.push("/order/order-list");
            }

        } catch (exception) {
            alert(
                "Une erreur s'est produite lors de la validation de la commande",
            );
        }
        setTimeout(() => { setIsLoading(false); }, 1000);
    }

    useEffect(() => {
        setTimeout(getData, 1000);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: constants.COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: constants.COLORS.lightWhite },
                    headerShadowVisible: true,
                    headerTitle: "Créer une nouvelle commande",
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
                    <Navbar pageId={4} />

                    <View style={styles.container}>
                        <Text>Entrer les informations</Text>

                        <View>
                            <Text> Choisiser un client :</Text>
                            <DropDownPicker
                                searchable
                                placeholder="Client ..."
                                searchPlaceholder="Rechercher un client..."

                                open={openDropdownCustomer}
                                setOpen={setOpenDropdownCustomer}
                                value={selectedCustomer}
                                setValue={setSelectedCustomer}
                                items={customerOptions}
                                setItems={setCustomerOptions}
                                style={{ zIndex: -100, marginBottom: 10 }}

                            />
                            <Text> Séléction un produit :</Text>
                            <DropDownPicker
                                searchable
                                placeholder='Produit ...'
                                searchPlaceholder="Rechercher un produit..."
                                open={openDropdownProduct}
                                setOpen={setOpenDropdownProduct}
                                value={selectedProduct}
                                setValue={setSelectedProduct}
                                items={productOptions}
                                setItems={setProductOptions}
                                style={{ zIndex: -100,  marginBottom: 10 }}

                            />
                            <Text>Saisir une quantité :</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setCurrentQuantity}
                                value={currentQuantity}
                                keyboardType="numeric"
                                returnKeyType='done'
                            />

                            <TouchableOpacity
                                style={styles.tab(true)}
                                onPress={() => {
                                    addProduct();
                                }}
                            >
                                <Text>Ajouter le produit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.tab(true)}
                                onPress={() => {
                                    saveOrder();
                                }}
                            >
                                <Text>Confirmer la commande</Text>
                            </TouchableOpacity>


                        </View>


                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={orderDetail}
                            contentContainerStyle={{
                                paddingBottom: 5
                            }}
                            keyExtractor={(item) => item.productId}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Text>Numéro : {item.productId}</Text>
                                    <Text>Labelle : {item.productName}</Text>
                                    <Text>Prix unitaire : {item.unitPrice}</Text>
                                    <Text>Quantité : {item.quantity} pièce(s)</Text>
                                </View>

                            )}
                            ListEmptyComponent={
                                <View>
                                    <Text>
                                        Aucune aucune commande pour le moment.
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

const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },

    tab: (isActive: boolean) => ({
        paddingVertical: constants.SIZES.small / 2,
        paddingHorizontal: constants.SIZES.small,
        borderRadius: constants.SIZES.medium,
        borderWidth: 1,
        borderColor: isActive ? constants.COLORS.secondary : constants.COLORS.gray2,
        backgroundColor: isActive ? constants.COLORS.info : 'inherit',
        width: 200,
        margin: 'auto',
        marginBottom:10,
    }),

    card: {
        padding: constants.SIZES.small,
        borderRadius: constants.SIZES.medium,
        borderWidth: 1,
        borderColor: constants.COLORS.secondary,
        marginBottom: constants.SIZES.small
      }
});
