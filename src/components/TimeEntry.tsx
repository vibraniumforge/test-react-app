import React, { useEffect } from "react";
import ButtonRow from "./ButtonRow";

import { Link } from "react-router-dom";
import { IUserState as Props } from "../App";
import { ITimeZonesState as TimeZoneProps } from "../App";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface IUserProps {
  userProfile: Props["userProfile"];
  // setUserProfile: React.Dispatch<React.SetStateAction<Props["userProfile"]>>;
  // timeZones: TimeZoneProps["timeZones"];
}

const TimeEntry: React.FC<IUserProps> = ({
  userProfile,
  // setUserProfile,
  // timeZones,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleOnDateChange = (
    date: Date | null
    // event: React.SyntheticEvent<any> | undefined
  ) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log("userProfile=", userProfile);
    console.log("selectedDate=", selectedDate);
  }, [userProfile, selectedDate]);

  return (
    <React.Fragment>
      <DatePicker
        className="mt-4 ms-4"
        // wrapperClassName="datepicker"
        name="date"
        selected={selectedDate}
        value={selectedDate?.toLocaleDateString()}
        onChange={(date: Date | null) => handleOnDateChange(date)}
        id="date-picker"
        // minDate={new Date("02-01-2023")}
        // maxDate={new Date("02-28-2023")}
      ></DatePicker>
      <h4 className="mt-4 ms-4">
        {userProfile.TimeZone.MDMTimeZoneDisplayName} -{" "}
        {userProfile.TimeZone.Id}
      </h4>
      <ButtonRow />
    </React.Fragment>
  );
};

export default TimeEntry;
