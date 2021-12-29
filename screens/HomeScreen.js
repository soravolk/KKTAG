import React from "react";
import {
  ListItem,
  Divider,
  Button,
  Input,
  Icon,
  Avatar
} from "react-native-elements";
import {
  Image,
  StatusBar,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  View,
  Modal
} from "react-native";
import { tag } from "./data";

const STANDARD_SIZE = Math.floor(Dimensions.get("window").width);

const StatusBarHeight = StatusBar.currentHeight;

const BASE_URL =
  "https://api.kkbox.com/v1.1/search?q=理想混蛋&territory=TW&limit=50&type=track";

// const listName = {
//   name: "打扣心情好"
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  modalInfoContainer: {
    marginVertical: 0.3 * STANDARD_SIZE,
    marginHorizontal: 0.1 * STANDARD_SIZE,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8,
    shadowColor: "#ffccbc",
    shadowOpacity: 0.4,
    shadowRadius: 7,
    shadowOffset: {
      height: 4,
      width: 1
    }
  },
  modalInfoContainerInner: {
    alignItems: "center",
    paddingHorizontal: 0.1 * STANDARD_SIZE,
    paddingTop: 0.05 * STANDARD_SIZE,
    paddingBottom: 0.01 * STANDARD_SIZE,
    maxHeight: 1.2 * STANDARD_SIZE
  },
  mateNameText: {
    fontSize: 0.05 * STANDARD_SIZE,
    textAlign: "right",
    fontWeight: "bold",
    lineHeight: 0.08 * STANDARD_SIZE
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 0.02 * STANDARD_SIZE
  },
  buttonItem: {
    borderRadius: 10,
    elevation: 8,
    shadowColor: "#ffccbc",
    shadowOpacity: 0.4,
    shadowRadius: 7,
    shadowOffset: {
      height: 4,
      width: 1
    },
    marginHorizontal: 0.03 * STANDARD_SIZE
  },
  avatarContainer: {
    marginBottom: 0.04 * STANDARD_SIZE
  },
  nameText: {
    fontSize: 0.06 * STANDARD_SIZE,
    lineHeight: 0.08 * STANDARD_SIZE,
    textAlign: "center"
  }
});

class HomeScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#00b0ff"
      },
      headerTintColor: "#f3e5f5",
      title: "KK-TAG",
      headerRight: (
        <Button
          icon={
            <Icon
              name="ios-search"
              type="ionicon"
              color="#f3e5f5"
              iconStyle={{ marginHorizontal: 4 }}
            />
          }
          iconRight={true}
          type="clear"
          onPress={() => navigation.getParam("setSearchVisible")(true)}
        />
      ),
      headerLeft: (
        <Button
          icon={
            <Icon
              name="ios-apps"
              type="ionicon"
              color="#f3e5f5"
              iconStyle={{ marginHorizontal: 4 }}
            />
          }
          iconRight={true}
          type="clear"
          onPress={() => navigation.getParam("setListVisible")(true)}
        />
      )
    };
  };
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      setSearchVisible: this.setSearchVisible,
      setListVisible: this.setListVisible
    });
  }
  state = {
    modalVisible: false,
    modalSearchVisible: false,
    modalOutcomeVisible: false,
    modalAddVisible: false,
    modalListVisible: false,
    modalAddListVisible: false,
    listData: [],
    tagMusic: [],
    tagText: "",
    tagSearch: "",
    itemId: "",
    tag: tag,
    image: "",
    name: "",
    musicListId: "",
    musicListItems: [],
    listName: ""
  };
  //call API
  createMusicList = () => {
    fetch("https://api.kkbox.com/v1.1/me/playlists", {
      method: "POST",
      headers: {
        Authorization: "Bearer IETpc9XE7DeoQqv9BRFzIA==",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.listName.toString()
      })
    })
      .then(res => res.json())
      .then(responseData => {
        // 單純只做 log
        this.setState({ musicListId: responseData.playlist_id });
        console.log(responseData);
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  };

  putMusicToList = () => {
    fetch(
      `https://api.kkbox.com/v1.1/me/playlists/${this.state.musicListId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer IETpc9XE7DeoQqv9BRFzIA==",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ track_ids: [this.state.itemId] })
      }
    )
      .then(res => res.json())
      .then(responseData => {
        // 單純只做 log
        this.setAddVisible();
        console.log(responseData);
      })
      .then(resp => {
        this.checkMusicInList();
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  };

  checkMusicInList = () => {
    fetch(
      `https://api.kkbox.com/v1.1/me/playlists/${this.state.musicListId}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer IETpc9XE7DeoQqv9BRFzIA=="
        }
      }
    )
      .then(res => res.json())
      .then(responseData => {
        // 單純只做 log
        this.setState({ musicListItems: responseData.data });
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  };

  getEvent() {
    // 取得 BASE_URL response 的資料
    fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer IETpc9XE7DeoQqv9BRFzIA=="
      }
    })
      .then(res => res.json())
      .then(responseData => {
        // 單純只做 log
        this.setState({ listData: responseData.tracks.data });
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  }
  //call API

  handleAddList = () => {
    this.createMusicList();
  };

  // musicList
  renderList = ({ item }) => {
    // console.log(item);
    return (
      <ListItem
        title={item.name}
        leftAvatar={{ source: { uri: item.album.images[0].url } }}
        onPress={() => {
          this.setVisible();
          this.setState({
            itemId: item.id,
            image: item.album.images[0].url,
            name: item.name
          });
        }}
        bottomDivider
      />
    );
  };

  // tagList
  renderOutcomeList = ({ item }) => {
    if (this.state.tagSearch === item.tag) {
      return (
        <ListItem
          title={item.name}
          leftAvatar={{
            source: { uri: item.image }
          }}
          bottomDivider
          onPress={() => {
            this.setAddVisible();
            this.setState({
              image: item.image,
              name: item.name,
              itemId: item.id
            });
          }}
        />
      );
    } else {
      return null;
    }
  };

  renderMusicList = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        leftAvatar={{
          source: { uri: item.album.images[0].url }
        }}
        bottomDivider
      />
    );
  };

  // setVisible
  setVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  setSearchVisible = () => {
    this.setState({ modalSearchVisible: !this.state.modalSearchVisible });
  };

  setOutcomeVisible = () => {
    this.setState({ modalOutcomeVisible: !this.state.modalOutcomeVisible });
  };

  setAddVisible = () => {
    this.setState({ modalAddVisible: !this.state.modalAddVisible });
  };

  setListVisible = () => {
    this.setState({ modalListVisible: !this.state.modalListVisible });
  };

  setAddListVisible = () => {
    this.setState({ modalAddListVisible: !this.state.modalAddListVisible });
  };
  // setVisible

  keyExtractor = (item, index) => index.toString();
  tagKeyExtractor = (item, index) => (1 / index).toString();
  listKeyExtractor = (item, index) => (33 / index).toString();

  handleAccept = () => {
    this.setVisible();
    const tag = this.state.tag.concat({
      id: this.state.itemId,
      tag: this.state.tagText,
      image: this.state.image,
      name: this.state.name
    });
    this.setState({
      tag: tag
    });
  };

  handleSearch = () => {
    this.setSearchVisible();
    this.setOutcomeVisible();
  };

  render() {
    // getEvent 只會 log 出得到的 data, 不會有任何 render
    this.getEvent();

    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalAddListVisible}
          onRequestClose={this.setAddListVisible}
          transparent={true}
        >
          <View style={styles.modalInfoContainer}>
            <View style={styles.modalInfoContainerInner}>
              <Input
                placeholder="輸入音樂清單名稱"
                onChangeText={text => this.setState({ listName: text })}
              />
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={styles.buttonItem}
                  title="建立"
                  outline
                  onPress={() => {
                    this.createMusicList();
                    this.setAddListVisible();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={this.setVisible}
          transparent={true}
        >
          <View style={styles.modalInfoContainer}>
            <View style={styles.modalInfoContainerInner}>
              <Input
                placeholder="輸入標籤"
                onChangeText={text => this.setState({ tagText: text })}
              />
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={styles.buttonItem}
                  title="確認"
                  outline
                  onPress={() => this.handleAccept()}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalSearchVisible}
          onRequestClose={this.setSearchVisible}
          transparent={true}
        >
          <View style={styles.modalInfoContainer}>
            <View style={styles.modalInfoContainerInner}>
              <Input
                placeholder="搜尋標籤"
                onChangeText={text => this.setState({ tagSearch: text })}
              />
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={styles.buttonItem}
                  title="尋找"
                  outline
                  onPress={() => this.handleSearch()}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalOutcomeVisible}
          onRequestClose={this.setOutcomeVisible}
          transparent={false}
        >
          <View style={styles.modalInfoContainer}>
            <ListItem
              bottomDivider
              onPress={this.handleAddList}
              rightIcon={{
                name: "add",
                onPress: this.setAddListVisible
              }}
            />
            <FlatList
              keyExtractor={this.tagKeyExtractor}
              data={this.state.tag}
              renderItem={this.renderOutcomeList}
            />
          </View>
        </Modal>
        <Modal
          visible={this.state.modalListVisible}
          onRequestClose={this.setListVisible}
          transparent={false}
        >
          <View style={styles.modalInfoContainer}>
            <ListItem title={this.state.listName} bottomDivider />
            <FlatList
              keyExtractor={this.listKeyExtractor}
              data={this.state.musicListItems}
              renderItem={this.renderMusicList}
            />
          </View>
        </Modal>
        <Modal
          visible={this.state.modalAddVisible}
          onRequestClose={this.setAddVisible}
          transparent={true}
        >
          <View style={styles.modalInfoContainer}>
            <View style={styles.modalInfoContainerInner}>
              <Avatar
                rounded
                size="xlarge"
                containerStyle={styles.avatarContainer}
                source={{ uri: this.state.image }}
              />
              <Text style={styles.nameText}>{this.state.name}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={styles.buttonItem}
                  title="刪除標籤"
                  outline
                />
                <Button
                  buttonStyle={styles.buttonItem}
                  title="加入清單"
                  outline
                  onPress={() => {
                    this.putMusicToList();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.listData}
          renderItem={this.renderList}
        />
      </View>
    );
  }
}

export default HomeScreen;
