import React from "react";
// import { CalendarInlineMonthSelectionExample } from "./CalendarInlineMonthSelectionExample";
import { DatePickerExternalControls } from "./DatePickerExternal";
import ButtonRow from "./ButtonRow";

function TimeEntry() {
  return (
    <React.Fragment>
      <h1>TimeEntry</h1>
      {/* <CalendarInlineMonthSelectionExample /> */}
      <DatePickerExternalControls />
      <ButtonRow />
    </React.Fragment>
  );
}

export default TimeEntry;
