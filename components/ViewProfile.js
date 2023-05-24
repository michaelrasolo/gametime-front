import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Config from "../config";

const IPAdresse = Config.IPAdresse;

function ViewProfile({selectedUser}) {
  //   return (
  //     <View>
  //       <Text>Nom: {selectedUser?.nickname}</Text>
  //       <Text>Genre: {selectedUser?.genre}</Text>
  //       <Text>Niveau: {selectedUser?.level}</Text>
  //       <Text>Description: {selectedUser?.description}</Text>
  //       <Text>Equipe préférée: {selectedUser?.favoriteTeam}</Text>
  //       <Text>Joueur préféré: {selectedUser?.favoritePlayer}</Text>
  //       <Text>Paire de basket préférée: {selectedUser?.favoriteShoes}</Text>
  //     </View>
  //   );
  // }
  
  // export default ViewProfileScreen;

    return (
        <View>
            <Image style={styles.image} source={{ uri: selectedUser.picture }}/>

            {/* <View style={styles.birthdate}>
                <Text>Date de naissance</Text>
                <Text></Text>
            </View> */}

            <View style={styles.textContainer}>
                <Text>Ville :</Text>
                <Text>{selectedUser && selectedUser.city}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text>Genre :</Text>
                <Text>{selectedUser && selectedUser.gender}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text>Niveau :</Text>
                <Text>{selectedUser && selectedUser.level}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text>Moi en quelques phrases :</Text>
                <Text>{selectedUser && selectedUser.description}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text>Mon équipe de basket préférée :</Text>
                <Text>{selectedUser && selectedUser.favoriteTeam}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text>Mon joueur préféré :</Text>
                <Text>{selectedUser && selectedUser.favoritePlayer}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text>Ma paire de basket préférée :</Text>
                <Text>{selectedUser && selectedUser.favoriteShoes}</Text>
            </View>
        </View>
    )
}

export default ViewProfile

const styles = StyleSheet.create({
    textContainer: {
        justifyContent: "center",
        alignItems:"flex-start"
    },
    image: {
      width : "50%",
      height:"35%",
      borderRadius: 99,
    },
})