# Dance Fusion — Academia de Dança

Landing page moderna e responsiva para a **Dance Fusion**, academia de dança no Montijo.

Site oficial de referência: [dancefusion.pt](https://dancefusion.pt/)

## Ver localmente

```bash
cd DanceFusion
npm start
# ou: python3 -m http.server 8000
```

Abre no navegador: **http://localhost:8000**

## Conteúdo incluído

- Logo, favicon e fotografia real dos alunos (origem: dancefusion.pt)
- Contactos: morada, telefone **934 309 236**, WhatsApp e Google Maps
- Redes sociais: [Facebook](https://www.facebook.com/academiadancefusion/) e [Instagram](https://www.instagram.com/academiadancefusion/)
- SEO: meta tags, Open Graph, Twitter Cards, JSON-LD (`DanceSchool`)
- `robots.txt` e `sitemap.xml`

## Estrutura

```
├── index.html
├── styles.css
├── script.js
├── images/          # logo, hero (webp/jpg), favicons
├── robots.txt
├── sitemap.xml
├── netlify.toml
└── package.json
```

## Deploy (Netlify / Vercel / GitHub Pages)

1. Liga o repositório à plataforma escolhida
2. **Publish directory:** raiz do projeto (`.`)
3. **Domínio:** aponta `dancefusion.pt` para o novo deploy (substitui o WordPress antigo quando estiveres pronto)

### Netlify

Arrasta a pasta do projeto para [app.netlify.com/drop](https://app.netlify.com/drop) ou liga o Git — o ficheiro `netlify.toml` já está configurado.

## Personalizar

- **Imagens:** substitui ficheiros em `images/`
- **Cores:** variáveis em `styles.css` (`:root`)
- **Domínio nas meta tags:** atualiza URLs em `index.html`, `sitemap.xml` e `robots.txt` se usares outro domínio

## Contacto

- **Morada:** Alameda Pocinho das Nascentes, 2870-453 Montijo
- **Telefone:** 934 309 236

---

**A partir dos 3 anos, DANÇAR É AQUI.**
