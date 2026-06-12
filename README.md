# Agrafagem — Production Tracking App

> **EN** | A real-time production tracking web app built for a manufacturing company.  
> **PT** | Aplicação web de rastreamento de produção em tempo real, desenvolvida para uma empresa de manufatura.

---

##  Screenshots
<img width="2505" height="1267" alt="image" src="https://github.com/user-attachments/assets/5974e45e-f627-45f2-8f82-8b014d3f826e" />
<img width="2504" height="1288" alt="image" src="https://github.com/user-attachments/assets/677437ce-2092-4495-b4c3-9ad75d3f2c7b" />



---

## 🇬🇧 English

### About
Agrafagem is a full-stack web application deployed on a local network to track employee entries and exits per workstation in real time. Built and deployed for a real manufacturing company.

### Features
- Real-time employee check-in and check-out per workstation
- Label scanning support
- Employee management panel (add / remove)
- Records table with date, time, workstation and type
- Local network access from any device on the same network

### Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Process Manager:** PM2

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Run the server: `pm2 start backend/server.js --name agrafagem`

---

## 🇵🇹 Português

### Sobre
O Agrafagem é uma aplicação web full-stack implantada numa rede local para registar entradas e saídas de colaboradores por mesa de trabalho em tempo real. Desenvolvida e implantada para uma empresa de manufatura real.

### Funcionalidades
- Registo de entrada e saída de colaboradores por mesa em tempo real
- Suporte a leitura de etiquetas
- Painel de gestão de colaboradores (adicionar / remover)
- Tabela de registos com data, hora, mesa e tipo
- Acesso pela rede local a partir de qualquer dispositivo

### Tecnologias
- **Backend:** Node.js, Express.js
- **Base de dados:** PostgreSQL
- **Frontend:** JavaScript, HTML, CSS
- **Gestor de processos:** PM2

### Instalação
1. Clonar o repositório
2. Instalar dependências: `npm install`
3. Criar ficheiro `.env` baseado no `.env.example`
4. Iniciar o servidor: `pm2 start backend/server.js --name agrafagem`
