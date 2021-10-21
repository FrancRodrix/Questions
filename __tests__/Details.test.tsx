import "react-native";
import React from "react";
import Detail from '../src/Screens/Details';
import renderer from "react-test-renderer";

const navigation = {
    navigation: jest.fn(),
    params: {
        data:{
            item:{
                capital:'Delhi',
                name:'India',
                population:'12345',
                flags:{
                    png:'url'
                }
            
            }
           
        }
    }
}
// configure({ adapter: new Adapter() });
const tree = renderer.create(<Detail route={navigation} />);
test('renders correctly', () => {
    expect(tree).toMatchSnapshot();
});