# 👩‍⚕️ SaúdeOn - Seu portal de saúde completo 👨‍⚕️

[![Status: Em Desenvolvimento](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue.svg)](https://github.com/seu-usuario/saudeon-repo/commits/main) 

## 🌟 Visão geral do projeto

Bem-vindo(a) ao **SaúdeOn**, um portal de saúde intuitivo e responsivo desenvolvido com **HTML, CSS e JavaScript puro**. Este projeto simula um sistema de gerenciamento de saúde que oferece diferentes interfaces e funcionalidades para **pacientes**, **médicos** e **administradores**, tudo em uma única página (Single Page Application - SPA) para uma experiência fluida.

O objetivo do SaúdeOn é demonstrar a capacidade de criar interfaces de usuário dinâmicas e interativas com tecnologias front-end básicas, simulando fluxos de autenticação e navegação complexos sem a necessidade de um backend real.

O projeto foi criado para ser um protótipo do sistema proposto por mim e minha equipe para a matéria de Engenharia de Software.

## ✨ Funcionalidades principais

O SaúdeOn oferece uma gama de funcionalidades simuladas, adaptando a interface de acordo com o perfil do usuário logado:

### 👤 Acesso ao sistema
* **Formulário de login:** Autenticação simulada com campos para usuário, senha e tipo de perfil (Paciente, Médico, Administrador).
* **Validação de inputs:** Feedback visual em tempo real para o formato de email (Paciente), CRM (Médico) e usuário 'admin' (Administrador).
* **Mensagens de feedback:** Notificações de sucesso ou erro animadas para a experiência de login.

### 🏠 Dashboard dinâmica (após login)
A dashboard se adapta para exibir as opções relevantes para cada tipo de usuário:

#### Para 'Pacientes':
* **Agendar nova consulta:** Formulário completo para agendamento, com seleção de especialidade e preenchimento dinâmico de médicos disponíveis.
* **Minhas consultas:** Visualização das consultas agendadas (dados simulados).
* **Meus exames e guias:** Acesso a exames e guias de encaminhamento (dados simulados).
* **Solicitar suporte:** Formulário para enviar mensagens de suporte, com canais de atendimento exibidos.

#### Para 'Médicos':
* **Gerenciar pacientes:** (Seção simulada) Interface para visualizar e gerenciar informações de pacientes.
* **Gerenciar consultas:** (Seção simulada) Ferramentas para visualizar e administrar as consultas.
* **Gerenciar exames/guias:** (Seção simulada) Acesso e gerenciamento de exames e guias.
* **Solicitar suporte:** Opção para solicitar ajuda ao administrador.

#### Para 'Administradore's:
* **Gerenciar pacientes:** (Seção simulada) Controle total sobre os registros de pacientes.
* **Gerenciar consultas:** (Seção simulada) Gerenciamento abrangente de todas as consultas.
* **Gerenciar exames/guias:** (Seção simulada) Administração de exames e guias.
* **Relatórios:** (seção simulada) Visualização de relatórios e estatísticas do sistema.
* **Cadastrar médico:** Formulário para inclusão de novos médicos no sistema, com validação de dados.
* **Solicitar suporte:** Acesso aos canais de suporte.

## 🛠️ Tecnologias e ferramentas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)

## 🗺️ Estrutura do projeto

Abaixo está a estrutura de diretórios do repositório, que organiza os arquivos e recursos do projeto:  
saudeOn-repo/  
├── img/                       # Pasta para recursos de imagem  
│   ├── icon-site.jpg          # Favicon ou ícone do site (usado na aba do navegador)  
│   ├── logotipoV1.jpg         # Versão 1 do logotipo  
│   └── logotipoV2.jpg         # Versão 2 do logotipo  
├── script.js                  # Lógica de interatividade e simulação de dados  
├── style.css                  # Estilos e design da interface  
└── index.html                 # Estrutura principal da página  

## ⚙️ Como rodar o projeto

Este projeto é totalmente front-end, o que significa que você não precisa de um servidor complexo para executá-lo.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/i-malur/fatec-engenharia-de-software.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd saudeOn-repo
    ```

3.  **Abra o arquivo `index.html`:**
    Simplesmente clique duas vezes no arquivo `index.html` em seu explorador de arquivos ou arraste-o para o seu navegador de preferência.

    **Opcional (para desenvolvedores):** Para uma melhor experiência de desenvolvimento, você pode usar uma extensão como "Live Server" no VS Code, que atualiza a página automaticamente ao salvar as alterações.

## 🔑 Credenciais de acesso (simulação)

Utilize as seguintes credenciais para testar as diferentes personas:

| Perfil        | Usuário (Username)    | Senha   |
| :------------ | :-------------------- | :------ |
| **Paciente** | `paciente@email.com`  | `123`   |
| **Médico** | `medico@email.com`    | `456`   |
| **Admin** | `admin`               | `789`   |

## 🎨 Cores e tipografia

O projeto utiliza um conjunto de cores e fontes estrategicamente selecionadas para uma interface agradável e profissional:

### Cores (Variáveis CSS em `style.css`)
As cores são definidas no `:root` do `style.css` para fácil manutenção:
* `--primary-color`: `#28a745` (Verde Vibrante)
* `--secondary-color`: `#007bff` (Azul)
* `--accent-color`: `#ffc107` (Amarelo de Destaque)
* `--text-color`: `#333` (Cinza Escuro para Texto)
* `--background-color`: `#e9ecef` (Cinza Claro para Fundo)
* `--card-background`: `#ffffff` (Branco para Cards/Seções)

### Tipografia
* **Corpo do Texto e Elementos Gerais:** `'Open Sans'`, sans-serif
* **Títulos e Logo (`SaúdeOn`):** `'Montserrat'`, sans-serif


## ⚠️ Observações importantes

* Este projeto é uma **simulação front-end**. Ele não possui um backend real, banco de dados ou persistência de dados. Todas as informações e interações são gerenciadas no JavaScript do navegador e serão perdidas ao recarregar a página.
* O arquivo `icon.jpg` é usado como favicon neste exemplo. Para melhor compatibilidade e qualidade em diferentes navegadores, **é altamente recomendado converter seu logo para o formato `.ico`** (por exemplo, `favicon.ico`) e referenciá-lo adequadamente no `index.html`.

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar bugs, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.


## 👨🏻‍💻👩🏻‍💻👩🏻‍💻👩🏻‍💻👩🏾‍💻 Equipe
* Jackeline Schilink 
* Maria Luiza Fernandes
* Melanie Joyce
* Rafael Cardoso
* Victória Mendonça

Made with ❤️ by @i-malur

