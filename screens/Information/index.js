import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import PhoneCard from "../../components/PhoneCard";
import DonateCard from "../../components/DonateCard";

const Information = () => {
  const numbers = [
    {
      id: 1,
      title: "Acil Yardım Hattı",
      number: "112",
    },
    {
      id: 2,
      title: "Afad",
      number: "122",
    },
    {
      id: 3,
      title: "Deprem Hatt",
      number: "184",
    },
  ];
  const donatePlaces = [
    {
      id: 1,
      title: "Ahbap",
      link: "https://www.ahbap.org/",
    },
    {
      id: 2,
      title: "Afad",
      link: "https://www.afad.gov.tr/depremkampanyasi2",
    },
  ];

  const renderPhoneCard = ({ item }) => <PhoneCard item={item} />;
  const renderDonateCard = ({ item }) => <DonateCard item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Önemli Numaralar</Text>
      <FlatList data={numbers} renderItem={renderPhoneCard} />
      <Text style={styles.title}>Bağış yerleri</Text>
      <FlatList data={donatePlaces} renderItem={renderDonateCard} />
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    marginTop: StatusBar.currentHeight || 40,
    alignSelf: "center",
  },
});
