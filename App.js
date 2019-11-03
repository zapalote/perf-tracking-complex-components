import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Store } from './utils';

class App extends Component {

  state = {
    storedArray: [],
    perf : 0,
    errorMsg: '',
  };
  ARRAY = 'array';
  interval = null;
  startTime = 0;

  componentDidMount = async () => {
    Store.setErrorMethod(this.setError);
    const storedArray = await Store.get(this.ARRAY);
    this.setState({
      storedArray: storedArray? storedArray: [],
    });
  }

  setError = (errorMsg) => {
    this.setState({ errorMsg });
  }

  trackPerf = (run) => {
    if(run) {
      this.interval && clearInterval(this.interval);
      this.setState({ perf: 0 });
      this.startTime = new Date();
      this.interval = setInterval(() => {
        const elapsed = new Date() - this.startTime;
        this.setState({ perf: elapsed, });
      }, 100);
    } else {
      this.interval && clearInterval(this.interval);
    }
  }

  increaseArray = async () => {
    const { storedArray } = this.state;
    let incr = 100000;
    for(let i=0; i<incr; i++){
      storedArray.push(i);
    }

    this.trackPerf(true);
    await Store.set(this.ARRAY, storedArray);
    const newItem = await Store.get(this.ARRAY);
    this.trackPerf(false);
    this.setState({ storedArray: newItem });
  };

  clearArray = async () => {
    await Store.remove(this.ARRAY);
    const newItem = await Store.get(this.ARRAY);
    this.setState({needRestart: true, storedArray: newItem? newItem : [], perf: 0, errorMsg: ''});
  };

  render() {
    const {storedArray, errorMsg, perf, } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>AsyncStorage Performance</Text>
        <Text style={styles.subtitle}>(iOS Simulator)</Text>
        <Text style={styles.results}>
          <Text>Array length: </Text><Text>{storedArray.length}</Text>
        </Text>
        <Text style={styles.results}>
          <Text>W+R in </Text><Text>{perf}</Text><Text>ms</Text>
        </Text>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={this.increaseArray}>
            <Text style={styles.buttonText}>Increase array size</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={this.clearArray}>
            <Text style={styles.buttonText}>Clear store</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          <Text>{errorMsg}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    //margin: 10,
  },
  results: {
    fontFamily: 'Courier',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 60,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.5,
  },
  buttonView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 30,
  },
  buttonText:{
    color: '#00BCD4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    //padding:15,
    marginLeft:15,
    marginRight:15,
    //borderRadius:10,
    //borderWidth: 1,
    //borderColor: '#fff',
    backgroundColor: 'white',
    textAlign:'center',
  },
  footer: {
    flexDirection: 'row',
    margin: 30,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default App;
