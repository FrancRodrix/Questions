import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Axios from "axios";
import Navigation from "../Navigation/Navigation";

interface Props {
  navigation;
}

const Home1 = (props: Props) => {
  const DATA = props.route.params.forecastData;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Navigation.goBack();
        }}
      >
        <Text>GO BACK</Text>
      </TouchableOpacity>
      <View style={styles.weatherBox}>
        <Text style={styles.header}>CLIMATE CONDITIONS</Text>
        <Text style={styles.data}>
          {" "}
          TEMPERATURE:{props.route.params.forecastData.current.temperature}
        </Text>
        <Text style={styles.data}>
          {" "}
          HUMIDITY:{props.route.params.forecastData.current.humidity}
        </Text>
        <Text style={styles.data}>
          CLOUDCOVER{props.route.params.forecastData.current.cloudcover}
        </Text>
        <Text style={styles.data}>
          WEATHER DISCRIPTION:
          {props.route.params.forecastData.current.weather_descriptions[0]}
        </Text>
        <Text style={styles.data}>
          CITY:{props.route.params.forecastData.location.name}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#fe5674",
    padding: 10,
    borderRadius: 15,
  },
  button: {
    position: "absolute",
    top: 70,
    left: 50,
  },
  buttonText: {
    color: "#fff",
  },
  weatherBox: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#3D85C6",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 10,
  },
  data: {
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 3,
  },
});
