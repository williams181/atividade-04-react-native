import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Profile from '../../aseets/Profile/avatar.png';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles';
import api from '../../services/api';

function Contact({ navigation }) {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const cadastro = async () => {
    await api.post("http://professornilson.com/testeservico/clientes", {
      nome: nome,
      email: email,
      telefone: telefone,
    }).then(async response => {
      try {
        navigation.navigate("List")
      } catch (e) {
        console.log("error: ", e)
        setTimeout(() => {
        }, 500)
      }
    }).catch(e => {
      setTimeout(() => {
      }, 500)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <View>
          <Text style={styles.texto}>Nome</Text>
          <Input style={styles.inputStyle}
            value={nome}
            onChangeText={value => setNome(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Email</Text>
          <Input style={styles.inputStyle}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Telefone</Text>
          <Input style={styles.inputStyle}
            value={telefone}
            onChangeText={value => setTelefone(value)}
          />
        </View>

        <View>
          <TouchableOpacity onPress={cadastro}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor1}
              />
              <Text style={styles.textoButton1}>Salvar</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default Contact;