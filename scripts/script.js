import values from './defaultMenu.js';

    let menu = [];
    let menuItems = localStorage.getItem('menuItems') 
                                ? JSON.parse(localStorage.getItem('menuItems'))
                                : localStorage.setItem('menuItems', JSON.stringify(values));
    
    if(!menuItems) menuItems = JSON.parse(localStorage.getItem('menuItems'));

    for(let i in menuItems){
       var {Active, Name, Price, DateOfLaunch, Category, FreeDelivery, Action} =  menuItems[i]
        menu.push({Active, Name, Price, DateOfLaunch, Category, FreeDelivery, Action});
    }

    createRowAndColumn();
    
    function createRowAndColumn(){
        let trArray = [];
        let count = 0;
        let table = document.getElementsByTagName('table');

        //creating sequemce of tr
        for(let i = 0; i < 5; i++){
            trArray.push( document.createElement('tr') );
        }
        //creating sequence of td
        for(let i = 0; i < 5; i++){
            let c = count;
            for(let j = 0; j < 7; j++){
                let {Name, Price, Active, DateOfLaunch, Category, FreeDelivery, Action} = menu[i];
                let data = [Name, Price, Active, DateOfLaunch, Category, FreeDelivery, Action];

                // If it's the last iteration create an a tag. 
                if(j == 6){
                    let link = trArray[c].appendChild( document.createElement('td') )
                                               .appendChild( document.createElement('a') )                     
                    link.appendChild( document.createTextNode(data[j]) );
                    //onclick - passes the queryString in the url
                    link.onclick = () => {
                        //passing the name of the item to edit-menu page
                        let queryString = "?ItemToBeEdited=" + Name;
                        window.location = './edit-menu-item.html'+queryString;
                        }
                    link.style.textDecoration = "underline";
                    link.style.cursor = "pointer";
                    console.log(link);

                }
                else
                    trArray[c].appendChild( document.createElement('td') ).appendChild( document.createTextNode(data[j]) );
                }
            count++;
        console.log(trArray[count-1]);
        }

        //appending elements table
        for(let i of trArray){
            table[0].appendChild(i);
        }
        console.log(table[0]);
    }
