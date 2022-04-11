import React, {useState, useRef} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../theme/appTheme';
import {BotonCalc} from '../components/BotonCalc';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const CalculadoraScreen = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    // Ya existe punto decimal
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
        //Evaluar si es otro cero
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const borrarUltimo = () => {
    let negativo = '';
    let numeroTemp = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.substring(1);
    }

    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const cambiarNumeroPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }

    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };

  const btnMultiplicar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };

  const btnRestar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
      case Operadores.dividir:
        setNumero(`${num2 / num1}`);
        break;
    }

    setNumeroAnterior('0');
  };

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={{...styles.resultadoPequeno, marginBottom: 100}}>
        {'Calculadora Juan Lara '}
      </Text>

      {numeroAnterior !== '0' && (
        <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      )}

      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar}></BotonCalc>
        <BotonCalc
          texto="+/-"
          color="#9B9B9B"
          accion={positivoNegativo}></BotonCalc>
        <BotonCalc
          texto="del"
          color="#9B9B9B"
          accion={borrarUltimo}></BotonCalc>
        <BotonCalc texto="/" color="#FF9427" accion={btnDividir}></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="8" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="9" accion={armarNumero}></BotonCalc>
        <BotonCalc
          texto="x"
          color="#FF9427"
          accion={btnMultiplicar}></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="5" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="6" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="-" color="#FF9427" accion={btnRestar}></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="2" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="3" accion={armarNumero}></BotonCalc>
        <BotonCalc texto="+" color="#FF9427" accion={btnSumar}></BotonCalc>
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armarNumero}></BotonCalc>
        <BotonCalc texto="." accion={armarNumero}></BotonCalc>
        <BotonCalc texto="=" color="#FF9427" accion={calcular}></BotonCalc>
      </View>
    </View>
  );
};
