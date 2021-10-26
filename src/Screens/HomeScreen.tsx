import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Axios from "axios";
import { padding } from "styled-system";

interface Props {
  navigation;
}

const HomeScreen = ({navigation}) => {
  const [keyWord, setKeyword] = useState("");
  const [api, setApi] = useState("https://restcountries.com/v2/name/");
  const [capital, setCapital] = useState("");

  const [countryList, setCountryList] = useState();

  const fetchApi = async (api: any) => {
    const data = api;
    try {
      const response = await Axios.get(data).then(async (res) => {
        // console.log(res.data, "FETCHED");
        setCapital(res.data);
        setCountryList(res.data);
        console.log(res.data)
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    console.log(keyWord);
    fetchApi(api + keyWord);
  };

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", {
            data: item,
          });
        }}
        style={styles.countryCard}
      >
        <Text style={{ textAlign: "center" }}>{item.item.name}</Text>
        <Text style={{ textAlign: "center" }}>{item.item.capital}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "80%",
          alignSelf: "center",
          marginVertical: 20,
        }}
      >
        <View style={styles.searchBar}>
          <TextInput
            testID="Input"
            onChangeText={(text: any) => {
              setKeyword(text);
            }}
            value={keyWord}
            placeholder={"Enter Keyword"}
            placeholderTextColor={"#fff"}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={handleSearch}
            disabled={keyWord.length == 0}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList data={countryList} 
      renderItem={renderItem}
      keyExtractor={item=>item.alpha2Code} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchBar: {
    flex: 3,
    // alignSelf: 'center',
    width: "80%",
    backgroundColor: "#fe5674",
    padding: 10,
    borderRadius: 15,
    marginRight: 15,
  },
  button: {
    // alignSelf: 'center',
    padding: 10,
    backgroundColor: "#3D85C6",
    borderRadius: 15,
    // marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  countryCard: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: "80%",
    backgroundColor: "yellow",
  },
});
