(function () {
    'use strict';
    App.setDefaultTransition('fade');
    App.controller('intro', function (page) {
        setTimeout(function() {
            App.load('home', 'fade');
        }, 5000);
    });

    App.controller('questions', function (page, obj) {
        var criterio = $(page).find('.criterio');
        var title = $(page).find('.app-title');
        var questions = criterionsData[obj.criterio];
        var rightAnswer = questions[Math.floor(Math.random() * questions.length)];
        var answers = [];
        // get one answer from each criteria to create the answers
        var max = 4;
        var keys = Object.keys(criterionsData);
        // remove the current criteria key
        var index = keys.indexOf(obj.criterio);
        keys.splice(index, 1);
        var i = 0;
        while (i <= max) {
            // choose one aswer from a random criterion
            var criteria = keys[Math.floor(Math.random() * keys.length)];
            var aAnswer = criterionsData[criteria][Math.floor(Math.random() * criterionsData[criteria].length)]
            // do not add same answer again
            if (answers.indexOf(aAnswer) === -1) {
                answers.push(aAnswer);
                i++;
            }
        }
        answers.push(rightAnswer);

        // shuffle the array
        answers = shuffle(answers);
        var correctIndex = answers.indexOf(rightAnswer);

        var ul = $(page).find('ul');
        answers.forEach(function(val, index){
            ul.append('<li><div class="app-button answers" data-index="'+index+'">'+val+'</div></li>');
        });

        function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

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
            if (answer != correctIndex) {
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
            } else {
                App.dialog({
                    title: 'Correto!',
                    text: 'Parabéns! Você acertou',
                    okButton: 'Escolher outro critério',
                    cancelButton: 'Sair'
                }, function (option) {
                    if (option === 'ok') {
                        App.load('home');
                    }
                });
            }
        }

        criterio.text(getCriterionDisplay(obj.criterio));
        title.text(getCriterionDisplay(obj.criterio));

        // listener
        $(page)
            .find('.answers')
            .on('click', function() {
                selectAnswer($(this).attr('data-index'));
            });


    });

    App.load('intro', 'fade');
})();
