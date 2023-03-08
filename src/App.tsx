import React, { useState } from "react";
import "./App.css";
import "./styles/Navbar.css";
import "./styles/UserProfile.css";
import "./styles/Table.css";
import "./styles/ManageActivities.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import TimeEntry from "./components/TimeEntry";
import ManageActivity from "./components/ManageActivities";
import ManageActivity2 from "./components/ManageActivities2";
import UserProfile from "./components/UserProfile";

export interface IUserState {
  userProfile: {
    UserAlias: string;
    UserName: string;
    TimeZone: {
      Id: number;
      TimeZoneName: string;
      MDMTimeZoneId: number | string;
      MDMTimeZoneDisplayName: string;
    };
  };
}

export interface ITimeZonesState {
  timeZones: {
    Id: number;
    TimeZoneName: string;
    MDMTimeZoneId: number;
    MDMTimeZoneDisplayName: string;
  }[];
}

export interface IManageActivityActivities {
  activityId: number;
  activityName: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  tags: string;
}

export interface IParentAccountName {
  manageParentAccountName: {
    parentAccountName: string;
  };
}

export interface IManageActivityState {
  manageActivity: {
    activities: IManageActivityActivities[];
  };
}

function App() {
  const [userProfile, setUserProfile] = useState<IUserState["userProfile"]>({
    UserAlias: "gremorgan",
    UserName: "Gregory Morgan",
    TimeZone: {
      Id: 13,
      TimeZoneName: "Pacific Standard Time",
      MDMTimeZoneId: 23,
      MDMTimeZoneDisplayName: "UTC -08:00 Pacific",
    },
  });

  const [timeZones] = useState<ITimeZonesState["timeZones"]>([
    {
      Id: 13,
      TimeZoneName: "Pacific Standard Time",
      MDMTimeZoneId: 23,
      MDMTimeZoneDisplayName: "UTC -08:00 Pacific",
    },
    {
      Id: 14,
      TimeZoneName: "Eastern Time",
      MDMTimeZoneId: 24,
      MDMTimeZoneDisplayName: "UTC -05:00 East US",
    },
    {
      Id: 15,
      TimeZoneName: "Universal Time",
      MDMTimeZoneId: 25,
      MDMTimeZoneDisplayName: "UTC -00:00",
    },
  ]);

  const [manageActivity, setManageActivity] = useState<
    IManageActivityState["manageActivity"]
  >({
    activities: [
      {
        activityId: 1,
        activityName: "Triage Shaping",
        startDate: new Date("2/1/2023"),
        endDate: new Date("2/10/2023"),
        tags: "Q12023, AI, DevCrewNeeded",
      },
      {
        activityId: 2,
        activityName: "Marketing",
        startDate: new Date("2/19/2023"),
        endDate: new Date("2/28/2023"),
        tags: "Q12024, AI, DevCrewNeeded",
      },
    ],
  });

  const [parentAccountName, setParentAccountName] = useState<
    IParentAccountName["manageParentAccountName"]
  >({
    parentAccountName: "ABC Corp",
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TimeEntry />} />
        <Route
          path="/ManageActivity"
          element={
            <ManageActivity
              manageActivity={manageActivity}
              setManageActivity={setManageActivity}
              manageParentAccountName={parentAccountName}
            />
          }
        />
        <Route
          path="/ManageActivity2"
          element={
            <ManageActivity2
              manageActivity={manageActivity}
              setManageActivity={setManageActivity}
              manageParentAccountName={parentAccountName}
            />
          }
        />
        <Route
          path="/UserProfile"
          element={
            <UserProfile
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              timeZones={timeZones}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
