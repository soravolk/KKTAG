import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  ListItem,
  Divider,
  Button,
  Input,
  Icon,
  Avatar
} from "react-native-elements";
import { trendData } from "./testData";

export default function LinksScreen() {
  keyExtractor = (item, index) => index.toString();

  renderList = ({ item }) => {
    return <ListItem title={item.tag} subtitle={item.num} bottomDivider />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={trendData}
        renderItem={this.renderList}
      />
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: "發燒",
  headerStyle: {
    backgroundColor: "#00b0ff"
  },
  headerTintColor: "#f3e5f5"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
