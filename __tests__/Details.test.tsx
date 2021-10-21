import "react-native";
import React from "react";
import Detail from "../src/screens/Detail";
import renderer from "react-test-renderer";

const navigation = {
  navigate: jest.fn(),
  params: {
    data: {},
  },
};

test("Rendering Check", () => {
  const tree = renderer.create(<Detail route={navigation} />);
  expect(tree).toMatchSnapshot();
});
