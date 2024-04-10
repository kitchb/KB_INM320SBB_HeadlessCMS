console.log('hello');


// ASYNC FOR SIDEBAR MENU
  async function demoFunction () {
    try {
      const navHolder = document.getElementById('menu');
      const temp = await fetch("../data/content.json")
      const data = await temp.json();
  
      data.mainnav.forEach(menuItem => {
        let listItem = document.createElement('a');
            listItem.className = 'nav-link sidelink p-3 menu-item'
            listItem.style.fontSize = '14px';

        listItem.innerHTML = `
            <i class="fa-solid ${menuItem.icon}"></i>
           ${menuItem.text}`;
        navHolder.appendChild(listItem);
      })
    } catch (error) {
      console.log('error: ', error);
    }
  }
  
  demoFunction();

// ASYNC FOR TICKET CARDS - ROW 1
  async function loadTickets() {
    try {
      const ticketsContainer = document.getElementById('tickets');
      const response = await fetch('../data/content.json');
      const data = await response.json();
  
      data.tickets.forEach(ticket => { 
        const colDiv = document.createElement('div');
        colDiv.className = 'col-xl-3 col-sm-6 col-12';
  
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100';
  
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body ticketbar';
  
        const titleH5 = document.createElement('h5');
        titleH5.className = 'card-title heading1';
        titleH5.textContent = ticket.status;
  
        const amountP = document.createElement('p');
        amountP.className = 'card-text numb-block numbers1';
        amountP.textContent = ticket.amount;
  
        cardBodyDiv.appendChild(titleH5);
        cardBodyDiv.appendChild(amountP);
  
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);
        ticketsContainer.appendChild(colDiv);
      });
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  }
  
  loadTickets();


// FETCH for Row 2 Right Column 
  function loadListItems() {
    const listContainer = document.getElementById('rightgroup');
    
    fetch('../data/content.json')
      .then(response => response.json())
      .then(data => {
        data.listItems.forEach(item => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item disabled rightbar'; 
  
          const label = document.createElement('span');
          label.textContent = item.label;
  
          const value = document.createElement('p');
          value.textContent = item.value;
  
          listItem.appendChild(label);
          listItem.appendChild(value);
          
          listContainer.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error loading list items:', error);
      });
  }
  
  loadListItems();
