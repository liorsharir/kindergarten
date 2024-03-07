class Time {
    static getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    static getCurrentTime() {
        const now = new Date();
        return now.toTimeString().split(' ')[0];
    }

    static getFirstDayOfWeek(dateStr=Time.getTodayDate()) {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay()+1; 
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -5: 1); 
        date.setDate(diff);
        return date.toISOString().split('T')[0];
    }

    static getLastDayOfWeek(dateStr=Time.getTodayDate()) {
        const date = new Date(this.getFirstDayOfWeek(dateStr));
        date.setDate(date.getDate() + 5); // הוספת 5 ימים לקבלת יום שישי
        return date.toISOString().split('T')[0];
    }

    static areDatesInSameWeek(dateStr1, dateStr2, dateStr3) {
        const weekStart1 = this.getFirstDayOfWeek(dateStr1);
        const weekStart2 = this.getFirstDayOfWeek(dateStr2);
        const weekStart3 = this.getFirstDayOfWeek(dateStr3);

        return weekStart1 === weekStart2 && weekStart2 === weekStart3;
    }

    static addDaysToDate(dateStr, days) {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    static getDayNumber(dateStr) {
        const date = new Date(dateStr);
        console.log("date.getDay",date.getDay())
        return date.getDay() === 0 ? 7 : date.getDay();
    }
    static dayNumToString(dayNum,date) {
        switch(dayNum){
            case 1: return "יום ראשון"+"<br/>"+date
            case 2: return "יום שני"+"<br/>"+date
            case 3: return "יום שלישי"+"<br>"+date
            case 4: return "יום רביעי"+"<br>"+date
            case 5: return "יום חמישי"+"<br>"+date
            case 6: return "יום שישי"+"<br>"+date
        }
    }
}
