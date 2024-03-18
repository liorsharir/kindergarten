Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

class Week {
    constructor(date = new Date()) {
        this.currentDate  = this.convert(date)
        this.sunday  =""
        this.saturday =""
        this.focusDate = ""
        this.Arr = []
        this.getCurrentWeekSunday()
        this.getCurrentWeekSaturday()
    }

    getCurrentWeekSunday() {
        const dayOfWeek = new Date(this.currentDate).getDay();
        const currentWeekSunday = new Date(this.currentDate);
        currentWeekSunday.setDate(currentWeekSunday.getDate() - dayOfWeek);

        this.currentDate = this.convert(currentWeekSunday);
        this.sunday = this.convert(currentWeekSunday);
        return this;
    }


    getCurrentWeekSaturday(){
        let date = new Date(this.currentDate)
        date.setDate(date.getDate() + 6);
        this.saturday =  this.convert(date)
        return this;
    }


    addWeekToDate(_date=this.currentDate) {
        let date = new Date(_date)
        date.setDate(date.getDate() + 7);
        this.currentDate = this.convert(date);
        this.getCurrentWeekSunday();
        this.getCurrentWeekSaturday();
        return this;
    }

    subWeekToDate(_date=this.currentDate) {
        console.log("ddd",_date)
        let date = new Date(_date)
        date.setDate(date.getDate() - 7);
        this.currentDate = this.convert(date);
        this.getCurrentWeekSunday();
        this.getCurrentWeekSaturday();
        return this;
    }

    getDayDate(num){
        let date = new Date(this.currentDate)
        date.setDate(date.getDate() + num-1);
        let temp = this.convert(date).split('-')
        return `${temp[1]} - ${temp[2]}`;
    }
    getDayDateFormat(num){
        let date = new Date(this.currentDate)
        date.setDate(date.getDate() + num-1);
        let temp = this.convert(date).split('-')
        return `${temp[0]}-${temp[1]}-${temp[2]}`;
    }

    convert(date){
        return date.toISOString().split('T')[0]
    }


    areDateInSameWeek(dateStr1) {
        const firstDate = new Date(this.sunday);
        const date = new Date(dateStr1);

        if(date.getTime() == firstDate.getTime())
            return true

        let i =0
        while(i<6){
            firstDate.setDate(firstDate.getDate() + 1);
            if(date.getTime() == firstDate.getTime())
                return true
            i++;
        }
        return false
    }

}







class Month {
    constructor(date = new Date()) {
        this.date     = date;
        this.now      = this.convert(this.date)
        this.first    = this.convert(new Date(this.date.getFullYear(), this.date.getMonth(), 2));
        this.last     = this.convert(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1));
        this.lenDays    = new Date(this.last).getDate();
        this.allDate      = Array.from({ length: this.lenDays }, (_, i) =>this.convert( new Date(this.date.getFullYear(), this.date.getMonth(), i + 1)));
    }

    addMonth() {
        this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
        this.now    = this.convert(this.date)
        this.first    = this.convert(new Date(this.date.getFullYear(), this.date.getMonth(), 2));
        this.last     = this.convert(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1));
        this.lenDays    = new Date(this.last).getDate();
        this.allDate      = Array.from({ length: this.lenDays }, (_, i) =>this.convert( new Date(this.date.getFullYear(), this.date.getMonth(), i + 1)));
    }

    subMonth() {
        this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
        this.now    = this.convert(this.date)
        this.first    = this.convert(new Date(this.date.getFullYear(), this.date.getMonth(), 2));
        this.last     = this.convert(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1));
        this.lenDays    = new Date(this.last).getDate();
        this.allDate      = Array.from({ length: this.lenDays }, (_, i) =>this.convert( new Date(this.date.getFullYear(), this.date.getMonth(), i + 1)));
    }

    convert(date){
        return date.toISOString().split('T')[0]
    }

    getDayString(_date){
        let date = new Date(_date);
        let day = date.getDay();
        if(day == 0)
            return "יום ראשון"
        if(day == 1)
            return "יום שני"
        if(day == 2)
            return "יום שלישי"
        if(day == 3)
            return "יום רביעי"
        if(day == 4)
            return "יום חמישי"
        if(day == 5)
            return "יום שישי"
        if(day == 6)
            return "יום שבת"

    }
    getDayNum(_date){
        let date = new Date(_date);
        let day = date.getDay();
        return day+1
    }
    areDateInSameMonth(dateStr1) {
        const date1 = new Date(this.first);
        const date2 = new Date(dateStr1);

        console.log("date1 = ", date1)
        console.log("date2 = ", date2)




        let isSameOnMon = date1.getMonth() == date2.getMonth();

        console.log("isSameOnMon = ", isSameOnMon)


        date1.setDate(date1.getDate() - 1);

        console.log("date1 = ", date1)
        console.log("date2 = ", date2)
        console.log("day date1 = ", date1.getDay())
        console.log("day date2 = ", date2.getDay())

        console.log(isSameOnMon || date1.getDay() ==  date2.getDay())

        return isSameOnMon || date1.getDay() ==  date2.getDay()

    }
}

