// navigationTypes.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined; // No parámetros adicionales
  Profile: undefined;
  // Agrega aquí otros nombres de pantallas y sus parámetros si los hay
};

export type GenericNavigationProp = StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
