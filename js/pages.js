(function () {
    'use strict';
    App.setDefaultTransition('fade');
    App.controller('intro', function (page) {
        //setTimeout(function() {
            App.load('home', 'fade');
        //}, 5000);
    });

    App.controller('questions', function (page, obj) {
        var criterio = $(page).find('.criterio');
        var title = $(page).find('.app-title');
        var questions = criterionsData[obj.criterio];

        var ul = $(page).find('ul');
        questions.forEach(function(val, index){
            console.log(val, index);
            ul.append('<li><div class="app-button answers">'+val+'</div></li>');
        });

        function getCriterionDisplay(criterion) {
            var criterions = {
                'lideranca': 'Liderança',
                'informacao-e-conhecimento': 'Informação e Conhecimento',
                'estrategias-e-planos': 'Estratégias e Planos',
                'pessoas': 'Pessoas',
                'clientes': 'Clientes',
                'processos': 'Processos',
                'sociedade': 'Sociedade',
                'resultados': 'Resultados'
            };
            return criterions[criterion];
        }

        function selectAnswer(answer) {
            var criterion = obj.criterio;
            App.dialog({
                title: 'Errado!',
                text: 'Não foi dessa vez! Vamos tentar novamente?',
                okButton: 'Tentar Novamente',
                cancelButton: 'Sair'
            }, function (tryAgain) {
                if (!tryAgain) {
                    App.load('home');
                }
            });
        }

        criterio.text(getCriterionDisplay(obj.criterio));
        title.text(getCriterionDisplay(obj.criterio));

        // listener
        $(page)
            .find('.answers')
            .on('click', function() {
                selectAnswer($(this).text);
            });


    });

    App.load('intro', 'fade');
})();
