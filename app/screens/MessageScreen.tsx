import React, { useState } from "react";
import { FlatList } from "react-native";

import PlayerDetails from "../components/player/PlayerDetails";
import Screen from "../components/Screen";
import ListitemSeperator from "../components/ListitemSeperator";
import PlayerDetailsDeleteActions from "../components/player/PlayerDetailsDeleteActions";
const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/bibsDonkey.webp"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/bibsDonkey.webp"),
  },
  {
    id: 3,
    title: "T3",
    description: "D3",
    image: require("../assets/bibsDonkey.webp"),
  },
];

const MessagesScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message: any) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
    //delete from server
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <PlayerDetails
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <PlayerDetailsDeleteActions onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListitemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          console.log("refreshing");
          setRefreshing(true);
          setMessages([
            {
              id: 3,
              title: "T3",
              description: "D3",
              image: require("../assets/bibsDonkey.webp"),
            },
          ]);
          setRefreshing(false);
        }}
      />
    </Screen>
  );
};

export default MessagesScreen;
