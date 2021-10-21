import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

interface Props {
  navigation;
}

const Details = (props: Props) => {
  const [api, setApi] = useState(
    "http://api.weatherstack.com/current?access_key=2ecc5f6b1f689bb8c003045ba71f48f1&query=" +
      props.route.params.data.item.capital
  );
  const [weatherData, SetweatherData] = useState();
  const Data = props.route.params.data;

  const fetchApi = async () => {
    const data = api;
    try {
      const response = await Axios.get(data);
      console.log(response.data.current, "res");
      SetweatherData(response.data);
      navigation.navigate("Weather", {
        forecastData: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>GO BACK</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Image
          style={{ width: 100, height: 100, alignSelf: "center" }}
          source={{ uri: Data.item.flags.png }}
        />
        <Text style={styles.detail}>{Data.item.capital}</Text>
        <Text style={styles.detail}>{Data.item.name}</Text>
        <Text style={styles.detail}>{Data.item.population}</Text>
      </View>
      <TouchableOpacity
        style={styles.weatherButton}
        onPress={() => {
          fetchApi();
        }}
      >
        <Text style={styles.weatherText}>GET WEATHER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems:'center'
  },
  card: {
    alignSelf: "center",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: "#eceb",
  },
  detail: {
    textAlign: "center",
    paddingTop: 10,
  },
  weatherButton: {
    alignSelf: "center",
    backgroundColor: "blue",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "50%",
    marginTop: 30,
  },
  weatherText: {
    color: "#fff",
    textAlign: "center",
  },
  back: {
    position: "absolute",
    top: 70,
    left: 20,
  },
});
