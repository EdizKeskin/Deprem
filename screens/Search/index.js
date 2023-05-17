import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Card from "../../components/Card";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [limit, setLimit] = useState(100);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [counter, setCounter] = useState(0);
  const [pickerStartDate, setPickerStartDate] = useState(new Date());
  const [pickerEndDate, setPickerEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [startedShow, setStartedShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
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

  // Datepicker
  const startedDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartedShow(false);
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getUTCDate()).padStart(2, "0");
    const convertedDate = `${year}-${month}-${day}`;
    setPickerStartDate(currentDate);
    setStartDate(convertedDate);
  };
  const endDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndShow(false);
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getUTCDate()).padStart(2, "0");
    const convertedDate = `${year}-${month}-${day}`;
    setPickerEndDate(currentDate);
    setEndDate(convertedDate);
  };

  const showMode = (currentMode, date) => {
    if (date === "startDate") {
      setStartedShow(true);
    } else {
      setEndShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = (date) => {
    showMode("date", date);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Deprem ara</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Başlangıç Tarihi</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => showDatepicker("startDate")}
                  style={styles.datePickerButton}
                >
                  <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Bitiş Tarihi</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setEndDate}
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  maxLength={10}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => showDatepicker("endDate")}
                  style={styles.datePickerButton}
                >
                  <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>
              </View>
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

      {startedShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={pickerStartDate}
          mode={mode}
          onChange={startedDateChange}
        />
      )}
      {endShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={pickerEndDate}
          mode={mode}
          onChange={endDateChange}
        />
      )}
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
    width: "90%",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
