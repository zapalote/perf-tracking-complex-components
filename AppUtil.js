import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, } from 'react-native';
//import { AsyncStorage } from '@react-native-community/async-storage';
import { Store } from './utils';

class App extends Component {

  state = {
    info: 0,
    error: 'none',
  }

  componentDidMount = async () => {
    StatusBar.setHidden(true);
    Store.set('@info', 0, this.setError);
  }

  setError = (error) => {
    this.setState({ error, });
  }

  setInfo = async () => {
    Store.set('@info', this.state.info + 1, this.setError);
    const info = Store.get('@info', this.setError);
    this.setState({ info,  });

    console.warn(Store.getData(this.setError));
  }

  render() {
    const { info, error } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.body}>
          <TouchableOpacity style={styles.sectionContainer} onPress={this.setInfo}>
            <Text style={styles.sectionTitle}>{`info: ${info}`}</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionContainer, styles.highlight]}>
            <Text>{`error: ${error}`}</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
