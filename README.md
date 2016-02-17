  <p>Templates are the building blocks of surveys. You can build a new template from scratch, or modify an existing one.</p>
    <img ng-src="images/create_modify_template_entry.jpg">
    <p>The select template drop down box integrates Materialize CSS framework and Angular, using ng-options to display a variable number of template options.</p>
    <img ng-src="images/create_modify_template_dropdown.jpg">
    <p>Templates can use variables, which are enclosed with double $$'s: e.g. $$var_name$$. This allows the adminstrator to set variables when sending surveys, avoiding having to create a large number of templates. </p>
    <img ng-src="images/create_modify_template_variables.jpg">
    <p>Each question in the template is a directive that is ng-repeated for the array of questions. There are 3 question types: numeric, boolean, or text. Numeric are assumed to be a range, with options for low value and high value. Questions can be removed by clicking the X to the right of the question, or added by clicking the Add New Question button at the bottom.</p> 
    <img ng-src="images/create_modify_template_question.jpg">  
    <p>If you try to save an existing template without changing the name, a Modal pops up, asking if you are sure you want to overwrite the existing template. A successful save takes you back to the Admin Main Menu, with a toast.</p>
    
</div>
