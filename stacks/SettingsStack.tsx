import React from 'react';
import { View, Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { headerTitleStyles } from './AppStack';
import GetUIColors from '../utils/GetUIColors';

import SettingsScreen from '../views/SettingsScreen';
import AboutScreen from '../views/Settings/AboutScreen';
import DonorsScreen from '../views/Settings/DonorsScreen';
import ProfileScreen from '../views/Settings/ProfileScreen';
import AppearanceScreen from '../views/Settings/AppearanceScreen';
import SettingsScreen2 from '../views/Settings/SettingsScreen';
import IconsScreen from '../views/Settings/IconsScreen';
import CoursColor from '../views/Settings/CoursColor';
import AdjustmentsScreen from '../views/Settings/AdjustmentsScreen';
import HeaderSelectScreen from '../views/Settings/HeaderSelectScreen';
import PaymentScreen from '../views/Settings/PaymentScreen';
import NotificationsScreen from '../views/Settings/NotificationsScreen';
import ConsentScreen from '../views/NewAuthStack/ConsentScreen';

function InsetSettings() {
  const UIColors = GetUIColors();
  
  return (
    <Stack.Navigator
      screenOptions={
        Platform.OS === 'android'
          ? {
            animation: 'fade_from_bottom',
            navigationBarColor: '#00000000',
          }
          : {
            ...headerTitleStyles,
          }
      }
    >
      <Stack.Screen
        name="Compte"
        component={SettingsScreen}
        options={
          Platform.OS === 'ios' ?
            {
              headerTitle: 'Préférences',
              headerLargeTitle: false,
            }
            :
            {
              headerTitle: 'Compte',
            }
        }
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Mon profil',
          headerBackTitle: 'Préférences',
        }}
      />
      <Stack.Screen
        name="CoursColor"
        component={CoursColor}
        options={{
          headerTitle: 'Gestion des matières',
          headerBackTitle: 'Retour',
        }}
      />
      <Stack.Screen
        name="Adjustments"
        component={AdjustmentsScreen}
        options={{
          headerTitle: 'Ajustements',
          headerBackTitle: 'Retour',
        }}
      />
      <Stack.Screen
        name="HeaderSelect"
        component={HeaderSelectScreen}
        options={{
          headerTitle: 'Bandeau',
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerTitle: 'Soutenir Papillon',
          headerBackTitle: 'Retour',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: 'A propos de Papillon',
          headerBackTitle: 'Préférences',
        }}
      />
      <Stack.Screen
        name="Donors"
        component={DonorsScreen}
        options={{
          headerTitle: 'Donateurs',
          headerBackTitle: 'A propos',
        }}
      />
      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{
          headerTitle: 'Fonctionnalités',
          headerBackTitle: 'Préférences',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: 'Notifications',
          headerBackTitle: 'Préférences',
        }}
      />
      <Stack.Screen
        name="ConsentScreen"
        component={ConsentScreen}
        options={{
          headerTitle: 'Termes & conditions',
          headerBackTitle: 'Préférences',
          headerBackVisible: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Icons"
        component={IconsScreen}
        options={{
          headerTitle: 'Icône de l\'application',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen2}
        options={{
          headerTitle: 'Réglages',
          headerBackTitle: 'Préférences',
        }}
      />
    </Stack.Navigator>
  );
}

export default InsetSettings;