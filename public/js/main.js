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

// FETCH for last row left block - Unresolved Tickers
  function loadUnresolvedTickets() {
    const unresolvedTicketsContainer = document.getElementById('leftblock');
    
    fetch('../data/content.json')
      .then(response => response.json())
      .then(data => {
        unresolvedTicketsContainer.querySelector('.card-title').textContent = data.title;
        
        unresolvedTicketsContainer.querySelector('#support').textContent = data.group;
        
        const ticketList = unresolvedTicketsContainer.querySelector('.listblock');
        data.unresolvedlist.forEach(ticket => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.textContent = ticket.name;
          
          const countSpan = document.createElement('span');
          countSpan.classList.add('text-nowrap', 'text-xs', 'text-muted');
          countSpan.textContent = ticket.count;
          
          listItem.appendChild(countSpan);
          ticketList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error loading unresolved tickets:', error);
      });
  }
  
  loadUnresolvedTickets();


// FETCH for last row right block
function loadTasks() {
    const tasksContainer = document.querySelector('.bottomblock');
  
    fetch('../data/content.json')
      .then(response => response.json())
      .then(data => {
        tasksContainer.querySelector('.card-title').textContent = data.heading;
  
        tasksContainer.querySelector('.card-link').setAttribute('href', data.viewAllLink);
  
        tasksContainer.querySelector('.subheading').textContent = data.subheading;
  
        const taskList = tasksContainer.querySelector('.listblock');
        data.tasklist.forEach((task, index) => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');

          if (index === 0) {
            listItem.classList.add('disabledtext');
            listItem.setAttribute('aria-disabled', 'true');
          }
  
          if (index === 0) {
            // task button
            const createTaskButton = document.createElement('button');
            createTaskButton.innerHTML = '<i class="bi bi-plus-square-fill"></i>';
            listItem.appendChild(document.createTextNode('Create new task '));
            listItem.appendChild(createTaskButton);
          } else {
            // radio input
            const radioInput = document.createElement('input');
            radioInput.classList.add('form-check-input', 'me-1');
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('name', 'listGroupRadio');
            radioInput.setAttribute('id', `taskRadio${index}`);
            if (index === 1) {
              radioInput.setAttribute('checked', 'checked');
            }
  
            const radioLabel = document.createElement('label');
            radioLabel.classList.add('form-check-label');
            radioLabel.setAttribute('for', `taskRadio${index}`);
            radioLabel.textContent = task.name;
  
            const badgeSpan = document.createElement('span');
            badgeSpan.classList.add('badge', 'utext');

            if (task.badge === 'URGENT') {
                badgeSpan.classList.add('text-bg-warning');
              } else if (task.badge === 'NEW') {
                badgeSpan.classList.add('text-bg-success');
              } else if (task.badge === 'DEFAULT') {
                badgeSpan.classList.add('text-bg-secondary');
              }
            badgeSpan.textContent = task.badge;
  
            listItem.appendChild(radioInput);
            listItem.appendChild(radioLabel);
            listItem.appendChild(badgeSpan);
          }
  
          taskList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error loading tasks:', error);
      });
  }
  
  loadTasks();
