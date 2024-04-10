console.log('hello');

// fetch("../data/content.json")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log('error: ', error))

// ASYNC
async function demoFunction(){
    try {
        const navHolder = document.getElementById('listID');

        const temp = await fetch("../data/content.json")
        const data = await temp.json();
        // console.log ('data: ', data.mainnav);

        data.mainnav.forEach(menuItem =>{
            // console.log(menuItem);
            let listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${menuItem.url}"> ${menuItem.text} </a>`
            navHolder.appendChild(listItem);
        })
    } catch (error){
        console.log('error:', error);
    }
}

demoFunction();
