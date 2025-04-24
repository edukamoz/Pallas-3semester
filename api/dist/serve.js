"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({ origin: '*' })); // Permitir requisições do frontend
app.use(express_1.default.json());
app.use(express_1.default.static('.')); // Servir arquivos estáticos
const codeBlocks = [
    {
        correct: [
            "let x = 5;",
            "if (x > 3) {",
            "  console.log('x é maior que 3');",
            "}"
        ]
    },
    {
        correct: [
            "function soma(a: number, b: number) {",
            "  return a + b;",
            "}"
        ]
    },
    {
        correct: [
            "const numeros = [1, 2, 3];",
            "for (let i = 0; i < numeros.length; i++) {",
            "  console.log(numeros[i]);",
            "}"
        ]
    },
    {
        correct: [
            "let nome = 'João';",
            "console.log('Olá, ' + nome);"
        ]
    },
    {
        correct: [
            "const obj = { nome: 'Maria', idade: 30 };",
            "console.log(obj.nome);"
        ]
    },
];
// ✅ Tipagem explícita no parâmetro `linha`
function inserirErros(linhas) {
    return linhas.map((linha) => {
        if (Math.random() < 0.5) {
            return linha.replace(";", "") + " // erro";
        }
        if (linha.includes("function")) {
            return linha.replace("function", "fuction"); // erro proposital
        }
        return linha;
    });
}
app.get('/api/codes', (req, res) => {
    const shuffled = codeBlocks.sort(() => 0.5 - Math.random()).slice(0, 3);
    const withErrors = shuffled.map(block => ({
        original: inserirErros(block.correct),
        correct: block.correct
    }));
    app.locals.currentGame = withErrors;
    res.json(withErrors.map(b => b.original));
});
app.post('/api/correct', (req, res) => {
    const { userAnswers } = req.body;
    const correctBlocks = app.locals.currentGame || [];
    let score = 7;
    let feedback = [];
    if (!Array.isArray(userAnswers)) {
        res.status(400).json({ error: 'Formato inválido de respostas' });
    }
    else if (!correctBlocks.length) {
        res.status(400).json({ error: 'Jogo não iniciado. Acesse /api/codes primeiro.' });
    }
    else {
        userAnswers.forEach((userLines, index) => {
            if (!correctBlocks[index] || !Array.isArray(correctBlocks[index].correct)) {
                feedback.push({ error: 'Índice fora do limite ou dados incompletos', index });
            }
            else {
                const correctLines = correctBlocks[index].correct;
                const userCode = userLines.map(line => line.trim());
                const correctCode = correctLines.map((line) => line.trim());
                let blockFeedback = [];
                correctCode.forEach((line, i) => {
                    if (i >= userCode.length) {
                        blockFeedback.push({
                            line,
                            status: 'errou',
                            certo: line,
                            error: 'Resposta não fornecida'
                        });
                        score--;
                    }
                    else if (userCode[i] === line) {
                        blockFeedback.push({ line, status: 'acertou' });
                    }
                    else {
                        blockFeedback.push({
                            line: userCode[i] || "",
                            status: 'errou',
                            certo: line
                        });
                        score--;
                    }
                });
                feedback.push(blockFeedback);
            }
        });
        res.json({ score: Math.max(score, 0), feedback });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
