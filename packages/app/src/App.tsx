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

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";


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
  const navigation = useNavigation <DetailScreenNavigationProp>();

  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
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

  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function App(): JSX.Element {
  const platformValue = subplatform
    ? `${Platform.OS} (${subplatform})`
    : Platform.OS;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
          <RootStack.Screen name="Async" component={AsyncStorageExample} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
