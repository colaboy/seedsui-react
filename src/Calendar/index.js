import Calendar from './Calendar.js'
import Header from './Header'
import Weeks from './utils/Weeks'
import Months from './utils/Months'
import isDisabledDate from './utils/isDisabledDate'

Calendar.Header = Header

Calendar.previousWeek = Weeks.previousWeek
Calendar.nextWeek = Weeks.nextWeek

Calendar.previousMonth = Months.previousMonth
Calendar.nextMonth = Months.nextMonth

Calendar.getWeekDates = Weeks.getWeekDates
Calendar.isDisabledDate = isDisabledDate

export default Calendar
