import "react-native";
import React from "react";
import Detail from "../src/screens/Detail";
import renderer from "react-test-renderer";

const navigation = {
  navigation: jest.fn(),
  params: {
    data: {
      name: "Delhi",
      name_limited: "Contry",
      designation: "asteriod",
    },
  },
};
// configure({ adapter: new Adapter() });
const tree = renderer.create(<Detail route={navigation} />);
test("renders correctly", () => {
  expect(tree).toMatchSnapshot();
});
