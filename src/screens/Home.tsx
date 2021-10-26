import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { ListRenderItem } from "react-native";
import { SearchBar } from "react-native-screens";

export type Props = {
  count: number;
  size: string;
  text: string;
};

const Home: React.FC<Props> = ({ count = 1, navigation }) => {
  const [pageCount, setPageCount] = React.useState(count);
  const [searchKeyword, setSearchKeyWord] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filterdCardList, setFilteredCardList] = React.useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   // console.log(pageCount, 'page');
  //   fetchApi();
  //   const interval = setInterval(() => setPageCount(pageCount + 1), 10000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [pageCount]);

  useEffect(() => {
    fetchApi();
    const interval = setInterval(() => setPageCount(pageCount + 1), 10000);
    if (pageCount > 50) {
      clearInterval(interval);
    }
   
  }, [pageCount]);

  const fetchApi = async () => {
    const url =
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" +
      pageCount;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      });
      const stories = await response.json();
      setList(list.concat(stories.hits));
      setLoading(false);
      console.log("FETCH", list.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (text) => {
    setSearchKeyWord(text);
    if (text.length > 0) {
      setIsSearching(true);
      let temp = list;
      var tempData = temp.filter((item) => {
        return (
          (item.title + item.author).toUpperCase().indexOf(text.toUpperCase()) >
          -1
        );
      });
      setFilteredCardList(tempData);
      console.log(tempData, "LOGGING");
    } else {
      setIsSearching(false);
    }
  };

  const renderList = (item: any) => {
    return (
      <TouchableOpacity
        testID="Controler"
        onPress={(v) => {
          navigation.navigate("Detail", {
            data: item,
          });
        }}
        style={styles.card}
      >
        <Text style={styles.title}>{item.item.title}</Text>
        <Text style={styles.url}>{item.item.url}</Text>
        <Text style={styles.created}>{item.item.created_at}</Text>
        <Text style={styles.author}>{item.item.author}</Text>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  // const renderMore = () => {
  //   setPageCount(pageCount + 1);
  //   setLoading(true);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Posts</Text>
      <View style={styles.textInput}>
        <TextInput
          testID="SearchBar"
          placeholder="Search"
          value={searchKeyword}
          placeholderTextColor={"#fff"}
          onChangeText={(text) => {
            handleSearch(text);
          }}
          style={styles.input}
        />
      </View>
      {isSearching ? (
        <FlatList
          data={filterdCardList}
          renderItem={renderList}
          keyExtractor={(item) => item.url}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <FlatList
          data={list}
          renderItem={renderList}
          ListFooterComponent={renderFooter}
          keyExtractor={(item) => item.url}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  header: {
    alignSelf: "center",
    fontSize: 24,
    color: "#567567",
    fontWeight: "bold",
  },
  card: {
    alignSelf: "center",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
    backgroundColor: "#87ceea",
    shadowColor: "#000",
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
  footer: {
    marginTop: 10,
    alignSelf: "center",
  },
  textInput: {
    alignSelf: "center",
    width: "80%",
    padding: 20,
    backgroundColor: "#234678",
    borderRadius: 10,
    marginVertical: 25,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Home;

// const SearchItems = (text: any, list: any) => {
//   if (text) {
//     const newData = list.filter(i => {
//       const itemData = i.author
//         ? i.author.toUpperCase()
//         : ''.toUpperCase() || i.title
//         ? i.title.toUpperCase()
//         : ''.toUpperCase() || i.created_at
//         ? i.created_at.toUpperCase()
//         : ''.toUpperCase();

//       const textData = text.toUpperCase();
//       return itemData.indexOf(textData) > -1;
//     });
//     setList(newData);
//     setSearch(text);
//     setLoading(false);
//   } else {
//     setList(list);
//     setSearch(text);
//   }
// };
