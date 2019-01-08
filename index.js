$(document).ready(function(){

    const url='https://api.myjson.com/bins/blxqf';
    
    var question=$('#question');
    var nextButton=$("#next");
    var submitButton=$("#submit");
    var toggle=$(".toggle");
    var beginButton=$("#begin");

    
    var arr=[];  //array to store outputs 
    var timeStamp=[];
    var optionSelected=[];  
    var response; //global variable to store data returned through ajax call
    var beginClicked;
    var bool=false; 
    var ques=0; //keeping track of 'id'


    beginButton.click(function()
    {   console.log("CLick on begin detected");
        beginClicked=true;
        $("#intro").remove();
        handle();
        
    })


    //the function where actual ajax call is happening
    function call()
    {
        $.ajax({
        url:url,
        method:'get',
        success:function(data)
            {   console.log("Call worked");
            store(data);
            }
        })
    }

    //just a utlility function to store api data to a global variable
function store(data)
{   if(bool==false)
    {
        response=data;
        bool=true;
    }

}

//the function where DOM manipulation is taking place.
function handle(){
    
    timeStamp.push($.now());
    question.append('Q'+response.questions[ques].id+') '+response.questions[ques].statment);
    toggle.css("display","block");
    ques++;
   
}


submitButton.click(function(){
  
    timeStamp.push($.now());
    $.each($("input[name='options']:checked"), function(){            
        optionSelected.push($(this).val());
    });
  
    alert(optionSelected[ques-1]+" submitted successfully.");
  
});


nextButton.click(function(){
    if(ques<=2)
    {
        question.empty();
        $('input[name=options]').prop('checked',false); //making the radioboxes cleared out for the next question
        handle();
    }
    else 
    {
        for(i=0;i<3;i++)
        {      
        var container ={id : i+1,timeTaken:((timeStamp[i+1]-timeStamp[i])/1000),option:optionSelected[i]};
        arr.push(container);
        }

        var obj1={answers:arr};
        var finalAns=JSON.stringify(obj1);//converting user's choices to appropriate format
        
        $('#quiz').remove();
        $('#output').append("OUTPUT :");
        $('#final').append(finalAns);
    }
    

});

call();
});
