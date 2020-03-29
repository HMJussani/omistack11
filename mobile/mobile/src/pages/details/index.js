import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native'
import {View, Text, Image, TouchableOpacity,Linking} from 'react-native';
import Logo from '../../assets/logo.png';
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';



export default function Details(){
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou retornando seu contato sobre ${incident.title}`;

  function navigateBack(){
    navigation.goBack();
  }

  function sendMail(){
      MailComposer.composeAsync({
        subject:`Be the Hero: ${incident.name}`,
        recipients:[incident.email],
        body: message
      });
  }

  function sendWhatssap(){
    Linking.openURL(`whatsapp://send?phone=${incident.watsapp}&text=${message}`);
  }


    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source ={Logo}/>
        <TouchableOpacity>
          <Feather name ={'arrow-left'} size={28} color={'#e02041'} onPress={navigateBack}/>
        </TouchableOpacity>       
     </View>    
     
        <View style={styles.incident}>
       <Text style={[styles.incidentProperty],{marginTop:0}}>ONG:</Text>
       <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
       <Text style={styles.incidentProperty}>CASO:</Text>
       <Text style={styles.incidentValue}>{incident.title}</Text>
       <Text style={styles.incidentProperty}>VALOR:</Text>
       <Text style={styles.incidentValue}>{
       Intl.NumberFormat('pt-BR', { style:'currency',currency:'BRL'}).format(incident.value)}</Text>      
       </View>
    
      <View style={styles.contactBox}>
      <Text style={styles.heroTitle}>Salve o dia!</Text>
       <Text style={styles.heroTitle}>Sendo o herói deste caso.</Text>
       <Text style={styles.heroDescription}>Entre em contato:</Text>

       <View style={styles.actions}>
       <TouchableOpacity style={styles.action} onPress={sendWhatssap}>
      <Text style={styles.actionText}>Whatsapp</Text>     
      </TouchableOpacity>

      <TouchableOpacity style={styles.action} onPress={sendMail}>
      <Text style={styles.actionText}>E-mail</Text>      
      </TouchableOpacity>
      </View>

      </View>

    </View>
      );
};