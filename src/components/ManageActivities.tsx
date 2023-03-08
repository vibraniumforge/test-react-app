import React from "react";
import { Link } from "react-router-dom";

import {
  IManageActivityActivities,
  IManageActivityState as Props,
  IParentAccountName as ParentAccountNameProps,
} from "../App";

import { Stack, IStackTokens } from "@fluentui/react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
// import { Dropdown, IDropdownOption } from "@fluentui/react";
import { DatePicker, DayOfWeek, IDatePickerStrings } from "@fluentui/react";
import {
  TextField,
  MaskedTextField,
  TextFieldBase,
} from "@fluentui/react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";

interface IManageActivityProps {
  manageActivity: Props["manageActivity"];
  setManageActivity: React.Dispatch<
    React.SetStateAction<Props["manageActivity"]>
  >;
  manageParentAccountName: ParentAccountNameProps["manageParentAccountName"];
}

const ManageActivities: React.FC<IManageActivityProps> = ({
  manageActivity,
  setManageActivity,
  manageParentAccountName,
}) => {
  const stackTokens: IStackTokens = { childrenGap: 40, padding: 20 };

  const items = [manageActivity];

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Activity Name",
      fieldName: "activityName",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: typeof manageActivity, index) => {
        return (
          <TextField
            required
            value={
              item.activities[
                item.activities.findIndex(
                  (instance) =>
                    instance.activityId === item.activities[0].activityId
                )
              ].activityName
            }
            onChange={handleActivityNameChange}
            key={index}
            id={item.activities[0].activityId.toString()}
            // errorMessage="Please enter an activity name"
          />
        );
      },
    },
    {
      key: "column2",
      name: "Start Date",
      fieldName: "startDate",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: typeof manageActivity) => {
        return (
          <DatePicker
            initialPickerDate={
              item.activities[0].startDate
                ? item.activities[0].startDate
                : undefined
            }
            onSelectDate={handleStartDateChange}
            value={
              item.activities[0].startDate
                ? item.activities[0].startDate
                : undefined
            }
          ></DatePicker>
        );
      },
    },
    {
      key: "column3",
      name: "End Date",
      fieldName: "endDate",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: typeof manageActivity) => {
        return (
          <DatePicker
            initialPickerDate={
              item.activities[0].endDate
                ? item.activities[0].endDate
                : undefined
            }
            onSelectDate={handleEndDateChange}
            value={
              item.activities[0].endDate
                ? item.activities[0].endDate
                : undefined
            }
          ></DatePicker>
        );
      },
    },
    {
      key: "column4",
      name: "Tags",
      fieldName: "tags",
      minWidth: 100,
      maxWidth: 400,
      isResizable: true,

      onRender: (item: typeof manageActivity) => {
        return (
          <TextField
            value={item.activities[0].tags}
            onChange={handleTagsChange}
          />
        );
      },
    },
  ];

  const handleActivityNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const newName = event.currentTarget.value;
    let activitiesAr = [...manageActivity.activities];
    let index = activitiesAr.findIndex(
      (item) => item.activityId.toString() === event.currentTarget.id
    );
    if (index !== -1) {
      activitiesAr[index] = {
        ...activitiesAr[index],
        activityName: newName,
      };
    }
    setManageActivity({ ...manageActivity, activities: activitiesAr });
  };

  const handleTagsChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLInputElement;
    const newTags = target.value;
    let activitiesAr = [...manageActivity.activities];
    let index = activitiesAr.findIndex(
      (item) => item.activityId.toString() === target.id
    );
    if (index !== -1) {
      activitiesAr[index] = {
        ...activitiesAr[index],
        tags: newTags,
      };
    }
    setManageActivity({ ...manageActivity, activities: activitiesAr });
  };

  const handleStartDateChange = (
    date: Date | null | undefined
    // event: React.MouseEventHandler<HTMLElement> | undefined
  ) => {
    setManageActivity(
      (prevState: {
        activities: IManageActivityActivities[];
      }): { activities: IManageActivityActivities[] } => {
        let newState: IManageActivityActivities[] = [...prevState.activities];
        // const target = e;
        newState.map((activity, index) => {
          if (activity.activityId.toString() === "1") {
            return (activity.startDate = date);
          } else {
            return activity;
          }
        });
        return { ...prevState, activities: newState };
      }
    );
  };

  const handleEndDateChange = (
    // date: Date | null | undefined,
    // event: React.FormEvent<HTMLElement>
    event: any
  ) => {
    // setManageActivity({
    //   ...manageActivity,
    //   endDate: date,
    // });
    console.log(event);
    console.log(manageActivity);
  };

  return (
    <div>
      <Stack horizontal horizontalAlign="start" tokens={stackTokens}>
        <span className="left">
          <Stack.Item>
            {" "}
            <Link to="/">
              <PrimaryButton
                id="back-btn"
                text="Back"
                ariaDescription="Back button"
              />
            </Link>
          </Stack.Item>
        </span>
      </Stack>
      <span className="right">
        <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
          <Stack.Item order={1} align="end">
            <PrimaryButton
              id="new-btn"
              text="New Activity +"
              ariaDescription="New button"
            />
          </Stack.Item>
          <Stack.Item order={2} align="end">
            <PrimaryButton
              id="save-btn"
              text="Save"
              // onClick={}
              ariaDescription="Save button"
              disabled={true}
            />
          </Stack.Item>
        </Stack>
      </span>
      {/* </Stack> */}
      <h2>{manageParentAccountName.parentAccountName}</h2>

      <DetailsList items={items} columns={columns} selectionMode={0} />
      {/* <TextField />
      <DatePicker
        initialPickerDate={
          manageActivity.startDate ? manageActivity.startDate : undefined
        }
        onSelectDate={handleStartDateChange}
        value={manageActivity.startDate ? manageActivity.startDate : undefined}
        // label="Start Date"
      ></DatePicker>
      <DatePicker
        initialPickerDate={
          manageActivity.endDate ? manageActivity.endDate : undefined
        }
        onSelectDate={handleEndDateChange}
        value={manageActivity.endDate ? manageActivity.endDate : undefined}
        // label="End Date"
      ></DatePicker> */}
    </div>
  );
};

export default ManageActivities;
