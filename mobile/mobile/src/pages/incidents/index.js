import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import Logo from '../../assets/logo.png';
import styles from './styles'
import api from '../../services/api';


export default function Incidents(){
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  function navigateDetail(incident){
    navigation.navigate('Details',{incident});
  }

  async function loadIncidents(){

    if(loading){return;}
    if(total > 0 && incidents.length === total){return;}

    setloading (true);
    const response = await api.get('incidents', {
      params: {page}
    });
    setIncidents([...incidents,...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page+1);
    setloading(false);
    
  }

  useEffect(()=>{
    loadIncidents();
  },[]);

    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source ={Logo}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>     
     </View>
     <Text style={styles.title}>Bem-vindo!</Text>
     <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

     <FlatList 
      data={incidents}
      style={styles.incidentList}
      keyExtractor={incident => String(incident.id) }
      showsVerticalScrollIndicator={false}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      renderItem={({item:incident})=>(
        <View style={styles.incident}>
       <Text style={styles.incidentProperty}>ONG:</Text>
       <Text style={styles.incidentValue}>{incident.name}</Text>

       <Text style={styles.incidentProperty}>CASO:</Text>
       <Text style={styles.incidentValue}>{incident.description}</Text>

       <Text style={styles.incidentProperty}>VALOR:</Text>
       <Text style={styles.incidentValue}>
         {Intl.NumberFormat('pt-BR', { style:'currency',currency:'BRL'}).format(incident.value)}
         </Text>
       <TouchableOpacity style={styles.detailButton} onPress={()=>navigateDetail(incident)}>
      <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
      <Feather name='arrow-right' size={16} color='#e02041'/>
      </TouchableOpacity>
       </View>
     )}      
      />

    </View>
      );
};