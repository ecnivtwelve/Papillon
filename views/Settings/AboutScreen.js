import * as React from 'react';
import { View, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import * as WebBrowser from 'expo-web-browser';

import { useState, useEffect } from 'react';
import { Server, Euro, History, Bug, Check } from 'lucide-react-native';
import ListItem from '../../components/ListItem';
import PapillonIcon from '../../components/PapillonIcon';

import getConsts from '../../fetch/consts';
import packageJson from '../../package.json';
import donors from './Donateurs.json';
import team from './Team.json';

import { getInfo } from '../../fetch/AuthStack/LoginFlow';
import GetUIColors from '../../utils/GetUIColors';

function AboutScreen({ navigation }) {
  const theme = useTheme();
  const UIColors = GetUIColors();
  const [serverInfo, setServerInfo] = useState({});

  function openUserLink(url) {
    WebBrowser.openBrowserAsync(url, {
      dismissButtonStyle: 'done',
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      controlsColor: UIColors.primary,
    });
  }

  const [dataList] = useState([
    {
      title: 'Version de Papillon',
      subtitle: packageJson.version,
      color: '#888888',
      icon: <History size={24} color="#888888" />,
    },
    {
      title: 'Canal de distribution',
      subtitle: packageJson.canal,
      color: '#888888',
      icon: <Bug size={24} color="#888888" />,
    },
  ]);

  useEffect(() => {
    getInfo().then((data) => {
      setServerInfo(data);
    });
  }, []);

  const knownServers = [
    'getpapillon.xyz',
    'just-tryon.tech',
    'tryon-lab.fr',
    'vincelinise.com',
  ];

  // eslint-disable-next-line no-unused-vars
  let knownServer = '';
  const [isKnownServer, setIsKnownServer] = useState(false);
  const [serverTag, setServerTag] = useState('Serveur non vérifié');

  function checkKnownServers() {
    return getConsts().then((consts) => {
      console.log(consts.API)

      for (let i = 0; i < knownServers.length; i++) {
        if (consts.API.includes(knownServers[i])) {
          knownServer = knownServers[i];
          return true;
        }
      }

      knownServer = consts.API.split('/')[2];
      return false;
    });
  }

  checkKnownServers().then((isKnown) => {
    setIsKnownServer(isKnown)

    if(isKnown) {
      setServerTag('Serveur vérifié')
    }
  }) 

  const [versionTaps, setVersionTaps] = useState(0);

  function addVersionTap() {
    setVersionTaps(versionTaps + 1);

    if (versionTaps >= 7) {
      setVersionTaps(0);
      WebBrowser.openBrowserAsync('https://matias.ma/nsfw');
    }
  }

  function openServer() {
    if (isKnownServer) {
      navigation.navigate('OfficialServer', {
        official: true,
        server: serverInfo.server,
      });
    } else {
      navigation.navigate('OfficialServer', {
        official: false,
        server: serverInfo.server,
      });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: UIColors.background }]}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={[styles.optionsList]}>
          <Text style={styles.ListTitle}>Serveur</Text>

          { serverInfo.server && serverInfo.version ?
            <ListItem
              title={serverTag}
              subtitle={`${serverInfo.server} v${serverInfo.version}`}
              color="#29947A"
              center
              left={
                <>
                  <PapillonIcon
                    icon={
                      <Server
                        size={24}
                        color={isKnownServer ? '#29947A' : '#0065A8'}
                      />
                    }
                    color={isKnownServer ? '#29947A' : '#0065A8'}
                    size={24}
                    small
                  />

                  {isKnownServer ? (
                    <View
                      style={[
                        styles.certif,
                        { borderColor: theme.dark ? '#111' : '#fff' },
                      ]}
                      sharedTransitionTag="serverCheck"
                    >
                      <Check size={16} color="#ffffff" />
                    </View>
                  ) : null}
                </>
              }
              onPress={() => openServer()}
            />
          :
            <ListItem
            title={'Connexion au serveur...'}
            subtitle={`Détermination de la version....`}
            color="#29947A"
            center
            left={
              <>
                <PapillonIcon
                  icon={
                    <Server
                      size={24}
                      color={'#0065A8'}
                    />
                  }
                  color={'#0065A8'}
                  size={24}
                  small
                />
              </>
            }
            right={
              <>
                <ActivityIndicator />
              </>
            }
            onPress={() => openServer()}
          />
          }
        </View>

        <View style={styles.optionsList}>
          <Text style={styles.ListTitle}>Team Papillon</Text>

          {team.team.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.role}
              color="#565EA3"
              center
              left={
                <Image
                  source={{ uri: item.avatar }}
                  style={{ width: 38, height: 38, borderRadius: 12 }}
                />
              }
              onPress={() => openUserLink(item.link)}
            />
          ))}
        </View>

        <View style={styles.optionsList}>
          <Text style={styles.ListTitle}>
            Donateurs (mis à jour le{' '}
            {new Date(donors.lastupdated).toLocaleDateString('fr')})
          </Text>

          {donors.donors.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              subtitle={`${item.name} à donné ${item.times} fois`}
              color="#565EA3"
              center
              left={
                <PapillonIcon
                  icon={<Euro size={24} color="#565EA3" />}
                  color="#565EA3"
                  size={24}
                  small
                />
              }
            />
          ))}
        </View>

        <View style={styles.optionsList}>
          <Text style={styles.ListTitle}>Informations sur l'app</Text>
          {dataList.map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              color={item.color}
              center
              left={
                <PapillonIcon
                  icon={item.icon}
                  color={item.color}
                  size={24}
                  small
                />
              }
              onPress={() => addVersionTap()}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsList: {
    width: '100%',
    gap: 9,
    marginTop: 16,
    marginBottom: 12,
  },
  ListTitle: {
    paddingLeft: 29,
    fontSize: 15,
    fontFamily: 'Papillon-Medium',
    opacity: 0.5,
  },
  certif: {
    backgroundColor: '#29947A',

    padding: 1,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: -2,
    right: -4,

    borderWidth: 2,
  },
});

export default AboutScreen;
