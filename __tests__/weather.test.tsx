import "react-native";
import React from "react";
import Weather from "../src/Screens/weather";
import renderer from "react-test-renderer";

const navigation = {
  navigation: jest.fn(),
  params: {
    forecastData: {
      current: {
        temperature: "Delhi",
        humidity: "India",
        cloudcover: "12345",
        weather_descriptions: ["Sunny"],
      },
      location: {
        name: "delhi",
      },
    },
  },
};
const tree = renderer.create(<Weather route={navigation} />);
test("renders correctly", () => {
  expect(tree).toMatchSnapshot();
});
