import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import Profile from '../../aseets/Profile/avatar.png';
import styles from './styles';
import api from '../../services/api';

function Register({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastro = async () => {
    await api.post("usuario/Cadastro", {
      email: email,
      senha: senha,
    }).then(async response => {
      try {
        navigation.navigate("Login")
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
          <Text style={styles.texto}>Email</Text>
          <Input style={styles.inputStyle}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View>
          <Text style={styles.texto}>Senha</Text>
          <Input style={styles.inputStyle}
            value={senha}
            onChangeText={value => setSenha(value)}
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

export default Register;