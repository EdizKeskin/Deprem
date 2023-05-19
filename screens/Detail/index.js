import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import useFetch from "../../hooks/useFetch";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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

  const coordinate = {
    latitude: item.geojson.coordinates[1],
    longitude: item.geojson.coordinates[0],
  };

  const dateParts = item.date.split(" ")[0].split(".");
  const time = item.date.split(" ")[1];

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
      <View style={styles.upperContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>
            Tarih: {dateParts[2]}.{dateParts[1]}.{dateParts[0]}
          </Text>
          <Text style={styles.detailTitle}>
            Saat: {time}
            {"\n"}
          </Text>

          <Text style={styles.detailTitle}>Büyüklük: {item.mag}</Text>
          <Text style={styles.detailTitle}>Derinlik: {item.depth}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: item.geojson.coordinates[1],
            longitude: item.geojson.coordinates[0],
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker coordinate={coordinate} />
        </MapView>
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
  upperContainer: {
    flex: 1,
    width: "95%",
    height: "95%",
    marginTop: 10,
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    width: "95%",
    height: "95%",
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
