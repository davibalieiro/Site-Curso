document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const curso = urlParams.get('curso');

    const coursesData = {
        'Curso de HTML e CSS': {
            title: 'Curso de HTML e CSS',
            learnings: [
                'Fundamentos do HTML e CSS.',
                'Criação de páginas web responsivas.',
                'Stylização com CSS avançado.',
                'Introdução ao design responsivo.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 10 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 8 artigos',
                '<i class="fas fa-download"></i> 5 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 49,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/html_css.jpg'
        },
        'Curso de JavaScript': {
            title: 'Curso de JavaScript',
            learnings: [
                'Fundamentos do JavaScript.',
                'Manipulação do DOM.',
                'Programação assíncrona com Promises e Async/Await.',
                'Introdução a frameworks JavaScript.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 25 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 16 artigos',
                '<i class="fas fa-download"></i> 12 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 69,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/JavaScript.jpg'
        },
        'Curso de React': {
            title: 'Curso de React',
            learnings: [
                'Fundamentos do React.',
                'Criação de componentes reutilizáveis.',
                'Gerenciamento de estado com Redux.',
                'Criação de rotas com React Router.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 25 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 16 artigos',
                '<i class="fas fa-download"></i> 12 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 119,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/React.jpg'
        },
        'Curso de Segurança da Informação': {
            title: 'Curso de Segurança da Informação',
            learnings: [
                'Fundamentos de segurança da informação.',
                'Práticas de segurança de rede.',
                'Proteção de dados e privacidade.',
                'Gestão de risco e conformidade.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 18 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 12 artigos',
                '<i class="fas fa-download"></i> 10 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 89,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/IBSEC.jpg'
        },
        'Curso de Vue.js': {
            title: 'Curso de Vue.js',
            learnings: [
                'Fundamentos do Vue.js.',
                'Criação de componentes reutilizáveis.',
                'Gerenciamento de estado com Vuex.',
                'Criação de rotas com Vue Router.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 20 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 10 artigos',
                '<i class="fas fa-download"></i> 8 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 69,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/Vue.jpg'
        },
        'Curso de Administração de Banco de Dados': {
            title: 'Curso de Administração de Banco de Dados',
            learnings: [
                'Fundamentos da administração de bancos de dados.',
                'Criação e gerenciamento de bancos de dados.',
                'Backup e recuperação de dados.',
                'Implementação de políticas de segurança de dados.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 20 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 15 artigos',
                '<i class="fas fa-download"></i> 12 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 99,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/ADM Dados.jpg'
        },
        'Curso de Webpack': {
            title: 'Curso de Webpack',
            learnings: [
                'Configuração básica e avançada do Webpack.',
                'Criação de bundles otimizados.',
                'Uso de loaders e plugins.',
                'Integração com Babel e TypeScript.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 18 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 12 artigos',
                '<i class="fas fa-download"></i> 10 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 79,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/webpack.jpg'
        },
        'Curso de Angular': {
            title: 'Curso de Angular',
            learnings: [
                'Fundamentos do Angular.',
                'Criação de componentes reutilizáveis.',
                'Gerenciamento de estado com NgRx.',
                'Criação de rotas com Angular Router.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 20 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 10 artigos',
                '<i class="fas fa-download"></i> 8 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 69,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/angular.png'
        },
        'Curso de MySQL': {
            title: 'Curso de MySQL',
            learnings: [
                'Fundamentos do MySQL.',
                'Criação e gerenciamento de bancos de dados.',
                'Consultas avançadas com SQL.',
                'Administração e segurança do MySQL.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 20 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 12 artigos',
                '<i class="fas fa-download"></i> 10 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 69,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/MySLQ.png'
        },
        'Curso de Amazon DynamoDB': {
            title: 'Curso de Amazon DynamoDB',
            learnings: [
                'Fundamentos do DynamoDB.',
                'Criação de tabelas e gerenciamento.',
                'Consultas e indexação.',
                'Integração com outras ferramentas da AWS.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 15 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 10 artigos',
                '<i class="fas fa-download"></i> 8 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 129,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/Amazon_Dynamo.png'
        },
        'Curso de Tableau': {
            title: 'Curso de Tableau',
            learnings: [
                'Fundamentos do Tableau.',
                'Criação de visualizações de dados.',
                'Análise de dados com Tableau.',
                'Integração com outras fontes de dados.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 20 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 10 artigos',
                '<i class="fas fa-download"></i> 8 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 99,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/Tableau.png'
        },
        'Curso de PostgreSQL': {
            title: 'Curso de PostgreSQL',
            learnings: [
                'Fundamentos do PostgreSQL.',
                'Criação e gerenciamento de bancos de dados.',
                'Consultas avançadas com SQL.',
                'Administração e segurança do PostgreSQL.'
            ],
            includes: [
                '<i class="fas fa-video"></i> 20 horas de vídeo sob demanda',
                '<i class="fas fa-file-alt"></i> 12 artigos',
                '<i class="fas fa-download"></i> 10 recursos para download',
                '<i class="fas fa-tv"></i> Acesso no dispositivo móvel e na TV',
                '<i class="fas fa-certificate"></i> Certificado de conclusão'
            ],
            price: 'R$ 79,90',
            image: '/Site-Curso/Curso_Video/frontend/Img/PostgreSQL.jpg'
        }
    };

    if (coursesData[curso]) {
        const course = coursesData[curso];
        document.getElementById('course-title').innerText = course.title;
        document.getElementById('course-image').src = course.image;
        document.getElementById('course-price').innerText = course.price;

        const learningsList = document.getElementById('course-learnings');
        learningsList.innerHTML = ''; // Limpar a lista antes de adicionar novos itens
        course.learnings.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            learningsList.appendChild(li);
        });

        const includesList = document.getElementById('course-includes');
        includesList.innerHTML = ''; // Limpar a lista antes de adicionar novos itens
        course.includes.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            includesList.appendChild(li);
        });
    } else {
        alert('Curso não encontrado.');
    }
});