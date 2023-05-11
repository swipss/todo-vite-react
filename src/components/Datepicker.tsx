import calendar from "../assets/calendar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function Datepicker({
  startDate,
  setStartDate,
  isAddingDate,
  setIsAddingDate,
}: {
  startDate: Date | null | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null | undefined>>;
  isAddingDate: boolean;
  setIsAddingDate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log(startDate);

  function addDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  return (
    <>
      <div
        className="datepicker-dropdown-button"
        onClick={() => setIsAddingDate(!isAddingDate)}
      >
        <img src={calendar} alt="calendar" className="calendar-icon" />
        <p
          style={{
            color: startDate ? "#4f46e5" : "inherit",
          }}
        >
          {startDate ? moment(startDate).format("ddd, MMM Do") : "Due date"}
        </p>
        {startDate && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setStartDate(null)}
          >
            x
          </button>
        )}
      </div>
      {isAddingDate && (
        <div className="datepicker">
          <div className="datepicker-dropdown">
            <div
              className="provided-dates"
              onClick={() => {
                setStartDate(new Date());
                setIsAddingDate(false);
              }}
            >
              <div>
                {/* today icon */}
                <p>Today</p>
              </div>
              <p>{moment().format("ddd")}</p>
            </div>
            <div
              className="provided-dates"
              onClick={() => {
                setStartDate(addDays(1));
                setIsAddingDate(false);
              }}
            >
              <div>
                {/* today icon */}
                <p>Tomorrow</p>
              </div>
              <p>{moment().add("1", "days").format("ddd")}</p>
            </div>

            <div
              className="provided-dates"
              onClick={() => {
                const weekend = moment().weekday(6);
                setStartDate(weekend.toDate());
                setIsAddingDate(false);
              }}
            >
              <div>
                {/* today icon */}
                <p>This weekend</p>
              </div>
              <p>{moment().weekday(6).format("ddd")}</p>
            </div>

            <div
              className="provided-dates"
              onClick={() => {
                const newWeekStart = moment()
                  .add(1, "weeks")
                  .startOf("isoWeek")
                  .toDate();
                setStartDate(newWeekStart);
                setIsAddingDate(false);
              }}
            >
              <div>
                {/* today icon */}
                <p>Next week</p>
              </div>
              <p>
                {moment()
                  .add(1, "weeks")
                  .startOf("isoWeek")
                  .format("ddd D MMM")}
              </p>
            </div>

            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setIsAddingDate(false);
              }}
              open={true}
              inline
              minDate={moment().toDate()}
              peekNextMonth
              calendarStartDay={1}
            />
          </div>
        </div>
      )}
    </>
  );
}
