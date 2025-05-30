# 👩‍⚕️ SaúdeOn - Seu Portal de Saúde Completo 👨‍⚕️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Em Desenvolvimento](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue.svg)](https://github.com/seu-usuario/saudeon-repo/commits/main) 

## 🌟 Visão Geral do Projeto

Bem-vindo(a) ao **SaúdeOn**, um portal de saúde intuitivo e responsivo desenvolvido com **HTML, CSS e JavaScript puro**. Este projeto simula um sistema de gerenciamento de saúde que oferece diferentes interfaces e funcionalidades para **pacientes**, **médicos** e **administradores**, tudo em uma única página (Single Page Application - SPA) para uma experiência fluida.

O objetivo do SaúdeOn é demonstrar a capacidade de criar interfaces de usuário dinâmicas e interativas com tecnologias front-end básicas, simulando fluxos de autenticação e navegação complexos sem a necessidade de um backend real.

O projeto foi criado para ser um protótipo do sistema proposto por mim e minha equipe para a matéria de Engenharia de Software.

## ✨ Funcionalidades Principais

O SaúdeOn oferece uma gama de funcionalidades simuladas, adaptando a interface de acordo com o perfil do usuário logado:

### 👤 Acesso ao Sistema
* **Formulário de Login:** Autenticação simulada com campos para usuário, senha e tipo de perfil (Paciente, Médico, Administrador).
* **Validação de Inputs:** Feedback visual em tempo real para o formato de email (Paciente), CRM (Médico) e usuário 'admin' (Administrador).
* **Mensagens de Feedback:** Notificações de sucesso ou erro animadas para a experiência de login.

### 🏠 Dashboard Dinâmica (após login)
A dashboard se adapta para exibir as opções relevantes para cada tipo de usuário:

#### Para Pacientes:
* **Agendar Nova Consulta:** Formulário completo para agendamento, com seleção de especialidade e preenchimento dinâmico de médicos disponíveis.
* **Minhas Consultas:** Visualização das consultas agendadas (dados simulados).
* **Meus Exames e Guias:** Acesso a exames e guias de encaminhamento (dados simulados).
* **Solicitar Suporte:** Formulário para enviar mensagens de suporte, com canais de atendimento exibidos.

#### Para Médicos:
* **Gerenciar Pacientes:** (Seção simulada) Interface para visualizar e gerenciar informações de pacientes.
* **Gerenciar Consultas:** (Seção simulada) Ferramentas para visualizar e administrar as consultas.
* **Gerenciar Exames/Guias:** (Seção simulada) Acesso e gerenciamento de exames e guias.
* **Solicitar Suporte:** Opção para solicitar ajuda ao administrador.

#### Para Administradores:
* **Gerenciar Pacientes:** (Seção simulada) Controle total sobre os registros de pacientes.
* **Gerenciar Consultas:** (Seção simulada) Gerenciamento abrangente de todas as consultas.
* **Gerenciar Exames/Guias:** (Seção simulada) Administração de exames e guias.
* **Relatórios:** (Seção simulada) Visualização de relatórios e estatísticas do sistema.
* **Cadastrar Médico:** Formulário para inclusão de novos médicos no sistema, com validação de dados.
* **Solicitar Suporte:** Acesso aos canais de suporte.

## 🚀 Tecnologias Utilizadas

* **HTML5:** Estrutura semântica da aplicação.
* **CSS3:** Estilização responsiva e moderna, utilizando **Variáveis CSS** para fácil customização de cores e temas.
    * **Google Fonts:** Para uma tipografia profissional (`Montserrat` para títulos/logo, `Open Sans` para o corpo do texto).
* **JavaScript (ES6+):** Lógica interativa, manipulação do DOM, simulação de dados, validação de formulários e controle da interface.
    * **Font Awesome:** Para ícones vetorizados em toda a aplicação.

## ⚙️ Como Rodar o Projeto

Este projeto é totalmente front-end, o que significa que você não precisa de um servidor complexo para executá-lo.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/i-malur/fatec-engenharia-de-software.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd saudeon-repo
    ```

3.  **Abra o arquivo `index.html`:**
    Simplesmente clique duas vezes no arquivo `index.html` em seu explorador de arquivos ou arraste-o para o seu navegador de preferência.

    **Opcional (para desenvolvedores):** Para uma melhor experiência de desenvolvimento, você pode usar uma extensão como "Live Server" no VS Code, que atualiza a página automaticamente ao salvar as alterações.

## 🔑 Credenciais de Acesso (Simulação)

Utilize as seguintes credenciais para testar as diferentes personas:

| Perfil        | Usuário (Username)    | Senha   |
| :------------ | :-------------------- | :------ |
| **Paciente** | `paciente@email.com`  | `123`   |
| **Médico** | `medico@email.com`    | `456`   |
| **Admin** | `admin`               | `789`   |

## 🎨 Cores e Tipografia

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


## ⚠️ Observações Importantes

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

