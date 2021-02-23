let menu = [];
let menuItems = JSON.parse(localStorage.getItem('menuItems'));

for(let i in menuItems){
    var {Active, Name, Price, DateOfLaunch, Category, FreeDelivery} =  menuItems[i];
    if(Active == "Yes")
        menu.push({Name, Price, Category, FreeDelivery, Action: 'Add to Cart'});
}

//creating cart if doesn't exist
localStorage.getItem('Cart') ? undefined : localStorage.setItem('Cart', JSON.stringify([]));

createRowAndColumn();



function createRowAndColumn(){
    let trArray = [];
    let count = 0;
    let table = document.getElementsByTagName("table");

    //creating sequemce of tr
    for(let i = 0; i < menu.length; i++){
        trArray.push( document.createElement('tr') );
    }
    //creating sequence of td
    for(let i = 0; i < menu.length; i++){
        let c = count;
        for(let j = 0; j < 5; j++){
            let {Name, Price, Category, FreeDelivery, Action} = menu[i];
            let data = [Name, FreeDelivery, Price, Category, Action];
            // If it's the last iteration create an a tag. 
            if(j == 4){
                let link = trArray[c].appendChild( document.createElement('td') )
                                            .appendChild( document.createElement('a') )                     
                link.appendChild( document.createTextNode(data[j]) );
                 //onclick - passes the queryString in the url
                link.onclick = () => {
                        let cart = JSON.parse(localStorage.getItem('Cart'));
                        cart.push({Name, FreeDelivery, Price});
                        localStorage.setItem('Cart', JSON.stringify(cart));
                        document.getElementById('notification').innerHTML = "Item added to Cart Successfully";
                    }
                link.style.textDecoration = "underline";
                link.style.cursor = "pointer";
            }
            else
                trArray[c].appendChild( document.createElement('td') ).appendChild( document.createTextNode(data[j]) );
            }
        count++;
    }

     //appending elements table
    for(let i of trArray){
        table[0].appendChild(i);
    }
}
