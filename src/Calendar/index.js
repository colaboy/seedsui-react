import Calendar from './Calendar.js'
import Header from './Header'
import Weeks from './utils/Weeks'
import isDisabledDate from './utils/isDisabledDate'

Calendar.Header = Header
Calendar.getWeekDates = Weeks.getWeekDates
Calendar.isDisabledDate = isDisabledDate

export default Calendar
