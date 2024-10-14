import { useState } from "react";
import 
{ SafeAreaView, ScrollView, View, Text, Image }
from "react-native";
import { Stack, useRouter } from "expo-router";

import { 
    COLORS, 
    icons, 
    images, 
    SIZES 
} from '../../constants';
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
    Navbar,
} from '../../components';

const NewOrder = () => {
    const router = useRouter();
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                    ),
                    headerTitle: "Nouvel commande",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View
                style={{
                    flex:1,
                    padding:SIZES.medium,
                }}
                >
                    <Navbar pageId={3} />

                </View>
    
            </ScrollView>
        </SafeAreaView>
    );
}

export default NewOrder;