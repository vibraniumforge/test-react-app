import { SetStateAction, FormEventHandler, MouseEventHandler } from "react";

import {
  IManageActivityActivities,
  IManageActivityState as Props,
  IParentAccountName as ParentAccountNameProps,
} from "../App";

import { Stack, IStackTokens } from "@fluentui/react";
// import { Dropdown, IDropdownOption } from "@fluentui/react";
import { DatePicker, DayOfWeek, IDatePickerStrings } from "@fluentui/react";
import {
  TextField,
  // MaskedTextField,
  // TextFieldBase,
} from "@fluentui/react/lib/TextField";
import {
  DetailsList,
  // DetailsListLayoutMode,
  // Selection,
  // SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";

interface IManageActivityProps {
  manageActivity: Props["manageActivity"];
  setManageActivity: React.Dispatch<
    React.SetStateAction<Props["manageActivity"]>
  >;
  manageParentAccountName: ParentAccountNameProps["manageParentAccountName"];
}

const ManageActivities2: React.FC<IManageActivityProps> = ({
  manageActivity,
  setManageActivity,
  manageParentAccountName,
}) => {
  const stackTokens: IStackTokens = { childrenGap: 40, padding: 20 };

  const handleActivityNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // setManageActivity((prevManageActivities: IManageActivityState ) => {
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

  const handleActivityNameChangeMap = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    console.log("newValue= ", newValue);
    console.log("event= ", event);
    console.log("event.currentTarget= ", event.currentTarget);
    console.log("event.currentTarge.id= ", event.currentTarget.id);
    console.log("event.currentTarget.value= ", event.currentTarget.value);
    setManageActivity(
      (prevState: {
        activities: IManageActivityActivities[];
      }): { activities: IManageActivityActivities[] } => {
        const target = event.target as HTMLInputElement;
        let newState: IManageActivityActivities[] = [...prevState.activities];
        newState.map((activity, index) => {
          if (activity.activityId.toString() === target.id) {
            return (activity.activityName = target.value);
          } else {
            return activity;
          }
        });
        return { ...prevState, activities: newState };
      }
    );
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

  const handleTagsChangeMap = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setManageActivity(
      (prevState: {
        activities: IManageActivityActivities[];
      }): { activities: IManageActivityActivities[] } => {
        const target = event.target as HTMLInputElement;
        let newState: IManageActivityActivities[] = [...prevState.activities];
        newState.map((activity, index) => {
          if (activity.activityId.toString() === target.id) {
            return (activity.tags = target.value);
          } else {
            return activity;
          }
        });
        return { ...prevState, activities: newState };
      }
    );
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

  const handleStartDateChange2 = (
    // event: React.FormEventHandler<HTMLElement> | undefined
    event: MouseEventHandler<HTMLElement>
  ): any => {
    console.log(event);
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
  };

  const items = manageActivity.activities.map((activity) => {
    return (
      <tr key={activity.activityId}>
        <td>
          <input
            type="text"
            value={activity.activityName}
            onChange={handleActivityNameChangeMap}
            key={activity.activityId}
            id={activity.activityId.toString()}
          />
        </td>
        <td>
          <DatePicker
            initialPickerDate={
              activity.startDate ? activity.startDate : undefined
            }
            // onSelectDate={handleStartDateChange}
            // onChange={handleStartDateChange}
            // onClickCapture={handleStartDateChange2}
            onClickCapture={(event) => handleStartDateChange2}
            value={activity.startDate ? activity.startDate : undefined}
            key={activity.activityId}
            id={activity.activityId.toString()}
            label="Start Date"
          ></DatePicker>
        </td>
        <td>
          <DatePicker
            initialPickerDate={activity.endDate ? activity.endDate : undefined}
            onSelectDate={handleEndDateChange}
            value={activity.endDate ? activity.endDate : undefined}
            key={activity.activityId}
            // label="End Date"
          ></DatePicker>
        </td>
        <td>
          <input
            type="text"
            value={activity.tags}
            onChange={handleTagsChange}
            key={activity.activityId}
            id={activity.activityId.toString()}
          />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>{manageParentAccountName.parentAccountName}</h2>
      <table>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th></th>
            <th>End Date</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default ManageActivities2;
