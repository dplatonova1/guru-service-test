const container = document.querySelector('.container');
const header = document.querySelector('.header');
const searchInput = document.querySelector('.search__input');
let monthes;
let current_month;

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
    month_list.forEach((month) => {
    if (month.is_visible) {
      const cardTemplate = monthCreate(month);
      header.appendChild(cardTemplate);
    }
  });
  if(month_list.length > 0){
    current_month = month_list[0].alias;
    itemListCreate(month_list[0].number_list);
  }
}

function filterMonthList(month_name, number) {
  let month = monthes.filter((x) => x.alias == month_name)[0];
  let filtered = month.number_list;
  if (!!number) {
    filtered = filtered.filter((x) => x.number == number);
  }
  return filtered;
}

function search() {
   let input = document.forms.search.elements.search;
        itemListCreate(filterMonthList(current_month, input.value));   
  }


fetch('numbers.json')
  .then(res => res.json()) 
  .then(data => {
        monthes = data.numbers;
        for(let i=0; i<monthes.length;i++){
            let month = monthes[i];
            if(month.is_visible){
                let number_list = Object.values(month.number_list);
                month.number_list = number_list;
            }
        }
        createMonthList(monthes);
    });


    header.addEventListener('click', (ev)=>{
    ev.preventDefault();
    document.forms.search.elements.search.value='';
    if(ev.target.closest('button')){
        let month_name = ev.target.lastElementChild.textContent;
        current_month=month_name;
        itemListCreate(filterMonthList(month_name, 0));
        let btns = ev.target.parentNode.children;

        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
              var current = document.getElementsByClassName("active");
              if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
              }
              this.className += " active";
            });
          }
    }
    
})

document.forms.search.elements.search.addEventListener('input', (event)=>{
    event.preventDefault();
    search()
})



//Задача № 2

function UTCDate(){
let now = new Date();
let min = 12;
let max = 18;
    if(now.getHours()>min && now.getHours()<max){
        console.log(now, "Не забудьте сделать перерыв и плотно пообедать - сейчас самое время (с 12:00 до 18:00)")
    }
    else {
        console.log(now)
    }
}

UTCDate()