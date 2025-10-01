
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from './src/Pages/ListAlumnos';
import { AlumnosProvider } from './src/Services/AlumnosContext'
import FormAlumnos from './src/Pages/FormAlumnos';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <AlumnosProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'Alumnos', headerShown: false }} />
            <Stack.Screen name="Form" component={FormAlumnos} options={{ title: 'Registro Alumnos', headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlumnosProvider>
    </PaperProvider>
  );
}
