import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IUserState as Props } from "../App";
import { ITimeZonesState as TimeZoneProps } from "../App";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import {
  Dropdown,
  // DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";

interface IUserProps {
  userProfile: Props["userProfile"];
  setUserProfile: React.Dispatch<React.SetStateAction<Props["userProfile"]>>;
  timeZones: TimeZoneProps["timeZones"];
}

const stackTokens: IStackTokens = { childrenGap: 20 };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: "auto" },
};

const UserProfile: React.FC<IUserProps> = ({
  userProfile,
  setUserProfile,
  timeZones,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] =
    React.useState<IDropdownOption>();

  const timeZonesDisplay: IDropdownOption[] = timeZones.map((timeZone) => {
    return {
      key: timeZone.MDMTimeZoneId,
      text: timeZone.MDMTimeZoneDisplayName,
      Id: timeZone.Id,
      TimeZoneName: timeZone.TimeZoneName,
      MDMTimeZoneId: timeZone.MDMTimeZoneId,
      MDMTimeZoneDisplayName: timeZone.MDMTimeZoneDisplayName,
    };
  });

  useEffect(() => {
    console.log("selectedTimeZone=", selectedTimeZone);
    console.log("userProfile=", userProfile);
  }, [selectedTimeZone, userProfile]);

  const handleDropdownChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    setSelectedTimeZone(item);
  };

  const handleClick = (): void => {
    if (!selectedTimeZone) return;
    setUserProfile({
      UserAlias: userProfile.UserAlias,
      UserName: userProfile.UserName,
      TimeZone: {
        Id: userProfile.TimeZone.Id,
        TimeZoneName: userProfile.TimeZone.TimeZoneName,
        MDMTimeZoneId: selectedTimeZone.key,
        MDMTimeZoneDisplayName: selectedTimeZone.text,
      },
    });
  };

  return (
    <div className="userProfile">
      <h1>
        {userProfile?.UserAlias
          ? `Hello New User ${userProfile.UserName}`
          : `Welcome ${userProfile.UserName}`}{" "}
      </h1>
      <h3>IS Time Tracker requires you to set a default time zone.</h3>
      <Stack
        horizontal
        horizontalAlign="center"
        tokens={stackTokens}
        verticalAlign="end"
      >
        <Dropdown
          label="Please enter your time zone:"
          onChange={handleDropdownChange}
          options={timeZonesDisplay}
          styles={dropdownStyles}
          required
          selectedKey={
            selectedTimeZone
              ? selectedTimeZone.key
              : userProfile.TimeZone.MDMTimeZoneId
          }
        ></Dropdown>
        <Link to="/">
          <PrimaryButton onClick={handleClick}>Submit Entry</PrimaryButton>
        </Link>
      </Stack>
    </div>
  );
};
export default UserProfile;
