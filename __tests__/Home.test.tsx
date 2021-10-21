import "react-native";
import React from "react";
import Home from "../src/screens/Home";
import renderer from "react-test-renderer";
// import Navigation from '../src/Navigation/Navigation';

const navigation = {
  navigate: jest.fn(),
  params: null,
};

test("First test case", () => {
  expect(1 + 5).toBe(6);
});

const tree = renderer.create(<Home navigation={navigation} />);

test("Rendering Check", () => {
  expect(tree).toMatchSnapshot();
});

test("States Check",()=>{
  const tree = renderer.create(<Home navigation={navigation} />);
  const textInput=tree.root.findByProps({testID:"SearchBar"}).props;
  renderer.act(()=>textInput.onChangeText("val"))
  const textInput1 = tree.root.findByProps({ testID: "SearchBar" }).props;
  expect(textInput1.value).toBe("val")
})


