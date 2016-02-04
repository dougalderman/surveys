angular.module('surveys')
.controller('takeSurveyCtrl', function(takeSurveyService, $scope ) {


    $scope.results = {};
    
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
        });
        console.log('$scope.results.answers = ', $scope.results.answers);
        
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
    
   
    
    $scope.processForm = function() {
        console.log('results = ', $scope.results);
     /*   takeSurveyService.writeSurveyResults($scope.results); */
    }
    
    $scope.readSurvey();
     

    
});