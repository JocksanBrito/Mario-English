var engine = {
	cores: [
		'green',
		'purple',
		'pink',
		'red',
		'yellow',
		'orange',
		'grey',
		'black',
	],
	hexadecimais: {
		green: '#02EF00',
		purple: '#770993',
		pink: '#FFCBDB',
		red: '#E90808',
		yellow: '#E7D703',
		orange: '#F16529',
		grey: '#EBEBEB',
		black: '#141414',
	},
	moedas: 0,
};

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearCor() {
	var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
	var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
	var nomeCorSorteada = engine.cores[indexCorSorteada];

	legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

	return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor) {
	var caixaDasCores = document.getElementById('cor-atual');

	caixaDasCores.style.backgroundColor = nomeDaCor;
	caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
	caixaDasCores.style.backgroundSize = '100%';
}

function atualizaPontuacao(valor) {
	var pontuacao = document.getElementById('pontuacao-atual');

	engine.moedas += valor;

	if (valor < 0) {
		audioErrou.play();
	} else {
		audioMoeda.play();
	}

	pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor());

var btnGravador = document.getElementById('btn-responder');
var transcricaoAudio = '';
var respostaCorreta = '';

if (window.webkitSpeechRecognition || window.SpeechRecognition) {
	var SpeechAPI = window.webkitSpeechRecognition || window.SpeechRecognition;

	var gravador = new SpeechAPI();

	gravador.continuos = false;
	gravador.lang = 'en-US';

	gravador.onstart = function () {
		btnGravador.innerText = 'Estou Ouvindo';
		btnGravador.style.backgroundColor = 'white';
		btnGravador.style.color = 'black';
	};

	gravador.onend = function () {
		btnGravador.innerText = 'Responder';
		btnGravador.style.backgroundColor = 'transparent';
		btnGravador.style.color = 'white';
	};

	gravador.onresult = function (event) {
		transcricaoAudio = event.results[0][0].transcript.toUpperCase();

		respostaCorreta = document
			.getElementById('cor-na-caixa')
			.innerText.toUpperCase();

		// console.log(transcricaoAudio);

		if (transcricaoAudio === respostaCorreta) {
			atualizaPontuacao(1);
		} else {
			atualizaPontuacao(-1);
		}
		aplicarCorNaCaixa(sortearCor());
	};
} else {
	alert('Seu navegador não tem suporte!');
}

btnGravador.addEventListener('click', function (e) {
	gravador.start();
});
