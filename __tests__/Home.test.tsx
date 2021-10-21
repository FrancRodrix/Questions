import "react-native";
import React from "react";
import Home from "../src/screens/Home";
import renderer from "react-test-renderer";

const navigation = {
  navigate: jest.fn(),
};

test("First test case", () => {
  expect(1 + 5).toBe(6);
});

test("renders correctly", () => {
  const tree = renderer.create(<Home />);
  expect(tree).toMatchSnapshot();
});

test("Navigate correctly", () => {
  const tree = renderer.create(<Home navigation={navigation} />);
  const button = tree.root.findByProps({ testID: "View" }).props;
  button.onPress();
  expect(navigation.navigate).toBeCalledWith("Detail", {
    data: undefined,
  });
});

test("States working correctly", () => {
  const tree = renderer.create(<Home navigation={navigation} />);
  const textInput = tree.root.findByProps({ testID: "SearchBar" }).props;
  renderer.act(() => textInput.onChangeText("text"));
  const textInput1 = tree.root.findByProps({ testID: "SearchBar" }).props;
  expect(textInput1.value).toBe("text");
});
