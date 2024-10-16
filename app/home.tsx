import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';


import migrations from '@/drizzle/migrations';
import * as dbService from "@/services/database/dbService";
import * as dbSchema from "@/services/database/schema";
import * as constants from "@/constants/index"

import { Navbar } from "@/components"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string>("First !");
  const [customer, setCustomer] = useState<typeof dbSchema.customersTable.$inferSelect[] | null>([]);
  const { success, error } = useMigrations(dbService.drizzleDb, migrations);

  const getData = async () => {
    console.log("async!");
    const result = await dbService.initDb();
    setMessage(result);
    const customerList = await dbService.getCustomers();
    setCustomer(customerList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!success) return;
    setIsLoading(true);
    try {
      setTimeout(getData, 500);
    }
    catch (exception) {
      setIsLoading(true);
    }
  }, [success]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: constants.COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: constants.COLORS.lightWhite },
          headerShadowVisible: true,
          headerTitle: "Application WMS",
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

            <Navbar pageId={1} />

            <View style={styles.container}>
              <Text>Liste des clients</Text>
              <FlatList
              showsVerticalScrollIndicator={false}
              data={customer}
              contentContainerStyle={{
                paddingBottom: 5
              }}
              keyExtractor={(item) => item.customerId}
              renderItem={({item})=>(
                <View style={styles.card}>
                  <Text>Identifiant : {item.customerId}  </Text>
                  <Text>Nom : {item.contactName??"..."} </Text>
                  <Text>Société : {item.companyName??"..."}</Text>
                  <Text>Contact : {item.phone??"..."}</Text>
                  <Text>Région : {item.region??"..."}</Text>
                  
                </View>
                
              )}

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
    marginBottom: constants.SIZES.small
  }
});
