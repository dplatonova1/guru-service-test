const container = document.querySelector('.container');
const header = document.querySelector('header');

function convertDate(day){
    let date = new Date (day)
    return date.toLocaleDateString('ru-RU')
}

function convertMonth(mon) {
  let monthShort = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let monthLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (let i = 0; i <= monthShort.length; i++) {
    if (monthShort[i] === mon) {
      return monthLong[monthShort.indexOf(mon)]
    }
  }
}

function itemCreate(item) {
  const resultsCard = document.createElement("tbody");
  resultsCard.classList.add("element");
  let values = Object.values(item);
  let template='';
  for (let item of values) {
    template =`<tr class="row"><td class="element__number">${item.number}</td>
    <td class="element__date">${convertDate(item.cdate)}</td></tr>`;
    resultsCard.insertAdjacentHTML('beforeend', template);
  }
  container.appendChild(resultsCard)
}

function monthCreate(item) {
  const monthButton = document.createElement("button");
  monthButton.classList.add("button");
  let month = convertMonth(item.alias);
  monthButton.textContent = `${month}`;
  const quantity = document.createElement("p");
  quantity.classList.add("quantity");
  quantity.textContent = `${Object.keys(item.number_list).length}`;
  monthButton.append(quantity);
  itemCreate(item.number_list);
  return monthButton;
}

function createMonthList(array) {
    let arr = Object.values(array);
    for (let key of arr){
        key.forEach(el=>{
            let dateFrom = new Date(el.date_from);
            let dateTo = new Date(el.date_to);
            var options = { month: 'long'};
            let monthDateFrom = new Intl.DateTimeFormat('en-US', options).format(dateFrom);
            let monthDateTo = new Intl.DateTimeFormat('en-US', options).format(dateTo);//это сответствует лэйблам кнопок
            if(el.is_visible){
            const cardTemplate = monthCreate(el);
            header.appendChild(cardTemplate);}
        })
    }
  }

function filterMonthList(button, element){
    console.log(button, element)
    //если клик по кнопке с нужным alias - оставить только этот элемент массива
}



fetch('numbers.json')
  .then(res => res.json()) 
  .then(data => createMonthList(data))


document.addEventListener('click', (ev, data)=>{
    if(ev.target.closest('button')){
        filterMonthList(ev.target.closest('button'))
    }
})

