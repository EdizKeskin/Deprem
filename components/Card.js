import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Card = ({ item, onPress }) => {
  const dateParts = item.date.split(" ")[0].split(".");
  const time = item.date.split(" ")[1];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        item.mag < 4
          ? styles.backgroundGreen
          : item.mag < 5
          ? styles.backgroundYellow
          : styles.backgroundRed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.date}>
          {dateParts[2]}.{dateParts[1]}.{dateParts[0]} {time}
        </Text>
        <Text style={styles.mag}>Büyüklük: {item.mag}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    margin: 5,
    width: "90%",
    alignSelf: "center",
    gap: 10,
  },
  backgroundGreen: {
    backgroundColor: "#a3e635",
  },
  backgroundYellow: {
    backgroundColor: "#fbbf24",
  },
  backgroundRed: {
    backgroundColor: "#f87171",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  mag: {
    fontWeight: "bold",
  },
  date: {},
});
