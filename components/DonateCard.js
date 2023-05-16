import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const DonateCard = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.listTitle}>{item.title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL(item.link);
        }}
      >
        <Text style={styles.buttonText}>Siteye git </Text>
        <Feather name="external-link" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default DonateCard;

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
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#a3e635",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
