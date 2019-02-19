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

interface State {
  times: number[]
}

const initialState: State = {
  times: [10, 15, 20, 25, 30, 45, 60]
}

const reducer: React.Reducer<State, actions> = (state, action) => {
  switch (action.type) {
    case 'what':
      return { ...state }
    default:
      return state
  }
}
const App = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
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
            onMomentumScrollEnd={e => console.log('WHAT')}
          >
            {state.times.map(time => (
              <View key={time} style={styles.textWrapper}>
                <Text style={styles.text}>{time}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <TouchableHighlight>
              <Text>Start</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.button}>
            <TouchableHighlight>
              <Text>Start</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.button}>
            <TouchableHighlight>
              <Text>Start</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  scrollViewWrapper: {
    flex: 4,
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
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

export default App
