angular.module('surveys')
.controller('takeSurveyCtrl', function(takeSurveyService, $scope ) {

/* Joe Smith - Survey

Topic: HTML / CSS

* Required

How prepared do you feel he was? *
Not Very Well	1 	2 	3 	4 	5 	Super Very Well
[Radio buttons below numbers]



How well did he explain things? *
Not Very Well	1 	2 	3 	4 	5 	Super Very Well
[Radio buttons below numbers]



How well did he do overall? *
Not Very Well	1 	2 	3 	4 	5   6   7   8   9   10	Super Very Well
[Radio buttons below numbers]


Would you like to have him teach again? *
  Yes
  No
[Radio buttons to the left of Yes or No]  

Thoughts
What did he do well, where could he improve?
[Text box]
 
[Submit button] 
*/
    
       
    $scope.readSurvey = function() {
       takeSurveyService.getSurvey($scope.type)
       .then(function( response ) {
            console.log('in takeSurveyCtrl');
            console.log('response', response);
            $scope.survey = response.data;
        }); 
    }
    
    $scope.readSurvey();
    
});