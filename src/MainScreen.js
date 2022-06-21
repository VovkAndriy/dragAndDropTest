
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  Platform,
  Easing,
  View,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import data from './data.json'

const window = Dimensions.get('window');
function Row({ active, data, navigation, id }) {

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <Text onPress={() => navigation.navigate('Table', {categoryId: id})} style={styles.text}>{data.categoryName}</Text>
    </Animated.View>
  );
}

export const MainScreen = ({navigation}) => {

  const [reset, setReset] = useState(false);
  const [defaultOrder, setDefaultOrder] = useState([])
  let sortedData;
   sortedData = data.results.sort((a, b) => {
    if(a.categoryName < b.categoryName){
      return -1;
    }
    if(a.categoryName > b.categoryName){
      return 1;
    }
    return 0
  })
  const handleReset = () => {
    setReset(true);
    setDefaultOrder([0, 1, 2, 3, 4, 5, 6]);
    setTimeout(() => {
      setReset(false)
    }, 1000)
  }
  const renderRow = useCallback(({data, active}) => {
    return <Row id={data.id} navigation={navigation} data={data} active={active} />;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReset} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{'Reset Order'}</Text>
      </TouchableOpacity>
      <SortableList
        order={reset ? defaultOrder : null}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={sortedData}
        renderRow={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  row: {
    textAlign: "center",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  text: {
    marginLeft: '25%',
    fontSize: 24,
    color: '#222222',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
