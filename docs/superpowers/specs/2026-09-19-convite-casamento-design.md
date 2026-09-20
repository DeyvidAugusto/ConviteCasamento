# Convite de Casamento — Design (Front-end)

Data: 2026-09-19

## Visão geral

Site single-page de convite de casamento em estilo **dourado clássico**, com animação de envelope abrindo na entrada. Build com **Vite + React + Tailwind CSS v4 + Framer Motion**. Front-end apenas: o RSVP tem confirmação simulada, sem backend.

## Stack

- Vite + React 18
- Tailwind CSS v4 via plugin `@tailwindcss/vite`
- `motion` (Framer Motion) para animações
- Google Fonts: Cormorant Garamond (títulos) + Montserrat (corpo)
- Testes: Vitest + React Testing Library

## Paleta & estilo

- Fundo: marfim/creme (`#FDF9F0` e variações)
- Dourado: `#C9A227` (acentos, divisórias, selo)
- Texto: grafite (`#2F2A26`), neutros para hierarquia
- Detalhes ornamentais: divisórias, cantos dourados, letter-spacing generoso em versais

## Config central

`src/config/wedding.config.js` contém todos os dados editáveis:
- nomes do casal, data do casamento (target do countdown), horários de cerimônia e recepção, locais, endereço, URL do Google Maps, mensagens (verso do convite, agradecimento RSVP, footer).

## Componentes

1. **EnvelopeOpening** — overlay full-screen. Envelope 3D com selo (iniciais "A & J"). Ao clicar "Abrir convite", a aba abre e o overlay revela o Hero. Botão "Pular introdução".
2. **Hero** — nomes grandes em serifada, divisória ornamental, verso de boas-vindas, indicador de scroll animado.
3. **Countdown** — dias/horas/min/s com alvo do config; função de cálculo pura e testável.
4. **Details** — cards de Cerimônia e Recepção (data, horário, local, ícones).
5. **MapSection** — endereço + botão "Ver no Google Maps" (`target="_blank"`).
6. **RsvpSection** — nome, presença (sim/não), nº de acompanhantes, mensagem. Validação inline; ao enviar: estado de sucesso. Estado local apenas.
7. **RevealOnScroll** — wrapper `whileInView` reutilizável.
8. **Footer** — nomes, iniciais, agradecimento.

## Fluxo de dados & erros

- Todo texto vem do config central; componentes sem conteúdo hardcoded.
- RSVP: estado local, validação com mensagens inline, reset após sucesso.
- Mapa: link externo em nova aba.

## Testes

- Countdown: cálculo de tempo restante.
- RSVP: validação (nome obrigatório, presença obrigatória, acompanhantes ≥ 0) e estado de confirmação.