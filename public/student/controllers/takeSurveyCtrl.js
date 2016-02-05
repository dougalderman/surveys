angular.module('surveys')
.controller('takeSurveyCtrl', function(takeSurveyService, $scope ) {


    $scope.results = {};
    
    $scope.notAnswered = [];
    
    $scope.surveyID = 123 // Need to get surveyID as passed parm from Q
    
    $scope.initializeResults = function() {
       
       /*     $scope.results.survey = response._id; 
            $scope.results.user = [logged in]; */
        $scope.results.answers = [];
        // $scope.requiredFld = [];
        
        console.log('$scope.survey.questions', $scope.survey.questions);
        $scope.survey.questions.forEach(function(question, index, array) {
            $scope.results.answers[index] = {
                type: question.type
            };
            $scope.notAnswered[index] = false;
        });
        console.log('$scope.results.answers = ', $scope.results.answers);
        console.log('$scope.notAnswered = ', $scope.notAnswered)
        
       
        
    }
       
    $scope.readSurvey = function() {
       takeSurveyService.getSurvey($scope.surveyID)
       .then(function( response ) {
            console.log('in takeSurveyCtrl');
            console.log('response', response);
            $scope.survey = response.data;
            $scope.initializeResults();
        }); 
    }
    
   $scope.checkForRequired = function() {
       
       var allRequiredFieldsAnswered = true;
       
       for (var i = 0; i < $scope.survey.questions.length; i++) {
           if ($scope.survey.questions[i].required) {
                switch ($scope.results.answers[i].type) {
                    case 'numeric': 
                        if (!$scope.results.answers[i].numericAnswer) {
                            console.log('numeric not answered');
                            $scope.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        }
                        else {
                            $scope.notAnswered[i] = false;
                        }
                        break;
                    case 'boolean':
                        if (!$scope.results.answers[i].booleanAnswer) {
                            console.log('boolean not answered');
                            $scope.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        }
                        else {
                            $scope.notAnswered[i] = false;
                        }
                        break;
                    case 'text':
                        if (!$scope.results.answers[i].textAnswer) {
                            console.log('text not answered');
                            $scope.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        }
                        else {
                            $scope.notAnswered[i] = false;
                        }
                        break;
                }
            }
           
       }
       
       return allRequiredFieldsAnswered;
       
   }
    
    $scope.processForm = function() {
        var allRequiredAnswered = $scope.checkForRequired();
        if (allRequiredAnswered) {
            console.log('results = ', $scope.results);
     /*   takeSurveyService.writeSurveyResults($scope.results); */
        }
        else {
           alert('Need to answer all required questions shown in red');
        }
    }
    
    
    $scope.readSurvey();
     

    
});