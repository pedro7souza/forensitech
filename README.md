# ForensicTech — Perícia 4.0

Projeto escolar fictício de investigação forense para feira de ciências.

## Como abrir
1. Extraia o arquivo ZIP.
2. Abra o VS Code.
3. Vá em **File → Open Folder** e escolha a pasta `ForensicTech`.
4. Abra `index.html` no navegador. Opcionalmente, instale a extensão **Live Server** e clique com o botão direito no `index.html` → **Open with Live Server**.

## Publicar para os celulares
Você pode publicar estes arquivos em um serviço de hospedagem estática, como GitHub Pages. O arquivo `index.html` precisa ficar na raiz do repositório.

## Importante sobre a votação
O protótipo salva respostas, veredito e nome da equipe em `localStorage`, apenas no navegador em que foram registrados. Os votos não são compartilhados entre os celulares. Para somar votos de todos os visitantes, será necessário conectar o projeto a um backend/banco de dados e validar os votos no servidor. Nunca coloque chaves administrativas secretas no JavaScript do navegador.

## Nota de segurança
Toda a investigação é fictícia e educativa. As pistas foram criadas para demonstrar raciocínio investigativo; nenhuma delas deve ser usada para acusar pessoas reais.

## Receber os votos numa planilha do Google
1. Crie uma planilha em sheets.new.
2. Menu **Extensões → Apps Script**. Apague o código e cole o conteúdo de `planilha/Code.gs`. Salve.
3. Escolha a função `configurar` e clique em **Executar** (autorize quando pedir). Isso cria as abas Votos e Placar.
4. **Implantar → Nova implantação → Tipo: App da Web**. Executar como: **Eu**. Quem tem acesso: **Qualquer pessoa**. Copie o link que termina em `/exec`.
5. Em `script.js`, cole o link em `const SHEET_URL='...'` (primeira linha) e publique os arquivos de novo.
Cada aparelho tem um voto: se a pessoa votar outra vez, a linha dela é atualizada.
