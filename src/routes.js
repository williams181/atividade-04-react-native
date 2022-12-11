import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Register from './screens/Cadastro';
import Contact from './screens/Contato';
import List from './screens/Lista';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Contact" component={Contact} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;