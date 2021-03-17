import React from 'react'
import PropTypes from 'prop-types'

function CalendarDate(props) {
    const {date} = props;
    const year = date.getFullYear(); // текущий год
    const day = date.getDate(); // текущий день
    const month = date.getMonth(); // текущий месяц

    const months365 = [
        {"Январь": 31},
        {"Февраль": 28}, 
        {"Март": 31},
        {"Апрель": 30},
        {"Май": 31},
        {"Июнь": 30},
        {"Июль": 31},
        {"Август": 31},
        {"Сентябрь": 30},
        {"Октябрь": 31},
        {"Ноябрь": 30},
        {"Декабрь": 31}
    ]

    const months366 = [
        {"Январь": 31},
        {"Февраль": 29}, 
        {"Март": 31},
        {"Апрель": 30},
        {"Май": 31},
        {"Июнь": 30},
        {"Июль": 31},
        {"Август": 31},
        {"Сентябрь": 30},
        {"Октябрь": 31},
        {"Ноябрь": 30},
        {"Декабрь": 31}
    ]
    const months = year % 4 === 0 ? months366 : months365; //високосный год или нет
    const monthsInGenitive = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]

    const week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const monthVal = monthsInGenitive[month]; // текущий месяц в родительном падеже
    
    const dayOfWeek = week[date.getDay()]; // текущий день недели
    const firstDay = new Date(year, date.getMonth(), 1); // первое число текущего месяца, для определения дня недели
    let daysBefore; //кол-во дней, которые нужно добавить в начале календаря из предыдущего месяца
    
    if (firstDay.getDay() === 0) {
        daysBefore = 6
    }
    else {
        daysBefore = firstDay.getDay() - 1;
    } 
    
    //формируем список дат и соответсвующий им класс, а также уникальный key
    const listOfDays = [];

    if (daysBefore !== 0) {
        const firstDateInCalendar = month === 0 ? 31 - daysBefore + 1 : Object.values(months[date.getMonth()-1])[0] - daysBefore + 1;
        
        for (let i = firstDateInCalendar; i < firstDateInCalendar + daysBefore; i++) {
            listOfDays.push([i, "ui-datepicker-other-month", listOfDays.length]);
        }
    }

    for (let i = 1; i < Object.values(months[date.getMonth()])[0] + 1; i++) {
        let classVal;
        if (i === day) {
            classVal = "ui-datepicker-today"
        }
        else {
            classVal = ""
        }
        listOfDays.push([i, classVal, listOfDays.length]);
    }
    
    const lastDayOfMonth = new Date(year, month, listOfDays[listOfDays.length - 1][0]); //последний день текущего месяца
    const lastDayOfWeek = lastDayOfMonth.getDay();//день недели последнего дня текущего месяца

    //добавление дней следующего месяца
    if (listOfDays.length % 7 !== 0) {
        //Нужно добавить дни после
        for (let i = 1; i < 7 - lastDayOfWeek + 1; i++) {
            listOfDays.push([i, "ui-datepicker-other-month", listOfDays.length]);
        }     
    }
    
    //формирование массива из 7 столбцов
    let exitVal = []
    
    for (let i = 0; i < listOfDays.length/7; i++){
        let strOfDays = [];    
        for (let j = 0 + i*7; j < 7 + i*7; j++){
            strOfDays.push(listOfDays[j])
        }
        exitVal[i] = strOfDays;
    }
    const col = [
        [0, ""],
        [1, ""],
        [2, ""],
        [3, ""],
        [4, ""],
        [5, "ui-datepicker-week-end"],
        [6, "ui-datepicker-week-end"]]
    return (
        <div>          
            <div className="ui-datepicker">
                <div className="ui-datepicker-material-header">
                    <div className="ui-datepicker-material-day">{dayOfWeek}</div>
                    <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{day}</div>
                    <div className="ui-datepicker-material-month">{monthVal}</div>
                    <div className="ui-datepicker-material-year">{year}</div>
                    </div>
                </div>
                <div className="ui-datepicker-header">
                    <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{Object.keys(months[date.getMonth()])}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
                    </div>
                </div>
                <table className="ui-datepicker-calendar">
                    <colgroup>
                        {col.map((item)=> 
                            <col
                                key={item[0]}
                                className={item[1]}>                                
                            </col>
                        )}
                    </colgroup>
                    
                    <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                    </thead>
                    <tbody>
                        {exitVal.map((item)=> 
                        <tr key={item}>
                            {item.map((day)=>
                            <td key={day[2]} className={day[1]}>
                                {day[0]}
                            </td>)} 
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>
        </div>
    )
}

CalendarDate.propTypes = {

}

export default CalendarDate

CalendarDate.propTypes = {
    date: PropTypes.object.isRequired
}