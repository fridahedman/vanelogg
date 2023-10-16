import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

import colors from '../assets/colors/colors';

const AboutPage = ({aboutPageVisible, setAboutPageVisible}) => {
  const handleCloseModal = () => {
    setAboutPageVisible(false);
  };

  const getHeader = () => {
    return (
      <>
        <View style={styles.headerWrapper}>
          <Image
            source={require('../assets/images/Logga1.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Logga dina vanor - varje dag!</Text>
        </View>
        <View style={styles.bodyTextWrapper}>
          <Text style={styles.bodyText}>
            En vanelogg är till för att se hur ofta du faktiskt utför dina
            vanor, och för att motivera dig att faktiskt fortsätta med dem. Här
            kommer några tips på hur du kan använda din vanelogg på bästa sätt.
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.subHeading}>Hur börjar jag?</Text>
        </View>
        <View style={styles.bodyTextWrapper}>
          <Text style={styles.bodyText}>
            Lägg till en vana som du vill göra varje dag eller några dagar i
            veckan. Så fort du gjort din vana den dagen klickar du i rutan för
            dagens datum i vaneloggen. Det är viktigt att du fyller i loggen
            direkt efter du gjort vanan, då kommer du ihåg att fylla i den och
            du får direkt återkoppling på att du gjort något bra.
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.subHeading}>Hoppa aldrig över två gånger</Text>
        </View>
        <View style={styles.bodyTextWrapper}>
          <Text style={styles.bodyText}>
            Det är okej att inte vara perfekt, ingen kommer kunna göra sin varje
            gång de planerat att göra den. Men denna regel är bra för att hjälpa
            dig snabbt komma in i rutinen när du missat din vana en dag. En gång
            är okej att missa, men två gånger är början på en ny vana: att inte
            göra vanan du tänkt dig göra.
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.subHeading}>Logga bara några få vanor</Text>
        </View>
        <View style={styles.bodyTextWrapper}>
          <Text style={styles.bodyText}>
            Fokusera på en till fyra vanor i din vanelogg. Det är bättre att ha
            koll på de viktigaste vanorna än att sporadiskt logga tio vanor
            samtidigt.
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.subHeading}>Börja litet</Text>
        </View>
        <View style={styles.bodyTextWrapper}>
          <Text style={styles.bodyText}>
            För att få in en helt ny vana krävs det att den till en början är
            väldigt lätt att utföra. Gör det så lätt för dig själv att du inte
            kan säga nej. Vanan behöver inte ta mer än två minuter, sen kan du
            långsamt bygga på den. Det viktiga är att du får in rutinen i din
            vardag.
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.subHeading}>Tips på vanor att logga</Text>
        </View>
      </>
    );
  };

  const getFooter = () => {
    return (
      <>
        <View style={styles.titleWrapper}>
          <Text style={styles.subHeading}>Lycka till!</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleCloseModal();
          }}>
          <View style={styles.goBackButton}>
            <Text style={styles.bodyText}>{'Tillbaka till vaneloggen '}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Modal
        visible={aboutPageVisible}
        animation="none"
        transparent={false}
        onRequestClose={handleCloseModal}>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.body}>
              {/* <ScrollView> */}
              <View style={styles.bodyTextWrapper}>
                <FlatList
                  data={[
                    {key: 'Skriva dagbok'},
                    {key: 'Läsa en bok'},
                    {key: 'Meditera'},
                    {key: 'Göra armhävningar'},
                    {key: 'Yoga'},
                    {key: 'Använda tandtråd'},
                    {key: 'Gå en promenad'},

                    {key: 'Diska'},
                    {key: 'Spela ett instrument'},
                  ]}
                  // scrollEnabled={false}
                  renderItem={({item}) => (
                    <Text style={styles.bulletText}>
                      {'\u25CF' + ' '}
                      {item.key}
                    </Text>
                  )}
                  ListHeaderComponent={getHeader}
                  ListFooterComponent={getFooter}
                />
              </View>

              {/* </ScrollView> */}
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  logo: {
    marginTop: 10,
    width: 100,
    height: 25,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleWrapper: {
    marginTop: 25,
  },
  title: {
    fontSize: 22,
    color: colors.black,
  },
  subHeading: {
    fontSize: 18,
    color: colors.black,
  },
  bodyTextWrapper: {
    marginTop: 5,
  },
  bodyText: {},
  bulletText: {marginTop: 2},
  goBackButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.trackLightGreen,
  },
});
