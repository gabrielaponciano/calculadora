import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // Variáveis globais
  public calculo = ''; // Variável que exibe o cálculo na tela (vazia)
  public resultado: string; // Variável que exibe o resultado na tela (null)

  private ponto = false;

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {}

  // Método para adicionar um número na tela
  adicionarNumero(valor: string){ // valor -> número que o usuário digita tranformado em texto

    if(this.resultado){
      this.apagarTudo(); // Limpa a calculadora antes de inserir o próximo valor
    }
    this.calculo = this.calculo + valor;
  }

  // Método que verifica se tem algum ponto na tela para que o usuário não consiga colocar dois pontos ou mais.
  adicionarPonto(){

    if(this.ponto){
      return; // return vazio -> executa um método parando a execução e retornando vazio
    }
  
    // O código abaixo só é executado quando não estiver nenhum ponto inserido pelo usuário
    this.calculo += "."; // Também pode ser escrita: this.calculo = this.calculo + valor;
    this.ponto = true;
  }

  // Método que adiciona os cálculos seguidos um do outro
  adicionarOperacao(operador: string){

    // Usa o resultado do cálculo como continuação para a próxima operação
    if(this.resultado){
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }

    const ultimo = this.calculo.slice(-1);
    if(this.operacoes.indexOf(ultimo) > -1){
      return;
    } 
    // indexOf -> procura dentro da variável "operações" o último caractere

    this.calculo += operador;
    this.ponto = false; // Deixa o último ponto inserido como falso para que possa ser inserido outros pontos na mesma operação
  }

  // Método que zera totalmente a calculadora
  public apagarTudo(){
    this.calculo = ''; // Variável vazia
    this.resultado = null; // Limpa tudo que está na variável resultado
    this.ponto = false; // Limpa a calculadora permitindo inserir um ponto
  }

  // Método que zera apenas a última variável inserida pelo usuário
  apagarUltimo(){
    // Verifica se a última variável inserida é um ponto
    const ultimo = this.calculo.slice(-1); // slice -> o método slice pega tudo que está dentro da variável calculo desde o início e desconsidera o último caractere
    if(ultimo == '.'){
      this.ponto = false;
    }
    this.calculo = this.calculo.slice(0, -1);
  }

  // Método que calcula o resultado das operações desejadas pelo usuário
  public calcularResultado(){
    // O "try" tenta executar o código para exibir o resultado e, caso de algum erro, o "catch" exibirá a mensagem de erro
    try{
      this.resultado = evaluate(this.calculo);
    }catch (e) {
      this.resultado = '';
      this.presentAlert('ERRO', 'Cálculo inválido, verifique!');
    }
    
  }
  
  // Método que exibe uma mensagem para o usuário
  async presentAlert(titulo:string, mensagem:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}

// COMENTÁRIOS ADICIONAIS
// this -> faz referência as varriáveis globais criadas
// Interpolação -> impressão de variáveis para colocar os textos na tela
// Event Binding -> declaração de método (click) em um button para executar um evento