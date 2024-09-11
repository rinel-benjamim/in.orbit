**Fundamentos**
- console é um objeto com várias funções
- as chavetas são usadas para determinar um escopo local {}
- as concatenações são feitas com o sinal +

- ao colocar chavetas após a atribuição de valores em uma variável, a variável é tida como um objeto.
- pode ser 0sada a propriedade value para definir o valor do objeto

**Variáveis**
- let representa que a variável pode mudar de tipo de dado a qualquer momento
- const atribui uma constante. Após a primeira atribuição o valor da variável não pode ser alterado
- arrays 
let array = ["Rinel", "Benjamim"]

- arrow functions são funções declaradas em uma linha

ex.: const criarMeta = () =>{}

- tradicionalmente esta é a sintaxe de uma função em javascript (named function)
ex.: function nome(){}

**Módulos em JS**
- Para instalar um módulo é necessário usar o comando:
npm install nome_do_pacote

- Para fazer uso de um módulo é necessário usar o comando require("caminho_do/pacote")

**Programação assíncrona/promises**
- Se em alguma linha for necessário esperar por algum retorno de alguma execução, é usada a palavra chave await antes da atribuição. Caso o await esteja em uma function é necessário usar a palavra async na declaração no formato de uma arrow function