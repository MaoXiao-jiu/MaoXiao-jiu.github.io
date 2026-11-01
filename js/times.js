function renderDate() {
    const now = new Date(); 
    const days = now.getDate();
    const months = now.getMonth();
    const week = now.getDay();

    let outputdays = days;
    let outputmonths = months;
    let outputweek = week;

    //天数改序数词预处理
    if ([1,21,31].includes(days)) {
        outputdays = days + "st";
    }
    else if ([2,22].includes(days)) {
        outputdays = days + "nd";
    }
    else if ([3,23].includes(days)) {
        outputdays = days + "rd";
    }
    else {
        outputdays = days + "th";
    }

    //月份改英文预处理
    const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];
    outputmonths = MONTHS[months];


    //week转英文预处理
    const WEEK = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]
    outputweek = WEEK[week];
    return `It's ${outputmonths} ${outputdays}, ${outputweek}`;
}
console.log(renderDate());

const question = document.querySelector('h1 em');
const originalText = question.textContent;
let showingDate = false;

question.addEventListener('click', () => {
    if (showingDate) {
        question.textContent = originalText;
        showingDate = false;
    } else {
        question.textContent = renderDate();
        showingDate = true;
    }
});