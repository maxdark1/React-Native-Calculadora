import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';

export const CalculadoraScreen = () => {

  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  }

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={styles.resultadoPequeno}>{ numeroAnterior }</Text>
      <Text style={styles.resultado}>{ numero }</Text>

      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion= { limpiar }></BotonCalc>
        <BotonCalc texto="+/-" color="#9B9B9B"></BotonCalc>
        <BotonCalc texto="del" color="#9B9B9B"></BotonCalc>
        <BotonCalc texto="/" color="#FF9427"></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="7" ></BotonCalc>
        <BotonCalc texto="8" ></BotonCalc>
        <BotonCalc texto="9" ></BotonCalc>
        <BotonCalc texto="x" color="#FF9427"></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="4" ></BotonCalc>
        <BotonCalc texto="5" ></BotonCalc>
        <BotonCalc texto="6" ></BotonCalc>
        <BotonCalc texto="-" color="#FF9427"></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="1" ></BotonCalc>
        <BotonCalc texto="2" ></BotonCalc>
        <BotonCalc texto="3" ></BotonCalc>
        <BotonCalc texto="+" color="#FF9427"></BotonCalc>
      </View>
    
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho></BotonCalc>
        <BotonCalc texto="." ></BotonCalc>
        <BotonCalc texto="=" color="#FF9427"></BotonCalc>
      </View>

    </View>
  );
};
