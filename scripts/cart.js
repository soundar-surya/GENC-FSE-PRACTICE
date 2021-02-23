let menu = JSON.parse(localStorage.getItem('Cart'));
console.log(menu);


    createRowAndColumn();
    calculateTotal();


// ............................................

function calculateTotal(){
    let total = 0;
    if(menu.length > 0){
        for (let i of menu){
        let price = i.Price.split(' ')[1];
            total += parseInt(price);  
        }
        let elem = document.querySelector('#total').innerHTML = `Total &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Rs. ${total}`;
    }
}
    
function createRowAndColumn(){
    let trArray = [];
    let count = 0;
    let table = document.getElementsByTagName('table');
    //creating sequemce of tr
    for(let i = 0; i < menu.length; i++){
        trArray.push( document.createElement('tr') );
    }
    //creating sequence of td
    for(let i = 0; i < menu.length; i++){
        let c = count;
        let columns = 4;
        let del = 'delete';
        for(let j = 0; j < columns; j++){
            let {Name, Price, FreeDelivery} = menu[i];
            let data = [Name, FreeDelivery, Price];
            // If it's the last iteration create an a tag. 
            if(j == columns - 1){
                let link = trArray[c].appendChild( document.createElement('td') )
                                            .appendChild( document.createElement('a') )                     
                link.appendChild( document.createTextNode(del) );
                 //onclick - passes the queryString in the url
                link.onclick = () => {
                        let updatedCart = [];
                        let flag = true;
                        menu.forEach(({Name: name, FreeDelivery: fd, Price: p}) => {
                            if(flag && name == Name){
                                flag = false;
                            }
                            else
                                updatedCart.push({Name: name,  FreeDelivery: fd, Price: p});
                        } );
                        localStorage.setItem('Cart', JSON.stringify(updatedCart));
                        window.location = './cart.html';
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
