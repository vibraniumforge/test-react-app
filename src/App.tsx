import React, { useState } from "react";
import "./App.css";
import "./styles/Navbar.css";
import "./styles/UserProfile.css";
import "./styles/Table.css";
import "./styles/ManageActivities.css";
// import Navbar from "./components/Navbar";
import NavbarRBS from "./components/NavbarRBS";
import { Routes, Route } from "react-router-dom";
import TimeEntry from "./components/TimeEntry";
// import ManageActivity from "./components/ManageActivities";
import ManageActivities from "./components/ManageActivities";
import UserProfile from "./components/UserProfile";

export interface IUserState {
  userProfile: {
    UserAlias: string;
    UserName: string;
    TimeZone: {
      Id: number;
      TimeZoneName: string;
      MDMTimeZoneId: number;
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
        startDate: new Date("2023-02-01T00:00:00"),
        endDate: new Date("2023-02-10T00:00:00"),
        tags: "Q1 2023, AI, DevCrewNeeded",
      },
      {
        activityId: 2,
        activityName: "Marketing",
        startDate: new Date("2023-02-21T00:00:00"),
        endDate: new Date("2023-02-28T00:00:00"),
        tags: "Q1 2024, ML, Finance",
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
      {/* <Navbar /> */}
      <NavbarRBS />
      <Routes>
        <Route
          path="/"
          element={
            <TimeEntry
              userProfile={userProfile}
              // setUserProfile={setUserProfile}
              // timeZones={timeZones}
            />
          }
        />
        {/* <Route
          path="/ManageActivity"
          element={
            <ManageActivity
              manageActivity={manageActivity}
              setManageActivity={setManageActivity}
              manageParentAccountName={parentAccountName}
            />
          }
        /> */}
        <Route
          path="/ManageActivities"
          element={
            <ManageActivities
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
