import * as React from 'react';
import { View, ScrollView, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';

import PapillonHeader from '../components/PapillonHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import packageJson from '../package.json';

import ListItem from '../components/ListItem';
import PapillonIcon from '../components/PapillonIcon';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Settings, User2, Palette, Info } from 'lucide-react-native';

import {refreshToken, expireToken} from '../fetch/AuthStack/LoginFlow';

function SettingsScreen({ navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const logout = () => {
    AsyncStorage.removeItem('token');
  }

  return (
    <View style={{flex: 1}}>
      <PapillonHeader 
        insetTop={insets.top}
        pageName="Compte"
        rightButton={
          <Pressable>
            <Settings size={24} color={theme.colors.onSurface} />
          </Pressable>
        }
      />
      <ScrollView style={[{paddingTop: insets.top + 52}]} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar animated backgroundColor={theme.colors.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} />

        <View style={styles.optionsList}>
          <Text style={styles.ListTitle}>Options du compte</Text>

          <ListItem
            title="Profil"
            subtitle="Configurez votre compte Papillon, votre pseudonyme, votre photo de profil..."
            color="#29947A"
            left={
              <PapillonIcon
                icon={<User2 size={24} color="#fff" />}
                color="#29947A"
                size={24}
                fill
                small
              />
            }
            onPress={() => navigation.navigate('Profile')}
          />

          <ListItem
            title="Réglages"
            subtitle="Paramètres de l’application et modification de son comportement"
            color="#565EA3"
            left={
              <PapillonIcon
                icon={<Settings size={24} color="#fff" />}
                color="#565EA3"
                size={24}
                fill
                small
              />
            }
          />

          <ListItem
            title="Apparence"
            subtitle="Personnaliser et modifier l’apparence de l’application"
            color="#A84700"
            left={
              <PapillonIcon
                icon={<Palette size={24} color="#fff" />}
                color="#A84700"
                size={24}
                fill
                small
              />
            }
          />

          <ListItem
            title="A propos"
            subtitle={"Papillon version " + packageJson.version}
            color="#888"
            left={
              <PapillonIcon
                icon={<Info size={24} color="#fff" />}
                color="#888"
                size={24}
                fill
                small
              />
            }
            onPress={() => navigation.navigate('About')}
          />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsList: {
    width: '100%',
    gap: 9,
    marginTop: 21,
  },
  ListTitle: {
    paddingLeft: 29,
    fontSize: 15,
    fontFamily: 'Papillon-Medium',
    opacity: 0.5,
  }
});

export default SettingsScreen;