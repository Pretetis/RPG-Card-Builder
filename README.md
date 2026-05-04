# RPG Cards Creator

Gerador de cartas para RPG de mesa feito em React. Suporta dois sistemas: **D&D 5e** e **Ordem Paranormal RPG**.

Crie, edite e imprima cartas personalizadas com temas visuais, controle de fonte, imagens e sistema de saves — tudo no navegador, sem servidor.

---

## Funcionalidades

### Geral
- Alternância rápida entre os dois apps (D&D e O.P.P.) direto na sidebar
- Totalmente responsivo para mobile com navegação por abas
- Sistema de saves: cache local (localStorage), exportar e importar JSON

### D&D Cards
- Formatos de carta: **Poker** (63×88mm) e **Tarot** (70×120mm)
- 7 temas visuais: Pergaminho, Livro Oficial (5e), Grimório Sombrio, Clean/Moderno, Druídico, Cyberpunk, Old School P&B
- Campos: nome, tipo, raridade, sintonia, imagem, flavor text, estatísticas rápidas, regras completas
- Ajuste de posição da imagem (X/Y)
- Tamanho de fonte separado para o **flavor text** (frente) e para as **regras** (verso)
- Cor da fonte customizável por carta
- Formatação em negrito via `**texto**`
- Preview em tempo real (frente + verso)
- Modo de impressão A4 com layout dobra ao meio

### O.P.P. Cards (Ordem Paranormal)
- Mesmos formatos e sistema de saves que o D&D
- 6 temas: Dossiê da Ordem, Sangue, Morte, Energia, Conhecimento, Medo
- Campos temáticos: categoria (0 a IV), flag paranormal/ritual, dados técnicos
- Ajuste de posição, rotação e zoom da imagem
- Estilo visual inspirado no universo da Ordem Paranormal

---

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (ícones)

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Build para produção

```bash
npm run build
```


---

## Impressão

Use o botão **Preparar Impressão / Exportar Dossiê** para abrir o modo de impressão.  
O layout é otimizado para **A4** com as cartas organizadas para dobra ao meio (frente e verso juntos).  
Recomenda-se usar `Ctrl+P` ou o botão na própria página, com a opção "imprimir fundos e cores" ativada no navegador.
