import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Card from "../../components/Card";

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [limit, setLimit] = useState(100);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [counter, setCounter] = useState(0);
  const url = `https://api.orhanaydogdu.com.tr/deprem/kandilli/archive?limit=${limit}&date=${startDate}&date_end=${endDate}`;
  const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  const navigateDetail = (id) => {
    navigation.navigate("SearchDetail", { id });
  };

  const disabled =
    startDate === undefined ||
    startDate === "" ||
    endDate === "" ||
    endDate === undefined
      ? true
      : false;

  const renderItem = ({ item }) => (
    <Card item={item} onPress={() => navigateDetail(item.earthquake_id)} />
  );

  const loadMoreData = () => {
    setLimit(limit + 20);
    handleSubmit();
  };

  const handleSubmit = async () => {
    setCounter(counter + 1);
    if (dateRegex.test(startDate) && dateRegex.test(endDate)) {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setError(
          data.httpStatus !== 200
            ? data.desc
            : null || data.result === []
            ? "Sonuç bulunamadı."
            : null
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError(counter > 0 ? "Tarih formatı hatalı." : null);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Deprem ara</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Başlangıç Tarihi</Text>
              <TextInput
                style={styles.input}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                maxLength={10}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Bitiş Tarihi</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                value={endDate}
                maxLength={10}
                keyboardType="numeric"
              />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
              style={disabled ? styles.disabledButton : styles.button}
              onPress={handleSubmit}
              disabled={disabled}
            >
              <Text>Ara</Text>
            </TouchableOpacity>
          </>
        }
        data={data?.result}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </View>
  );
};

export default Search;

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
  form: {
    margin: 10,
    gap: 5,
  },
  label: {
    fontSize: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: "#d4d4d8",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#a3e635",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    alignItems: "center",
    backgroundColor: "#a3e635",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    opacity: 0.5,
  },
});
