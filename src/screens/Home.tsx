import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// interface Props {
//   navigation
// }

const Home = ({ navigation }) => {
  // const Navigation = useNavigation();
  const [asteroid, setAsteriod] = useState([]);
  const [id, setId] = useState("");
  const [box, setBox] = useState();
  const [newValue, setNewValue] = useState();
  const [collection, setCollection] = useState([]);
  const [randomCard, setRandomCard] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const url =
      "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=s9z25yR54KccLiaMvyNiDshjwF4g9IWTx7idnArE";

    try {
      const response = await fetch(url);
      const details = await response.json();
      setAsteriod(details.near_earth_objects);
    } catch (error) {
      console.log("Error");
    }
  };

  const filterChange = () => {
    if (collection != []) {
      let item = asteroid.find((b) => b.id == id);
      setCollection(item);
      navigation.navigate("Detail", {
        data: item,
      });
    } else {
      fetchApi();
    }
  };

  const randomSelect = () => {
    let card = asteroid[Math.floor(Math.random() * asteroid.length)];
    setRandomCard(card);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.randomBox}>
        <Text style={styles.aster}>{randomCard.id}</Text>
        <Text style={styles.name}>{randomCard.name}</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          testID="SearchBar"
          placeholder="Enter ID"
          value={id}
          onChangeText={(text) => {
            setId(text);
          }}
          placeholderTextColor="#ffff"
          style={styles.textIn}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.button1}
          disabled={id.length == 0 || asteroid.length == 0}
          testID="View"
          onPress={filterChange}
        >
          <Text style={styles.textIn}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={asteroid.length == 0}
          style={[styles.button2, { opacity: asteroid.length == 0 ? 0.2 : 1 }]}
          onPress={() => {
            randomSelect();
          }}
        >
          <Text style={styles.textIn1}>Random</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    backgroundColor: "#345565",
    padding: 20,
    borderRadius: 15,
  },
  textIn: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  textIn1: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  button1: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#ff3456",
    borderRadius: 15,
    marginBottom: 25,
  },
  button2: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#ff3",
    borderRadius: 15,
    marginBottom: 25,
  },
  randomBox: {
    position: "absolute",
    top: 80,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    paddingTop: 10,
  },
  aster: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
});
