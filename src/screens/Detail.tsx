import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

interface Props {
  navigation:any;
}

export default function Detail(props: Props) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Text>GO BACK</Text>
      </TouchableOpacity>
      <View style={styles.json}>
        <Text>{JSON.stringify(props.route.params.data)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e67845",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  url: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  created: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  author: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    top: 70,
    left: 40,
  },
  json: {
    marginHorizontal: 20,
  },
});
