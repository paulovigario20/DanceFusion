# Como publicar o site (passo a passo)

**Não há deploy automático no Railway.** Tens de ligar o repositório à tua conta (GitHub Pages, Railway ou Netlify).

---

## Opção A — GitHub Pages (grátis, recomendado)

1. Abre: https://github.com/paulovigario20/DanceFusion/settings/pages  
2. Em **Source**, escolhe **GitHub Actions** (não “Deploy from branch” se o workflow já existir).  
3. Vai a **Actions** → workflow **Deploy GitHub Pages** → **Run workflow** (se não tiver corrido sozinho).  
4. Em ~1–2 minutos o site fica em:  
   **https://paulovigario20.github.io/DanceFusion/**

---

## Opção B — Railway

1. Entra em https://railway.app e faz login com GitHub.  
2. **New Project** → **Deploy from GitHub repo** → escolhe `DanceFusion`.  
3. Railway deteta o `package.json` e usa `npm start` (servidor estático na porta `PORT`).  
4. Em **Settings** → **Networking** → **Generate Domain** para obteres um URL tipo `xxx.up.railway.app`.  
5. (Opcional) Em **Custom Domain**, aponta `dancefusion.pt`.

Ficheiros já incluídos para Railway: `package.json`, `railway.json`, `nixpacks.toml`.

---

## Opção C — Netlify (arrastar pasta)

1. https://app.netlify.com/drop  
2. Arrasta a pasta do projeto (com `index.html` na raiz).  
3. Recebes um URL imediato.

---

## Ver no computador (local)

```bash
git clone https://github.com/paulovigario20/DanceFusion.git
cd DanceFusion
npm install
npm run preview
```

Abre: **http://localhost:8000**

> **Importante:** Abre o ficheiro com um servidor (`npm run preview`), não com duplo clique no `index.html` — as imagens podem não carregar bem em `file://`.
