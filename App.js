import React from 'react';
import 'react-native-gesture-handler';

global.url = 'https://kulinarcho.com/api/';

import {Text} from "react-native";
import AuthSack from "./src/roots/AuthNavigation";



function LogoTitle() {
    return (
        <Text style={{backgroundColor:'green', color:'#fff', height:40}}>Example</Text>
    );
}

function App() {
  return (
    // <TabNavigator/>
      <AuthSack/>
  );
}

export default App;

