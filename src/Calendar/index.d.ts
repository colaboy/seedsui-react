import Calendar from './Calendar.js'
import Weeks from './utils/Weeks'
import isDisabledDate from './utils/isDisabledDate'

Calendar.getWeekDates = Weeks.getWeekDates
Calendar.isDisabledDate = isDisabledDate

export default Calendar
