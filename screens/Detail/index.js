import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import useFetch from "../../hooks/useFetch";

const Detail = ({ route }) => {
  const { id } = route.params;
  const url = `https://api.orhanaydogdu.com.tr/deprem/data/get?earthquake_id=${id}`;

  const { data, loading, error } = useFetch(url);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  const item = data.result;

  return (
    <View
      style={[
        styles.container,
        item.mag < 4
          ? styles.backgroundGreen
          : item.mag < 5
          ? styles.backgroundYellow
          : styles.backgroundRed,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.detail}>
        <Text style={styles.mag}>Büyüklük: {item.mag}</Text>
        <Text style={styles.depth}>Derinlik: {item.depth}</Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
  },
  detail: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#d4d4d8",
  },

  mag: {
    fontSize: 20,
    fontWeight: "bold",
  },
  depth: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
