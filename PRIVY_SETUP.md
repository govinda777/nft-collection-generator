# Configuração do Privy - Área de Membros

Este documento explica como configurar a autenticação Privy para a área de membros do projeto Amazonia Crypto Animals.

## 🎯 O que foi implementado

- **Página de membros** (`members.html`): Área VIP com autenticação
- **Sistema de autenticação** (`privy-auth.js`): Login com carteira Web3
- **Benefícios exclusivos**: Acesso a conteúdo VIP, votação, airdrops
- **Galeria de NFTs**: Visualização dos NFTs do usuário conectado

## 🚀 Como usar (Modo Demo)

### 1. Abrir a área de membros

Abra o arquivo `members.html` no navegador ou clique no botão "Access Members Area" na página principal.

### 2. Conectar carteira

Clique em "Connect Wallet" - o sistema está em modo demo e criará uma carteira simulada automaticamente.

### 3. Visualizar NFTs

Após login, você verá:
- Endereço da carteira conectada
- Estatísticas (quantidade de NFTs)
- Benefícios exclusivos
- Galeria com seus NFTs

## 🔧 Configuração para Produção

### ✅ Privy já configurado!

O App ID do Privy já está configurado no projeto:
- **App ID**: `cmgk12sx5004zl30c1xva0n6t`
- **Arquivo**: `privy-auth.js`
- **SDK**: Carregado via CDN em `members.html`

### Como funciona agora:

1. **Autenticação real**: O sistema tenta usar o SDK do Privy primeiro
2. **Fallback automático**: Se o SDK não carregar, usa autenticação mock
3. **Suporte a múltiplas carteiras**: MetaMask, WalletConnect, Coinbase Wallet, etc.

### Passo 3: Instalar SDK do Privy (Opcional)

Para usar a versão completa do SDK:

```bash
npm install @privy-io/react-auth
```

### Passo 4: Integrar com Blockchain

Para carregar NFTs reais da blockchain:

1. **Opção A - Usar API do Privy**:
   ```javascript
   const nfts = await privy.user.wallet.getNFTs();
   ```

2. **Opção B - Usar Alchemy/Moralis**:
   ```javascript
   const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY/getNFTs/?owner=${walletAddress}`);
   const nfts = await response.json();
   ```

3. **Opção C - Usar The Graph**:
   Criar query GraphQL para buscar NFTs do contrato específico.

## 📁 Estrutura de arquivos

```
nft-collection-generator/
├── index.html          # Página principal (galeria pública)
├── members.html        # Área de membros (requer login)
├── privy-auth.js       # Sistema de autenticação
├── app.js              # Script da galeria pública
└── PRIVY_SETUP.md      # Este arquivo
```

## 🎨 Personalização

### Modificar NFTs exibidos

Edite o array `mockNFTData` em `privy-auth.js`:

```javascript
const mockNFTData = [
    {
        id: 0,
        name: 'Seu NFT #0',
        image: './images/0.png',
        traits: [
            { type: 'Tipo', value: 'Valor' }
        ]
    }
];
```

### Modificar benefícios

Edite a seção `.benefits-section` em `members.html`.

### Alterar estilo

Modifique o CSS dentro da tag `<style>` em `members.html`.

## 🔐 Segurança

### Modo Demo (Atual)
- Usa localStorage para simular autenticação
- Gera endereços de carteira aleatórios
- NFTs são mockados (não vêm da blockchain)

### Modo Produção (Recomendado)
- Autenticação real via Privy
- Conexão com carteiras reais (MetaMask, WalletConnect, etc.)
- NFTs carregados da blockchain
- Verificação de propriedade on-chain

## 🌐 Recursos adicionais

- **Documentação Privy**: https://docs.privy.io
- **Dashboard Privy**: https://dashboard.privy.io
- **Exemplos**: https://github.com/privy-io/privy-examples

## 🐛 Troubleshooting

### "Connect Wallet" não funciona
- Verifique o console do navegador (F12)
- Confirme que `privy-auth.js` está carregando corretamente

### NFTs não aparecem
- Verifique se as imagens existem em `./images/`
- Execute `npm run build` para gerar as imagens
- Confira o array `mockNFTData` em `privy-auth.js`

### Erro de CORS
- Use um servidor local (ex: `python -m http.server` ou Live Server do VS Code)
- Não abra os arquivos diretamente (file://)

## 📝 Próximos passos

1. ✅ Configurar App ID do Privy
2. ✅ Integrar com API de blockchain
3. ✅ Adicionar verificação de propriedade de NFT
4. ✅ Implementar funcionalidades de votação
5. ✅ Criar sistema de airdrops
6. ✅ Adicionar Discord/YouTube integration

---

**Desenvolvido para Amazonia Crypto Animals** 🌿
