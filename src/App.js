import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const likedRepository = response.data;

    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id) {
        return likedRepository;
      } else {
        return repository;
      }
    })

    setRepositories(repositoriesUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtida{repository.likes > 1 ? 's': ''}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: "#000",
    padding: 5,
    paddingTop: 30
  },
  repositoryContainer: {
    marginBottom: 20,
    marginHorizontal: 15,    
    backgroundColor: "rgb(32, 32, 36) none repeat scroll 0% 0%",
    borderStyle: 'solid',
    borderStartWidth: 1,
    borderColor: 'rgb(4, 211, 97)',
    padding: 20
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-between',
    alignSelf:'center'    
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 15
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'center'
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: '#fff'
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    textAlign: 'center'
  },
});
