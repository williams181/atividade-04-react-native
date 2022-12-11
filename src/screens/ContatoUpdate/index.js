import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Profile from '../../aseets/Profile/avatar.png';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles';
import api from '../../services/api';

function ContactUpdate({ navigation, route }) {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  let usuarioId = route.params.usuarioId

  const updateContact = async (usuarioId, nome, email, telefone) => {
    await api.put(`http://professornilson.com/testeservico/clientes/${usuarioId}`, {
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

  const deleteContact = async (usuarioId) => {
    await api.delete(`http://professornilson.com/testeservico/clientes/${usuarioId}`, {
    }).then(() => {
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

  const usuarioInfo = async (usuarioId) => {
    await api.get(`http://professornilson.com/testeservico/clientes/${usuarioId}`)
      .then(({ data }) => {
        setNome(data.nome)
        setEmail(data.email)
        setTelefone(data.telefone)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const getUsuarioInfoCallback = useCallback(async (usuarioId) => {
    await usuarioInfo(usuarioId)
  })

  useEffect(() => {
    getUsuarioInfoCallback(usuarioId)
  }, [])

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
          <TouchableOpacity onPress={() => updateContact(
            usuarioId, nome, email, telefone
          )}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor1}
              />
              <Text style={styles.textoButton1}>Alterar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteContact(usuarioId)}>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={styles.buttonColor2}
              />
              <Text style={styles.textoButton2}>Excluir</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default ContactUpdate;