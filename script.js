const container = document.querySelector('.container');
const header = document.querySelector('header');
let monthes;

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

function itemListCreate(items) {
  container.innerHTML = '';
  const resultsCard = document.createElement("tbody");
  resultsCard.classList.add("element");
  let template='';
  for (let item of items) {
    template =`<tr class="row"><td class="element__number">${item.number}</td>
    <td class="element__date">${convertDate(item.cdate)}</td></tr>`;
    resultsCard.insertAdjacentHTML('beforeend', template);
  }
  container.appendChild(resultsCard)
}

function monthCreate(item) {
  const monthButton = document.createElement("button");
  monthButton.classList.add("button");
  let span = document.createElement('span')
  span.classList.add('hidden')
  span.textContent = item.alias;
  let month = convertMonth(item.alias);
  monthButton.textContent = `${month}`;
  const quantity = document.createElement("p");
  quantity.classList.add("quantity");
  quantity.textContent = `${Object.keys(item.number_list).length}`;
  monthButton.append(quantity);
  monthButton.append(span);
  return monthButton;
}

function createMonthList(month_list) {
    month_list.forEach((el) => {
    if (el.is_visible) {
      const cardTemplate = monthCreate(el);
      header.appendChild(cardTemplate);
    }
  });
  if(month_list.length > 0){
    itemListCreate(month_list[0].number_list);
  }
}

function filterMonthList(month_name){
    
    let month = monthes.filter(x => x.alias == month_name)[0];
    ///TO DO aфилтруй записи
    let filtered = month.number_list;
    return filtered;
}



fetch('numbers.json')
  .then(res => res.json()) 
  .then(data => {
        monthes = data.numbers;
        for(let i=0; i<monthes.length;i++){
            let month = monthes[i];
            if(month.is_visible){
                let number_list  =Object.values(month.number_list);
                month.number_list = number_list;
            }
        }
        createMonthList(monthes);
    });


document.addEventListener('click', (ev)=>{
    if(ev.target.closest('button')){
        let month_name = ev.target.lastElementChild.textContent;
        itemListCreate(filterMonthList(month_name));
    }
})

