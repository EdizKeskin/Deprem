import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import React, { useState } from "react";
import Card from "../../components/Card";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  const [limit, setLimit] = useState(20);
  const url = `https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=${limit}`;
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

  const navigateDetail = (id) => {
    navigation.navigate("Detail", { id });
  };

  const loadMoreData = () => {
    setLimit(limit + 10);
  };

  const renderItem = ({ item }) => (
    <Card item={item} onPress={() => navigateDetail(item.earthquake_id)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Son Depremler</Text>
          </View>
        }
        data={data.result}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<ActivityIndicator size="large" />}
      />
      <StatusBar style="auto" />
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
  },
});
