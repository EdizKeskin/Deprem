import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import React, { useState } from "react";
import Card from "../../components/Card";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

const Home = ({ navigation }) => {
  const [limit, setLimit] = useState(20);
  const url = `https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=${limit}`;
  const { data, loading, error, setTrigger, trigger } = useFetch(url);

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  const navigateDetail = (id) => {
    navigation.navigate("Detail", { id });
  };

  const loadMoreData = () => {
    setLimit(limit + 10);
  };

  const renderItem = ({ item }) => (
    <Card item={item} onPress={() => navigateDetail(item.earthquake_id)} />
  );

  const refresh = () => {
    setTrigger(!trigger);
    Toast.show("Veriler güncellendi", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Son Depremler</Text>
            <TouchableOpacity style={styles.refreshBtn} onPress={refresh}>
              <Feather name="refresh-ccw" size={28} color="black" />
            </TouchableOpacity>
          </View>
        }
        data={data.result}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <StatusBar style="auto" />
      <Toast />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    marginTop: StatusBar.currentHeight || 40,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  refreshBtn: {
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
});
