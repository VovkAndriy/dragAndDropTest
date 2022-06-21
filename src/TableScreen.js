
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import data from './data.json'
export const Table = ({route}) => {
    const {categoryId} = route.params;
    const [columns, setColumns] = useState(['Name', 'Price', 'Amount'])
    const [sortState, setSortState] = useState(true);
    const rows = data.results.filter((i) => i.id === categoryId);
    const [categories, setCategories] = useState(rows[0].products);

    const sortTable = (column) => {
      if(column === 'Name'){
          categories.sort((a, b) => {
              if(a.productName < b.productName){
                  return -1;
              }
              setSortState(!sortState)
          })
      }
        if(column === 'Price') {
            categories.sort((a, b) => a.price - b.price)
            setSortState(!sortState)
        }
        if(column === 'Amount') {
            categories.sort((a, b) => a.amount - b.amount)
            setSortState(!sortState)
        }
    }

    const tableHeader = () => (
      <View style={styles.tableHeader}>
          {
              columns.map((column, index) => {
                  {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.columnHeader}
                          onPress={()=> sortTable(column)}>
                            <Text style={styles.columnHeaderTxt}>
                                {column}
                            </Text>
                        </TouchableOpacity>
                      )
                  }
              })
          }
      </View>
    )
    return(
          <View style={styles.container}>
              <FlatList
                data={categories}
                style={{width:"90%"}}
                keyExtractor={(item, index) => index+""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({item, index})=> {
                    return (
                      <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                          <Text style={{...styles.columnRowTxt}}>{item.productName}</Text>
                          <Text style={styles.columnRowTxt}>{item.price}</Text>
                          <Text style={styles.columnRowTxt}>{item.amount}</Text>
                      </View>
                    )
                }}
              />
          </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:80
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#37C2D0",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50
    },
    tableRow: {
        flexDirection: "row",
        height: 40,
        alignItems:"center",
    },
    columnHeader: {
        width: "20%",
        justifyContent: "center",
        alignItems:"center"
    },
    columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
    },
    columnRowTxt: {
        width:"30%",
        textAlign:"center",
    }
});
