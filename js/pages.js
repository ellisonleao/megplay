(function () {
    App.setDefaultTransition('fade');
    App.controller('intro', function (page) {
        //setTimeout(function() {
            App.load('home', 'fade');
        //}, 5000);
    });

    App.controller('questions', function (page, obj) {
        var criterio = $(page).find('.criterio');
        criterio.text(getCriterionDisplay(obj.criterio));

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
    });

    App.load('intro', 'fade');
})();
