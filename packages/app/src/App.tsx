import React from "react";
import {
  Button,
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AsyncStorageExample } from "./AsyncStorageExample";
import { subplatform } from "./config";
import LogoSrc from "./logo.png";

import { LinkingOptions, NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";


type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Async: undefined;
}


type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;
type AsyncScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Async'
>;

function HomeScreen() {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#ffcc00' }}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <View style={{ backgroundColor: '#ffcc66', height: 32, width: '100%' }}></View>
      <Button
        title="Go to Async"
        onPress={() => navigation.navigate('Async')}
      />
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

function DetailsScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { name, params } = useRoute();

  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>Route name: {name}</Text>
      <Text>Route params: {params}</Text>

      <Button
        title="Go Home"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const platformValue = subplatform
  ? `${Platform.OS} (${subplatform})`
  : Platform.OS;

console.log('platformValue', platformValue);

const RootStack = platformValue === 'macos' ?
  createStackNavigator<RootStackParamList>() :
  createNativeStackNavigator<RootStackParamList>();


const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['tt'],
  config: {
    screens: {
      Home: "",
      Details: "details",
      Async: "async",
    }
  }
};

export function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
          <RootStack.Screen name="Async" component={AsyncStorageExample} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
