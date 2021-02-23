const queryString = decodeURIComponent(window.location.search).split('=')[1]; //parsing 
console.log(queryString);

function onInputSubmit(){
    let menu = [];
    let name = document.getElementById('name').value;
    let price = `Rs. ${document.getElementById('price').value}`;
    let active = document.getElementsByName('active')[0].checked == true ? 'Yes' : "No" ;
    let dol = document.getElementById('dol').value.replaceAll('-', '/').split('/').reverse().join('/');
    let category = document.getElementById('category').value;
    let freeDelivery = document.getElementById('freeDelivery').checked == true ? 'Yes' : 'No';
    // var result = e.options[e.selectedIndex].value;

    let menuList = JSON.parse(localStorage.getItem('menuItems'));
    //console.log(Name, Price, Active, Dol, category, freeDelivery);
    
    //appending the data to menu array
    for(let item in menuList){
        menu.push(menuList[item]);
    }

    //updating the Item
    for(let i in menu){
        let {Name, Action} = menu[i];
        if(Name == queryString){
            menu[i] = {Name: name, Price: price, Active: active, DateOfLaunch: dol, Category: category, FreeDelivery: freeDelivery, Action};
        }
    }
    localStorage.setItem('menuItems', JSON.stringify(menu));

    window.location = './edit-menu-item-status.html'
    return false;
}