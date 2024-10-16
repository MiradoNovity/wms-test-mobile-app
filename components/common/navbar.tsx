import React from 'react'
import { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";

import { SIZES } from "@/constants";

import styles from './navbar.style'

const pages = [
    { "id": 1, "label": "Accueil", "link": "/home" },
    { "id": 2, "label": "Produits", "link": "/product/product-list" },
    { "id": 3, "label": "Commande", "link": "/order/order-list" },
    { "id": 4, "label": "Nouvelle Commande", "link": "/order/new-order" },
];

type navbarProps = {
    pageId: number;
  };

const Navbar = ( props:navbarProps) => {
    const router = useRouter();

    return (
        <View>
            <FlatList
            style={styles.nav}
            showsHorizontalScrollIndicator={false}
                data={pages}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.tab(props.pageId === item.id)}
                        onPress={() => {
                            router.push(item.link);
                        }}
                    >
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.label}
                contentContainerStyle={{ columnGap: SIZES.small }}
                horizontal
            />
        </View>
    )
}

export default Navbar;