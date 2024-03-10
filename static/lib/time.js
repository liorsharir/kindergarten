
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
        console.log("ddd",_date)
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

}







class Month {
    constructor(date = new Date()) {
        this.date     = date;
        this.now    = this.convert(this.date)
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
}

