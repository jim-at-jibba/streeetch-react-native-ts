import * as React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableHighlight
} from 'react-native'

interface Props {
  text: string
}

interface State {
  times: number[]
  selectedTime?: number
  selectedIndex?: number
  remainingTime?: number
  timerRunning?: boolean
}
export default class App extends React.Component<Props, State> {
  private scroll = React.createRef()
  private intervalHandler?: any
  private secondsRemaining?: number

  public state = {
    times: [10, 15, 20, 25, 30, 45, 60],
    selectedIndex: 0,
    timerRunning: false
  }

  tick = () => {
    const sec = this.secondsRemaining
    console.log('SECS', this.secondsRemaining)

    this.setState({
      remainingTime: this.secondsRemaining
    })

    // if (sec < 10) {
    //   this.setState({
    //     remainingTime: `0${this.state.remainingTime}`
    //   })
    // }

    if (sec === 0) {
      clearInterval(this.intervalHandler)
      this.setState({
        remainingTime: undefined,
        timerRunning: false
      })
    }

    this.secondsRemaining!--
  }

  startCountdown = () => {
    this.secondsRemaining = this.state.times[this.state.selectedIndex]
    console.log('SELECTED', this.secondsRemaining)
    this.intervalHandler = setInterval(this.tick, 1000)
    this.setState({ timerRunning: true })
  }
  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        {!this.state.timerRunning && (
          <View style={styles.scrollViewWrapper}>
            <View style={styles.scrollButton}>
              <TouchableHighlight onPress={() => this.moveTo('prev')}>
                <Text style={styles.scrollButtonText}>Prev</Text>
              </TouchableHighlight>
            </View>
            <View style={{ width: 200 }}>
              <ScrollView
                ref={this.scroll}
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
            <View style={styles.scrollButton}>
              <TouchableHighlight onPress={() => this.moveTo()}>
                <Text style={styles.scrollButtonText}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}

        {this.state.timerRunning && (
          <View style={styles.scrollViewWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{this.state.remainingTime}</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <TouchableHighlight onPress={this.startCountdown}>
              <Text>Start</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  private setTimerValue = (scrollPosition: number): void => {
    console.log('ScrollPosition', scrollPosition, this.scroll.current)
    // text width = 200 / 100 / 2 gives us index
    const index = scrollPosition / 100 / 2
    console.log('Index', index, this.state.times[index])
    this.setState({
      selectedTime: this.state.times[index],
      selectedIndex: index
    })
  }

  private moveTo = (whichWay?: string): void => {
    console.log('WORKING')
    // get current index * 100 * 2
    let moveX = (this.state.selectedIndex + 1) * 2 * 100

    if (whichWay === 'prev') {
      if (this.state.selectedIndex === 0) {
        moveX = 0
      }
      moveX = (this.state.selectedIndex - 1) * 2 * 100
    }

    console.log('Move X', moveX)
    this.scroll.current!.scrollTo({
      x: moveX,
      animated: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4AC57'
  },
  scrollViewWrapper: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 150,
    color: 'white'
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    alignItems: 'center'
  },
  scrollButton: {
    flex: 1,
    alignItems: 'center'
  },
  scrollButtonText: {
    color: 'white'
  },
  time: {
    fontSize: 50
  }
})
