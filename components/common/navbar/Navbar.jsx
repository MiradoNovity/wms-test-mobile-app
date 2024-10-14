import React from 'react'
import { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";

import { icons, SIZES } from "../../../constants";

import styles from './navabar.style'

const pages = [
    { "id": 1, "label": "Accueil", "link": "/home" },
    { "id": 2, "label": "Commande", "link": "/order/order-list" },
    { "id": 3, "label": "Nouvel Commande", "link": "/order/new-order" },
];


const Navbar = ({pageId}) => {
    const router = useRouter();

    return (
        <View>
            <FlatList
                data={pages}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.tab(pageId === item.id)}
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