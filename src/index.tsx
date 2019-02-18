import * as React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView
} from 'react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

interface Props {
  text: string
}

interface State {
  times: number[]
  selectedTime?: number
}
export default class App extends React.Component<Props, State> {
  public state = {
    times: [10, 15, 20, 25, 30, 45, 60]
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.scrollViewWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToAlignment={'center'}
              snapToInterval={200}
              onMomentumScrollEnd={e =>
                this.setTimerValue(e.nativeEvent.contentOffset.x)
              }
            >
              {this.state.times.map(time => (
                <View key={time} style={styles.textWrapper}>
                  <Text style={styles.text}>{time}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  private setTimerValue = (scrollPosition: number): void => {
    console.log('ScrollPosition', scrollPosition)
    // text width = 200 / 100 / 2 gives us index
    const index = scrollPosition / 100 / 2
    console.log('Index', index, this.state.times[index])
    this.setState({ selectedTime: this.state.times[index] })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  scrollViewWrapper: {
    width: 200
  },
  text: {
    fontSize: 150
  },
  textWrapper: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200
  }
})
