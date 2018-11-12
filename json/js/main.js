var pageCounter =1;
var animal_container = document.getElementById("animal_info");
var btn = document.getElementById("btn");
btn.addEventListener("click",function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-'+pageCounter+'.json');
    ourRequest.onload = function(){
        if(ourRequest.status >=200 && ourRequest.status<400)
        {
        var ourData = JSON.parse(ourRequest.responseText);
        //JSON.parse is to tell the browser to interpret the data as a json data
        // console.log(ourData[0]);
        renderHTML(ourData);
        }
        else{
             console.log("Connected to the server but it returned an error!!!");
        }

    };

ourRequest.onerror = function(){
    console.log("Please check your connection");
};
ourRequest.send();
pageCounter++;
if(pageCounter>3)
{
    btn.classList.add("hide-me");
}
});

function renderHTML(data){
    var htmlString="";
    for(i=0; i<data.length; i++)
    {
        htmlString+= "<p>" + data[i].name + " is a " + data[i].species + "that likes to eat ";
        for(j=0; j<data[i].foods.likes.length; j++)
        {
            if(j==0)
            {
            htmlString+= data[i].foods.likes[j];
            }
            else{
                htmlString+= " and "+data[i].foods.likes[j];  
            }
        }

        htmlString+=" and dislikes  ";
        for(j=0; j<data[i].foods.dislikes.length; j++)
        {
            if(j==0)
            {
            htmlString+= data[i].foods.dislikes[j];
            }
            else{
                htmlString+= " and "+ data[i].foods.dislikes[j];  
            }
        }

        htmlString+='.</p>'
    }
   animal_container.insertAdjacentHTML('beforeend',htmlString ); 
};