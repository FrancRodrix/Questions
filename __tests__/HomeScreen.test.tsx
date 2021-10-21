import "react-native";
import React from "react";
import HomeScreen from "../src/Screens/HomeScreen";
import renderer from "react-test-renderer";

const navigation = {
  navigate: jest.fn(),
};

test("First test case", () => {
  expect(1 + 5).toBe(6);
});

test("renders correctly", () => {
  const tree = renderer.create(<HomeScreen />);
  expect(tree).toMatchSnapshot();
});

test("States working correctly", () => {
  const tree = renderer.create(<HomeScreen navigation={navigation} />);
  const textInput = tree.root.findByProps({ testID: "Input" }).props;
  renderer.act(() => textInput.onChangeText("Test"));
  const textInput1 = tree.root.findByProps({ testID: "Input" }).props;
  expect(textInput1.value).toBe("Test");
});
