document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos HTML ---
    const loginForm = document.getElementById('login-form');
    const usernameInputLogin = document.getElementById('username');
    const passwordInputLogin = document.getElementById('password');
    // const usernameHint = document.getElementById('username-hint'); // Esta linha pode ser removida ou comentada
    const usernameLabel = document.getElementById('username-label'); // Novo elemento para o label do usuário
    const loginMessage = document.getElementById('login-message');
    const roleSelect = document.getElementById('role-select');
    const mainNav = document.getElementById('main-nav');
    const mainElement = document.querySelector('main');
    const showRegisterFormBtn = document.getElementById('show-register-form-btn');

    // Elementos do Formulário de Cadastro Unificado
    const registerSection = document.getElementById('register-section');
    const registerForm = document.getElementById('register-form');
    const registerRoleSelect = document.getElementById('register-role-select');
    const registerNameInput = document.getElementById('register-name');
    const registerCpfInput = document.getElementById('register-cpf');
    const registerCrmInput = document.getElementById('register-crm');
    const registerSpecialtySelect = document.getElementById('register-specialty');
    const registerEmailInput = document.getElementById('register-email');
    const registerPasswordInput = document.getElementById('register-password');
    const registerMessage = document.getElementById('register-message');

    // Grupos de Campos Condicionais (para médico/paciente)
    const registerCpfGroup = document.getElementById('register-cpf-group');
    const registerCrmGroup = document.getElementById('register-crm-group');
    const registerSpecialtyGroup = document.getElementById('register-specialty-group');

    // Elementos de Erro de Validação
    const cpfError = document.getElementById('cpf-error');
    const crmError = document.getElementById('crm-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const cepError = document.getElementById('cep-error');

    // Elementos do Bloco de Endereço
    const registerCepInput = document.getElementById('register-cep');
    const registerRuaInput = document.getElementById('register-rua');
    const registerNumeroInput = document.getElementById('register-numero');
    const registerBairroInput = document.getElementById('register-bairro');
    const registerCidadeInput = document.getElementById('register-cidade');
    const registerEstadoInput = document.getElementById('register-estado');


    // --- Funções Auxiliares de UI ---
    const showSection = (id) => {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        document.getElementById(id).classList.remove('hidden-section');
        document.getElementById(id).classList.add('active-section');
        // Oculta todas as mensagens ao mudar de tela
        document.querySelectorAll('.message').forEach(hideMessage);
        // Limpa erros de validação
        document.querySelectorAll('.input-validation-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.input-style.error').forEach(el => el.classList.remove('error'));
    };

    const showMessage = (element, msg, type = 'error') => {
        element.textContent = msg;
        element.className = `message ${type}-message`;
        element.style.display = 'block';
        setTimeout(() => {
            hideMessage(element);
        }, 5000); // Exibe por 5 segundos
    };

    const hideMessage = (element) => {
        element.style.display = 'none';
        element.textContent = '';
    };

    const setInputError = (inputElement, errorElement, message) => {
        inputElement.classList.add('error');
        errorElement.textContent = message;
    };

    const clearInputError = (inputElement, errorElement) => {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    };

    // --- Funções de Persistência (localStorage como BD simples) ---
    const saveData = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const loadData = (key, defaultValue) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    };

    // --- Estrutura de Dados do "Banco de Dados" (localStorage) ---
    // Estrutura unificada para todos os usuários
    let users = loadData('users', [
        // Usuário Administrador padrão
        { id: 'admin1', role: 'administrador', username: 'admin', password: 'Senha123!', name: 'Admin VitaLink' },
        // Paciente padrão para testes
        { id: 'paciente1', role: 'paciente', username: 'paciente@email.com', password: 'Senha123!', name: 'Paciente Teste', cpf: '123.456.789-00', email: 'paciente@email.com', address: { cep: '01001-000', rua: 'Rua da Amostra', numero: '100', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP' } },
        // Médico padrão para testes
        { id: 'medico1', role: 'medico', username: '123456SP', password: 'Senha123!', name: 'Dr. João Silva', crm: '123456/SP', especialidade: 'clinica', email: 'joao.silva@vitamed.com', address: { cep: '02002-000', rua: 'Av. dos Médicos', numero: '500', bairro: 'Jardins', cidade: 'São Paulo', estado: 'SP' } }
    ]);

    // Arrays para dados específicos de cada tipo de usuário (para simulação de listagens)
    let patients = users.filter(u => u.role === 'paciente');
    let doctors = users.filter(u => u.role === 'medico');

    // Outros dados simulados (consultas, exames, etc.)
    let currentUserRole = null;
    let patientConsultations = loadData('patientConsultations', []);
    let patientExamsAndGuides = loadData('patientExamsAndGuides', []);
    let pendingSupportRequests = loadData('pendingSupportRequests', []);
    let registeredVaccines = loadData('registeredVaccines', []);

    // --- Funções de Validação de Dados ---

    // Validação de Senha: 8 caracteres, maiúscula, minúscula, número, símbolo
    const isValidPassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password); // Regex para símbolos

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSymbol
        );
    };

    // Validação de CPF: Formato XXX.XXX.XXX-XX e dígitos não repetidos
    const isValidCPF = (cpf) => {
        if (!cpf) return false;
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não são todos iguais

        // Validação dos dígitos verificadores (apenas estrutura, não o cálculo completo para simplicidade)
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    // Validação de Email
    const isValidEmail = (email) => {
        if (!email) return false;
        // Regex básica para email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Verificação de Unicidade de CPF, Email ou CRM
    const isUnique = (field, value, usersArray) => {
        return !usersArray.some(user => user[field] === value);
    };

    // --- Máscaras de Input ---

    // Máscara para CPF
    const formatCPF = (input) => {
        let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
        } else if (value.length > 0) {
            value = value.replace(/(\d{3})/, '$1');
        }
        input.value = value;
    };

    // Máscara para CEP
    const formatCEP = (input) => {
        let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        input.value = value;
    };

    // Adiciona event listeners para máscaras
    registerCpfInput.addEventListener('input', () => formatCPF(registerCpfInput));
    registerCepInput.addEventListener('input', () => formatCEP(registerCepInput));


    // --- LÓGICA DE LOGIN ---
    const updateLoginUsernameHint = () => {
        const selectedRole = roleSelect.value;
        if (selectedRole === 'paciente') {
            usernameLabel.textContent = 'Usuário (Email):'; // Atualiza o label
            usernameInputLogin.placeholder = 'email@exemplo.com';
            // Se você manteve a small tag, pode limpar o conteúdo dela:
            const usernameHint = document.getElementById('username-hint');
            if (usernameHint) usernameHint.textContent = '';
        } else if (selectedRole === 'medico') {
            usernameLabel.textContent = 'Usuário (CRM):'; // Atualiza o label
            usernameInputLogin.placeholder = '123456/SP';
            // Se você manteve a small tag, pode limpar o conteúdo dela:
            const usernameHint = document.getElementById('username-hint');
            if (usernameHint) usernameHint.textContent = '';
        } else if (selectedRole === 'administrador') {
            usernameLabel.textContent = 'Usuário (admin):'; // Atualiza o label
            usernameInputLogin.placeholder = 'admin';
            // Se você manteve a small tag, pode limpar o conteúdo dela:
            const usernameHint = document.getElementById('username-hint');
            if (usernameHint) usernameHint.textContent = '';
        }
        usernameInputLogin.value = ''; // Limpa o campo ao mudar a função
        passwordInputLogin.value = ''; // Limpa a senha também
    };

    roleSelect.addEventListener('change', updateLoginUsernameHint);
    // Chama a função ao carregar a página para definir o hint inicial
    updateLoginUsernameHint();

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInputLogin.value.trim();
        const password = passwordInputLogin.value;
        const selectedRole = roleSelect.value;

        // Tenta encontrar o usuário na base de dados unificada
        const foundUser = users.find(user => {
            if (user.role === 'paciente' && user.email === username && selectedRole === 'paciente') {
                return true;
            }
            if (user.role === 'medico' && user.crm === username && selectedRole === 'medico') {
                return true;
            }
            if (user.role === 'administrador' && user.username === username && selectedRole === 'administrador') {
                return true;
            }
            return false;
        });

        if (foundUser && password === foundUser.password) {
            currentUserRole = foundUser.role; // Usa o papel real do usuário encontrado
            showMessage(loginMessage, `Bem-vindo(a), ${foundUser.name || foundUser.username}!`, 'success');
            setTimeout(() => {
                showDashboard(currentUserRole);
                updateMainNav(currentUserRole);
            }, 1000);
        } else {
            showMessage(loginMessage, 'Usuário, senha ou papel selecionado incorretos.', 'error');
        }
    });

    const showDashboard = (role) => {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        const targetSection = document.getElementById(`${role}-dashboard`);
        if (targetSection) {
            targetSection.classList.remove('hidden-section');
            targetSection.classList.add('active-section');
        } else {
            showSection('login-section'); // Volta para o login se o dashboard não for encontrado
        }
    };


    const updateMainNav = (role) => {
        mainNav.innerHTML = `
            <ul>
                <li><a href="#" id="home-link">Home</a></li>
                <li><a href="#" id="logout-link">Sair</a></li>
            </ul>
        `;
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            showDashboard(role);
        });
        document.getElementById('logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            currentUserRole = null;
            mainNav.innerHTML = '';
            showSection('login-section');
            loginForm.reset();
            usernameInputLogin.value = ''; // Limpa o campo de usuário
            passwordInputLogin.value = ''; // Limpa o campo de senha
            updateLoginUsernameHint(); // Reseta a dica
            hideMessage(loginMessage);
            // Ao sair, mantemos os usuários cadastrados, mas limpamos os outros dados simulados para um "fresh start"
            // Se quiser limpar tudo no logout: localStorage.clear();
            patientConsultations = []; saveData('patientConsultations', []);
            patientExamsAndGuides = []; saveData('patientExamsAndGuides', []);
            pendingSupportRequests = []; saveData('pendingSupportRequests', []);
            registeredVaccines = []; saveData('registeredVaccines', []);
        });
    };

    // --- NAVEGAÇÃO ENTRE TELAS (Botões de Opção e Voltar) ---
    mainElement.addEventListener('click', (e) => {
        if (e.target.closest('.btn-option')) {
            const targetId = e.target.closest('.btn-option').dataset.target;
            const registerRole = e.target.closest('.btn-option').dataset.registerRole; // Para cadastro de médico via admin

            if (targetId) {
                showSection(targetId);
                // Funções específicas para renderizar ao entrar na seção
                if (targetId === 'minhas-consultas-section') renderPatientConsultations();
                if (targetId === 'meus-exames-guias-section') renderPatientExamsAndGuides();
                if (targetId === 'gerenciar-suporte-section') renderSupportRequests();
                if (targetId === 'minha-agenda-section') renderDoctorAgenda();
                if (targetId === 'liberar-guias-section') populatePatientSelectForGuia(); // Preenche pacientes para guias
                if (targetId === 'register-section') {
                    // Pre-seleciona o tipo de usuário no formulário de cadastro
                    registerRoleSelect.value = registerRole || 'paciente';
                    toggleRegisterFields(); // Ajusta os campos visíveis
                    registerForm.reset(); // Limpa o formulário
                }
            }
        }
        if (e.target.classList.contains('back-btn') || e.target.id === 'show-register-form-btn') {
            const targetId = e.target.dataset.target || (e.target.id === 'show-register-form-btn' ? 'register-section' : null);
            if (targetId) {
                showSection(targetId);
                // Limpa formulário de cadastro ao voltar para ele ou ir para ele
                if (targetId === 'register-section') {
                    registerForm.reset();
                    // Garante que o tipo de usuário seja 'paciente' por padrão ao vir da tela de login
                    if (e.target.id === 'show-register-form-btn') {
                        registerRoleSelect.value = 'paciente';
                        toggleRegisterFields(); // Ajusta os campos visíveis
                    }
                    // Limpa erros de validação ao ir para o formulário de cadastro
                    clearInputError(registerCpfInput, cpfError);
                    clearInputError(registerCrmInput, crmError);
                    clearInputError(registerEmailInput, emailError);
                    clearInputError(registerPasswordInput, passwordError);
                    clearInputError(registerCepInput, cepError);
                }
            }
        }
    });

    // --- CADASTRO UNIFICADO (PACIENTE E MÉDICO) ---
    const toggleRegisterFields = () => {
        const selectedRole = registerRoleSelect.value;
        if (selectedRole === 'paciente') {
            registerCpfGroup.style.display = 'block';
            registerCrmGroup.style.display = 'none';
            registerSpecialtyGroup.style.display = 'none';
            // Campos de CRM e Especialidade não são obrigatórios para paciente
            registerCrmInput.removeAttribute('required');
            registerSpecialtySelect.removeAttribute('required');
            registerCpfInput.setAttribute('required', 'true');
        } else if (selectedRole === 'medico') {
            registerCpfGroup.style.display = 'none';
            registerCrmGroup.style.display = 'block';
            registerSpecialtyGroup.style.display = 'block';
            // Campos de CPF não é obrigatório para médico
            registerCpfInput.removeAttribute('required');
            registerCrmInput.setAttribute('required', 'true');
            registerSpecialtySelect.setAttribute('required', 'true');
        }
        // Limpa mensagens de erro ao alternar
        clearInputError(registerCpfInput, cpfError);
        clearInputError(registerCrmInput, crmError);
        registerCrmInput.value = ''; // Limpa o CRM ao esconder
        registerSpecialtySelect.value = ''; // Limpa a especialidade ao esconder
    };

    registerRoleSelect.addEventListener('change', toggleRegisterFields);
    toggleRegisterFields(); // Chama na inicialização para ajustar os campos visíveis

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpa erros anteriores
        clearInputError(registerCpfInput, cpfError);
        clearInputError(registerCrmInput, crmError);
        clearInputError(registerEmailInput, emailError);
        clearInputError(registerPasswordInput, passwordError);
        clearInputError(registerCepInput, cepError);

        const role = registerRoleSelect.value;
        const name = registerNameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value;
        const cep = registerCepInput.value.trim();
        const rua = registerRuaInput.value.trim();
        const numero = registerNumeroInput.value.trim();
        const bairro = registerBairroInput.value.trim();
        const cidade = registerCidadeInput.value.trim();
        const estado = registerEstadoInput.value.trim();

        let hasError = false;

        // Validação de Email
        if (!isValidEmail(email)) {
            setInputError(registerEmailInput, emailError, 'Email inválido. Ex: seu.email@exemplo.com');
            hasError = true;
        } else if (!isUnique('email', email, users)) {
            setInputError(registerEmailInput, emailError, 'Este email já está cadastrado.');
            hasError = true;
        }

        // Validação de Senha
        if (!isValidPassword(password)) {
            setInputError(registerPasswordInput, passwordError, 'Senha fraca. Mínimo 8 caracteres, com letras maiúsculas, minúsculas, números e símbolos.');
            hasError = true;
        }

        // Validações específicas por tipo de usuário
        let userSpecificId = '';
        if (role === 'paciente') {
            const cpf = registerCpfInput.value.trim();
            if (!isValidCPF(cpf)) {
                setInputError(registerCpfInput, cpfError, 'CPF inválido. Use o formato XXX.XXX.XXX-XX e verifique os dígitos.');
                hasError = true;
            } else if (!isUnique('cpf', cpf, users)) {
                setInputError(registerCpfInput, cpfError, 'Este CPF já está cadastrado.');
                hasError = true;
            }
            userSpecificId = cpf; // Para paciente, CPF pode ser usado como id/username interno
        } else if (role === 'medico') {
            const crm = registerCrmInput.value.trim();
            const especialidade = registerSpecialtySelect.value;
            if (!crm || crm.length < 5 || !/^[A-Z0-9\/]+$/.test(crm)) {
                setInputError(registerCrmInput, crmError, 'CRM inválido. Ex: 123456/SP');
                hasError = true;
            } else if (!isUnique('crm', crm, users)) {
                setInputError(registerCrmInput, crmError, 'Este CRM já está cadastrado.');
                hasError = true;
            }
            if (!especialidade) {
                // Não há um elemento de erro dedicado para specialty, então vamos usar o do CRM ou email
                showMessage(registerMessage, 'Por favor, selecione a especialidade do médico.', 'error');
                hasError = true;
            }
            userSpecificId = crm; // Para médico, CRM será o username para login
        }

        // Validação de CEP (formato) - simples, apenas se o campo não estiver vazio
        if (cep && !/^\d{5}-\d{3}$/.test(cep)) {
            setInputError(registerCepInput, cepError, 'CEP inválido. Use o formato XXXXX-XXX.');
            hasError = true;
        }


        if (hasError) {
            showMessage(registerMessage, 'Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Se tudo validado, cadastra o usuário
        const newUser = {
            id: `${role}${Date.now()}`, // ID único
            role: role,
            username: role === 'paciente' ? email : userSpecificId, // Email para paciente, CRM para médico
            password: password,
            name: name,
            email: email,
            address: { cep, rua, numero, bairro, cidade, estado } // Endereço completo
        };

        if (role === 'paciente') {
            newUser.cpf = userSpecificId;
        } else if (role === 'medico') {
            newUser.crm = userSpecificId;
            newUser.especialidade = registerSpecialtySelect.value;
        }

        users.push(newUser); // Adiciona ao array unificado de usuários
        // Atualiza as listas de pacientes e médicos
        patients = users.filter(u => u.role === 'paciente');
        doctors = users.filter(u => u.role === 'medico');
        saveData('users', users); // Salva no localStorage

        showMessage(registerMessage, `Cadastro de ${role} realizado com sucesso!`, 'success');
        registerForm.reset();
        toggleRegisterFields(); // Reseta os campos para o padrão (paciente)
        // Opcional: Redirecionar para a tela de login após o cadastro
        setTimeout(() => showSection('login-section'), 2000);
    });

    // Event listeners para limpar erros ao digitar (Cadastro Unificado)
    registerCpfInput.addEventListener('input', () => clearInputError(registerCpfInput, cpfError));
    registerCrmInput.addEventListener('input', () => clearInputError(registerCrmInput, crmError));
    registerEmailInput.addEventListener('input', () => clearInputError(registerEmailInput, emailError));
    registerPasswordInput.addEventListener('input', () => clearInputError(registerPasswordInput, passwordError));
    registerCepInput.addEventListener('input', () => clearInputError(registerCepInput, cepError));


    // --- FUNCIONALIDADES DO PACIENTE ---

    // Agendamento de Consulta
    const agendamentoForm = document.getElementById('agendamento-form');
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const agendamentoMessage = document.getElementById('agendamento-message');

    // Popula especialidades e médicos com base nos médicos cadastrados
    const populateEspecialidadesAndMedicos = () => {
        const uniqueSpecialties = [...new Set(doctors.map(d => d.especialidade))];
        especialidadeSelect.innerHTML = '<option value="">Selecione</option>';
        uniqueSpecialties.forEach(specialty => {
            const option = document.createElement('option');
            option.value = specialty;
            option.textContent = specialty.charAt(0).toUpperCase() + specialty.slice(1);
            especialidadeSelect.appendChild(option);
        });
    };

    especialidadeSelect.addEventListener('change', () => {
        const selectedSpecialty = especialidadeSelect.value;
        medicoSelect.innerHTML = '<option value="">Selecione</option>';
        medicoSelect.disabled = true;

        const doctorsForSpecialty = doctors.filter(doc => doc.especialidade === selectedSpecialty);

        if (doctorsForSpecialty.length > 0) {
            doctorsForSpecialty.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id; // Usando o ID do médico
                option.textContent = doctor.name;
                medicoSelect.appendChild(option);
            });
            medicoSelect.disabled = false;
        } else {
            medicoSelect.innerHTML = '<option value="">Nenhum médico disponível para esta especialidade</option>';
        }
    });

    agendamentoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            id: Date.now(),
            pacienteId: users.find(u => u.role === 'paciente' && u.username === usernameInputLogin.value)?.id, // Pega o ID do paciente logado
            especialidade: especialidadeSelect.options[especialidadeSelect.selectedIndex].textContent,
            medicoId: medicoSelect.value,
            medicoNome: medicoSelect.options[medicoSelect.selectedIndex].textContent,
            data: document.getElementById('data-consulta').value,
            hora: document.getElementById('hora-consulta').value,
            motivo: document.getElementById('motivo-consulta').value || 'Não informado',
            status: 'Agendada'
        };

        patientConsultations.push(data);
        saveData('patientConsultations', patientConsultations);
        showMessage(agendamentoMessage, 'Consulta agendada com sucesso!', 'success');
        agendamentoForm.reset();
        medicoSelect.innerHTML = '<option value="">Selecione a especialidade primeiro</option>';
        medicoSelect.disabled = true;
    });

    // Minhas Consultas
    const renderPatientConsultations = () => {
        const listaConsultasDiv = document.getElementById('lista-consultas');
        listaConsultasDiv.innerHTML = '';

        const currentPatientId = users.find(u => u.role === 'paciente' && u.username === usernameInputLogin.value)?.id;
        const currentUserConsultations = patientConsultations.filter(c => c.pacienteId === currentPatientId);


        if (currentUserConsultations.length === 0) {
            listaConsultasDiv.innerHTML = '<p class="text-muted">Nenhuma consulta agendada ainda.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('simple-list');
        currentUserConsultations.forEach((consulta, index) => {
            const li = document.createElement('li');
            li.classList.add('list-item');
            li.innerHTML = `
                <div>
                    <strong>${consulta.especialidade}</strong> com <strong>${consulta.medicoNome}</strong><br>
                    Data: ${new Date(consulta.data + 'T' + consulta.hora).toLocaleDateString('pt-BR')} às ${consulta.hora}<br>
                    Motivo: ${consulta.motivo}<br>
                    Status: <span class="status ${consulta.status.toLowerCase()}">${consulta.status}</span>
                </div>
                ${consulta.status === 'Agendada' ? `<button class="btn btn-secondary btn-small cancel-consulta-btn" data-id="${consulta.id}">Cancelar</button>` : ''}
            `;
            ul.appendChild(li);
        });
        listaConsultasDiv.appendChild(ul);

        ul.querySelectorAll('.cancel-consulta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const consultaId = parseInt(e.target.dataset.id);
                if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
                    patientConsultations = patientConsultations.map(c => c.id === consultaId ? {...c, status: 'Cancelada'} : c);
                    saveData('patientConsultations', patientConsultations);
                    renderPatientConsultations();
                    showMessage(document.getElementById('minhas-consultas-section').querySelector('.message') || listaConsultasDiv, 'Consulta cancelada com sucesso!', 'success');
                }
            });
        });
    };

    // Meus Exames e Guias
    const renderPatientExamsAndGuides = () => {
        const listaExamesGuiasDiv = document.getElementById('lista-exames-guias');
        listaExamesGuiasDiv.innerHTML = '';

        const currentPatientId = users.find(u => u.role === 'paciente' && u.username === usernameInputLogin.value)?.id;
        const currentUserExamsAndGuides = patientExamsAndGuides.filter(item => item.pacienteId === currentPatientId);

        if (currentUserExamsAndGuides.length === 0) {
            listaExamesGuiasDiv.innerHTML = '<p class="text-muted">Nenhum exame ou guia disponível.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('simple-list');
        currentUserExamsAndGuides.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-item');
            li.innerHTML = `
                <div>
                    <strong>${item.tipo}:</strong> ${item.descricao}<br>
                    Data de Emissão: ${new Date(item.dataEmissao).toLocaleDateString('pt-BR')}
                </div>
                <button class="btn btn-info btn-small view-btn">Ver Detalhes</button>
            `;
            ul.appendChild(li);
        });
        listaExamesGuiasDiv.appendChild(ul);
    };

    // Suporte ao Paciente (Chatbot Simples)
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessagesDiv = document.getElementById('chat-messages');

    sendChatBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            appendMessage(message, 'user');
            chatInput.value = '';
            simulateBotResponse(message);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatBtn.click();
        }
    });

    const appendMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        chatMessagesDiv.appendChild(msgDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    };

    const simulateBotResponse = (userMessage) => {
        let botResponse = 'Desculpe, não entendi. Você pode tentar reformular sua pergunta ou ligar para nosso suporte humano.';
        if (userMessage.toLowerCase().includes('agendar consulta')) {
            botResponse = 'Para agendar uma consulta, acesse a opção "Agendar Nova Consulta" na sua dashboard.';
        } else if (userMessage.toLowerCase().includes('resultado exame')) {
            botResponse = 'Os resultados de exames podem ser consultados na seção "Meus Exames e Guias".';
        } else if (userMessage.toLowerCase().includes('emergencia')) {
            botResponse = 'Em caso de emergência, procure o pronto-socorro mais próximo ou ligue para 192.';
        } else if (userMessage.toLowerCase().includes('falar com atendente') || userMessage.toLowerCase().includes('suporte humano')) {
            botResponse = 'Você pode ligar para nosso suporte humano no número (XX) XXXX-XXXX. Sua solicitação também foi registrada para acompanhamento.';
            pendingSupportRequests.push({
                id: Date.now(),
                paciente: users.find(u => u.role === 'paciente' && u.username === usernameInputLogin.value)?.name || 'Paciente Desconhecido',
                mensagem: userMessage,
                data: new Date().toLocaleString(),
                status: 'Pendente'
            });
            saveData('pendingSupportRequests', pendingSupportRequests);
        }
        setTimeout(() => appendMessage(botResponse, 'bot'), 1000);
    };

    // --- FUNCIONALIDADES DO MÉDICO ---

    // Consultar Pacientes (agora busca nos pacientes cadastrados)
    const searchPacienteBtn = document.getElementById('search-paciente-btn');
    searchPacienteBtn.addEventListener('click', () => {
        const searchTerm = document.getElementById('search-paciente-input').value.toLowerCase();
        const listaPacientesDiv = document.getElementById('lista-pacientes-medico');
        listaPacientesDiv.innerHTML = '';

        const filteredPatients = patients.filter(p =>
            p.name.toLowerCase().includes(searchTerm) || p.cpf.includes(searchTerm)
        );

        if (filteredPatients.length === 0) {
            listaPacientesDiv.innerHTML = '<p class="text-muted">Nenhum paciente encontrado com este termo.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('simple-list');
        filteredPatients.forEach(paciente => {
            const li = document.createElement('li');
            li.classList.add('list-item');
            li.innerHTML = `
                <div>
                    <strong>${paciente.name}</strong><br>
                    CPF: ${paciente.cpf}
                </div>
                <button class="btn btn-info btn-small view-btn">Ver Histórico</button>
            `;
            ul.appendChild(li);
        });
        listaPacientesDiv.appendChild(ul);
    });

    // Minha Agenda
    const renderDoctorAgenda = () => {
        const agendaMedicoDiv = document.getElementById('agenda-medico');
        agendaMedicoDiv.innerHTML = '';

        const today = new Date().toISOString().split('T')[0];
        const currentDoctor = users.find(u => u.role === 'medico' && u.username === usernameInputLogin.value);

        if (!currentDoctor) {
             agendaMedicoDiv.innerHTML = '<p class="text-muted">Erro: Médico logado não encontrado.</p>';
             return;
        }

        const doctorAgenda = patientConsultations.filter(c => c.medicoId === currentDoctor.id && c.data === today);

        if (doctorAgenda.length === 0) {
            agendaMedicoDiv.innerHTML = '<p class="text-muted">Nenhum compromisso para hoje.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('simple-list');
        doctorAgenda.forEach(consulta => {
            const patientForConsulta = patients.find(p => p.id === consulta.pacienteId);
            const patientName = patientForConsulta ? patientForConsulta.name : 'Paciente Desconhecido';

            const li = document.createElement('li');
            li.classList.add('list-item');
            li.innerHTML = `
                <div>
                    <strong>Paciente:</strong> ${patientName}<br>
                    Horário: ${consulta.hora}<br>
                    Especialidade: ${consulta.especialidade}
                </div>
                <button class="btn btn-primary btn-small">Abrir Prontuário</button>
            `;
            ul.appendChild(li);
        });
        agendaMedicoDiv.appendChild(ul);
    };

    // Liberar Guias (Preenche select com pacientes cadastrados)
    const liberarGuiaForm = document.getElementById('liberar-guia-form');
    const liberarGuiaMessage = document.getElementById('liberar-guia-message');
    const guiaPacienteSelect = document.getElementById('guia-paciente-select');

    const populatePatientSelectForGuia = () => {
        guiaPacienteSelect.innerHTML = '<option value="">Selecione o paciente</option>';
        if (patients.length > 0) {
            patients.forEach(patient => {
                const option = document.createElement('option');
                option.value = patient.id;
                option.textContent = patient.name;
                guiaPacienteSelect.appendChild(option);
            });
        } else {
            guiaPacienteSelect.innerHTML = '<option value="">Nenhum paciente cadastrado</option>';
        }
    };

    liberarGuiaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedPatient = patients.find(p => p.id === guiaPacienteSelect.value);
        if (!selectedPatient) {
            showMessage(liberarGuiaMessage, 'Por favor, selecione um paciente válido.', 'error');
            return;
        }

        const data = {
            id: Date.now(),
            pacienteId: selectedPatient.id,
            pacienteNome: selectedPatient.name,
            descricao: document.getElementById('guia-descricao').value,
            dataEmissao: document.getElementById('guia-data-emissao').value,
            tipo: 'Guia Médica'
        };

        patientExamsAndGuides.push(data);
        saveData('patientExamsAndGuides', patientExamsAndGuides);
        showMessage(liberarGuiaMessage, 'Guia emitida com sucesso!', 'success');
        liberarGuiaForm.reset();
    });

    // Acessar Prontuários (busca por CPF de pacientes cadastrados)
    const searchProntuarioBtn = document.getElementById('search-prontuario-btn');
    searchProntuarioBtn.addEventListener('click', () => {
        const cpf = document.getElementById('search-prontuario-input').value.trim();
        const prontuarioDetailsDiv = document.getElementById('prontuario-details');
        prontuarioDetailsDiv.innerHTML = '';

        if (!cpf) {
            prontuarioDetailsDiv.innerHTML = '<p class="text-muted">Por favor, insira um CPF para buscar o prontuário.</p>';
            return;
        }

        const foundPatient = patients.find(p => p.cpf === cpf);

        if (foundPatient) {
            const patientConsults = patientConsultations.filter(c => c.pacienteId === foundPatient.id);
            const patientExams = patientExamsAndGuides.filter(e => e.pacienteId === foundPatient.id);

            prontuarioDetailsDiv.innerHTML = `
                <h3>Prontuário de ${foundPatient.name}</h3>
                <p><strong>CPF:</strong> ${foundPatient.cpf}</p>
                <p><strong>Email:</strong> ${foundPatient.email}</p>
                ${foundPatient.address ? `
                    <h4>Endereço:</h4>
                    <p>
                        ${foundPatient.address.rua}, ${foundPatient.address.numero} - ${foundPatient.address.bairro}<br>
                        ${foundPatient.address.cidade} - ${foundPatient.address.estado}, ${foundPatient.address.cep}
                    </p>
                ` : '<p class="text-muted">Endereço não cadastrado.</p>'}

                <h4>Histórico de Consultas:</h4>
                <ul class="simple-list">
                    ${patientConsults.length > 0 ? patientConsults.map(c => `<li class="list-item-small">${new Date(c.data).toLocaleDateString('pt-BR')} - ${c.especialidade} (${c.medicoNome}) - ${c.motivo}.</li>`).join('') : '<li class="text-muted">Nenhuma consulta registrada.</li>'}
                </ul>
                <h4>Exames e Guias:</h4>
                <ul class="simple-list">
                    ${patientExams.length > 0 ? patientExams.map(e => `<li class="list-item-small">${e.descricao} (${new Date(e.dataEmissao).toLocaleDateString('pt-BR')})</li>`).join('') : '<li class="text-muted">Nenhum exame ou guia disponível.</li>'}
                </ul>
                <button class="btn btn-primary btn-small mt-2">Adicionar Anotação</button>
            `;
        } else {
            prontuarioDetailsDiv.innerHTML = '<p class="text-muted">Prontuário não encontrado para o CPF informado.</p>';
        }
    });

    // --- FUNCIONALIDADES DO ADMINISTRADOR ---

    // Cadastrar Vacina
    const cadastrarVacinaForm = document.getElementById('cadastrar-vacina-form');
    const cadastroVacinaMessage = document.getElementById('cadastro-vacina-message');

    cadastrarVacinaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            id: Date.now(),
            nome: document.getElementById('vacina-nome').value,
            descricao: document.getElementById('vacina-descricao').value,
            lote: document.getElementById('vacina-lote').value || 'N/A'
        };
        registeredVaccines.push(data);
        saveData('registeredVaccines', registeredVaccines);
        showMessage(cadastroVacinaMessage, `Vacina ${data.nome} cadastrada com sucesso!`, 'success');
        cadastrarVacinaForm.reset();
    });

    // Gerenciar Suporte Humano
    const renderSupportRequests = () => {
        const solicitacoesSuporteDiv = document.getElementById('solicitacoes-suporte');
        solicitacoesSuporteDiv.innerHTML = '';

        if (pendingSupportRequests.length === 0) {
            solicitacoesSuporteDiv.innerHTML = '<p class="text-muted">Nenhuma solicitação de suporte pendente.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('simple-list');
        pendingSupportRequests.forEach((request, index) => {
            const li = document.createElement('li');
            li.classList.add('list-item');
            li.innerHTML = `
                <div>
                    <strong>Solicitação de:</strong> ${request.paciente}<br>
                    <strong>Data:</strong> ${request.data}<br>
                    <strong>Mensagem:</strong> "${request.mensagem}"<br>
                    Status: <span class="status ${request.status.toLowerCase()}">${request.status}</span>
                </div>
                ${request.status === 'Pendente' ? `<button class="btn btn-success btn-small resolve-request-btn" data-id="${request.id}">Resolver</button>` : ''}
            `;
            ul.appendChild(li);
        });
        solicitacoesSuporteDiv.appendChild(ul);

        ul.querySelectorAll('.resolve-request-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const requestId = parseInt(e.target.dataset.id);
                if (confirm('Marcar esta solicitação como resolvida?')) {
                    pendingSupportRequests = pendingSupportRequests.map(req =>
                        req.id === requestId ? { ...req, status: 'Resolvida' } : req
                    );
                    saveData('pendingSupportRequests', pendingSupportRequests);
                    renderSupportRequests();
                    showMessage(solicitacoesSuporteDiv, 'Solicitação resolvida com sucesso!', 'success');
                }
            });
        });
    };

    // --- Inicialização ---
    showSection('login-section');
    populateEspecialidadesAndMedicos(); // Popula especialidades e médicos ao carregar a página
});