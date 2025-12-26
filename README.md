# InstaSolutions Site

Site institucional da InstaSolutions - Plataforma corporativa para gestão de frotas.

## 🚀 Deploy na Vercel

Este projeto está pronto para deploy na Vercel. Siga os passos:

### Opção 1: Deploy via Dashboard Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta
3. Clique em "Add New Project"
4. Selecione o repositório: `comercial-rgb/instasolutions-site`
5. Configure o domínio customizado: `instasolutions.com.br`
6. Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Fazer deploy
vercel --prod
```

### Configuração de Domínio

O domínio `instasolutions.com.br` deve ser configurado na Vercel:

1. Vá em **Settings** > **Domains**
2. Adicione o domínio: `instasolutions.com.br`
3. Configure os registros DNS conforme instruções da Vercel

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **Framer Motion** - Animações
- **React Router v6** - Roteamento
- **React Helmet** - SEO

## 📦 Scripts

```bash
npm run dev      # Servidor de desenvolvimento (http://localhost:5173)
npm run build    # Build de produção
npm run preview  # Preview do build
```

## 🌐 Funcionalidades

- ✅ Sistema de gestão de frotas
- ✅ Formulários de contato e credenciamento
- ✅ Integração com FormSubmit.co
- ✅ SEO otimizado com Schema.org
- ✅ Carrosséis de imagens com autoplay
- ✅ Design responsivo
- ✅ Navegação com dropdowns
- ✅ 27 estados brasileiros

## 📄 Estrutura

```
instasolutions-site/
├── src/
│   ├── App.tsx          # Componente principal (SPA)
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
├── imagens/             # Todas as imagens do site
├── index.html           # HTML base
├── vercel.json          # Configuração Vercel (rewrites para SPA)
└── package.json         # Dependências
```

## 🔧 Configuração Vercel

O arquivo `vercel.json` já está configurado para suportar React Router:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📧 Contato

- Email: comercial@instasolutions.com.br
- WhatsApp: (11) 3336-6941

---

© 2025 InstaSolutions Produtos e Gestão Empresarial. Todos os direitos reservados.
