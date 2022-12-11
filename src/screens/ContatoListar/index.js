import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Input, Button, ListItem } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Profile from '../../aseets/Profile/avatar.png';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles';
import Plus from '../../aseets/Icon/plus.png';
import api from '../../services/api';

function List({ navigation }) {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contato, setContato] = useState([]);
  const [usuarioId, setUsuarioId] = useState();

  const lista = async () => {
    await api.get(`http://professornilson.com/testeservico/clientes`)
      .then(response => {
        setContato(response.data)
      })
      .catch(e => {
        console.error("erro: " + e);
      });
  }

  useEffect(() => {
    lista()
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.contactList}>
          <View style={styles.titleList}>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
              <Text style={styles.texto}>Lista de Contatos{'   '}</Text>
            </TouchableOpacity>
            <Avatar source={Plus} />
          </View>
          {
            contato.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <TouchableOpacity onPress={() => navigation.navigate('ContactUpdate', {
                  usuarioId: l.id
                })}>
                  <Avatar rounded size='large' source={Profile} />
                  <ListItem.Content style={styles.flex}>
                    <ListItem.Title style={styles.texto}>{l.nome}</ListItem.Title>
                    <ListItem.Subtitle style={styles.texto}>{l.telefone}</ListItem.Subtitle>
                  </ListItem.Content>
                </TouchableOpacity>
              </ListItem>
            ))
          }
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

export default List;