import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const PhoneCard = ({ item }) => {
  const phoneCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };
  return (
    <View style={styles.item}>
      <View style={styles.titleNumber}>
        <Text style={styles.listTitle}>{item.title}: </Text>
        <Text style={styles.number}>{item.number}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          phoneCall(item.number);
        }}
      >
        <Feather name="phone-call" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PhoneCard;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    margin: 5,
    width: "90%",
    alignSelf: "center",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleNumber: {
    flexDirection: "row",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#0284c7",
  },
  button: {
    backgroundColor: "#a3e635",
    padding: 10,
    borderRadius: 10,
  },
});
