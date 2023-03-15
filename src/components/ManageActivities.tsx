import React from "react";
import { Link } from "react-router-dom";

import {
  IManageActivityActivities,
  IManageActivityState as Props,
  IParentAccountName as ParentAccountNameProps,
} from "../App";

// import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  // const [selectedDatePickerId, setselectedDatePickerId] =
  //   React.useState<string>();

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

  const handleActivityNameChangeMap = (
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
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | Date>,
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
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined,
    id: string
  ) => {
    // const selectedDatePickerId =
    //   event?.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.getElementsByTagName(
    //     "input"
    //   )[0].id;
    setManageActivity(
      (prevState: {
        activities: IManageActivityActivities[];
      }): { activities: IManageActivityActivities[] } => {
        let newState: IManageActivityActivities[] = [...prevState.activities];
        newState.map((activity, index) => {
          if (`start_${activity.activityId.toString()}` === id) {
            return (activity.startDate = date);
          } else {
            return activity;
          }
        });
        return { ...prevState, activities: newState };
      }
    );
  };

  // const handleOnFocus = (
  //   event: React.SyntheticEvent<any, Event> | undefined
  // ) => {
  //   setselectedDatePickerId(event?.currentTarget.id);
  // };

  const handleEndDateChange = (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined,
    id: string
  ) => {
    // const selectedDatePickerId =
    //   event?.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.getElementsByTagName(
    //     "input"
    //   )[0].id;
    setManageActivity(
      (prevState: {
        activities: IManageActivityActivities[];
      }): { activities: IManageActivityActivities[] } => {
        let newState: IManageActivityActivities[] = [...prevState.activities];
        newState.map((activity) => {
          if (`end_${activity.activityId.toString()}` === id) {
            return (activity.endDate = date);
          } else {
            return activity;
          }
        });
        return { ...prevState, activities: newState };
      }
    );
  };

  // Append a new activity to manageActivities.
  // Note that we need a new unique activityId too.
  const handleAddActivity = () => {
    setManageActivity(
      (prevState: {
        activities: IManageActivityActivities[];
      }): { activities: IManageActivityActivities[] } => {
        let newState: IManageActivityActivities[] = [...prevState.activities];
        // loop over activities and get the max. An activity needs an activityId.
        let maxActivityId: number = 1;
        const maxId = prevState.activities.forEach((activity) => {
          if (activity.activityId > maxActivityId) {
            maxActivityId = activity.activityId;
          }
        });
        const newActivity: IManageActivityActivities = {
          activityId: maxActivityId + 1,
          activityName: "",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now()),
          tags: "",
        };
        newState.push(newActivity);
        return { ...prevState, activities: newState };
      }
    );
  };

  // table not RBS
  // const items = manageActivity.activities.map((activity) => {
  //   return (
  //     <Row key={activity.activityId}>
  //       {/* <tr key={activity.activityId}> */}
  //       <Col lg={3}>
  //         {/* <td> */}
  //         <input
  //           type="text"
  //           value={activity.activityName}
  //           onChange={handleActivityNameChangeMap}
  //           id={activity.activityId.toString()}
  //         />
  //         {/* </td> */}
  //       </Col>
  //       <Col lg={3}>
  //         {/* <td> */}
  //         {/* <input
  //             name="startDate"
  //             type="date"
  //             value={activity.startDate?.toLocaleDateString()}
  //             onChange={handleStartDateChange}
  //             id={activity.activityId.toString()}
  //             min="1/1/2023"
  //             max="1/1/2024"
  //           /> */}
  //         <DatePicker
  //           name="startDate"
  //           selected={activity.startDate}
  //           value={activity.startDate?.toLocaleDateString()}
  //           // onFocus={handleOnFocus}
  //           onChange={(
  //             date: Date | null,
  //             event: React.SyntheticEvent<any, Event> | undefined
  //           ) =>
  //             handleStartDateChange(
  //               date,
  //               event,
  //               `start_${activity.activityId.toString()}`
  //             )
  //           }
  //           // onChange={handleStartDateChange}
  //           id={`start_${activity.activityId.toString()}`}
  //           // min="1/1/2023"
  //           // max="1/1/2024"
  //         ></DatePicker>
  //         {/* </td> */}
  //       </Col>
  //       <Col lg={3}>
  //         {/* <td> */}
  //         {/* <input
  //             name="endDate"
  //             type="date"
  //             value={activity.endDate?.toDateString()}
  //             onChange={handleEndDateChange}
  //             min="1/1/2023"
  //             max="1/1/2024"
  //           /> */}
  //         <DatePicker
  //           name="endDate"
  //           value={activity.endDate?.toLocaleDateString()}
  //           onChange={(
  //             date: Date | null,
  //             event: React.SyntheticEvent<any, Event> | undefined
  //           ) =>
  //             handleEndDateChange(
  //               date,
  //               event,
  //               `end_${activity.activityId.toString()}`
  //             )
  //           }
  //           id={`end_${activity.activityId.toString()}`}
  //           // min="1/1/2023"
  //           // max="1/1/2024"
  //         ></DatePicker>
  //         {/* </td> */}
  //       </Col>
  //       <Col lg={3}>
  //         {/* <td> */}
  //         <input
  //           type="text"
  //           value={activity.tags}
  //           onChange={handleTagsChange}
  //           key={activity.activityId}
  //           id={activity.activityId.toString()}
  //         />
  //         {/* </td> */}
  //       </Col>
  //       {/* </tr> */}
  //     </Row>
  //   );
  // });

  // Row and col
  // const items = manageActivity.activities.map((activity) => {
  //   return (
  //     <Row key={activity.activityId}>
  //       <Col lg={3}>
  //         <input
  //           type="text"
  //           value={activity.activityName}
  //           onChange={handleActivityNameChangeMap}
  //           id={activity.activityId.toString()}
  //         />
  //       </Col>
  //       <Col lg={3}>
  //         <DatePicker
  //           name="startDate"
  //           selected={activity.startDate}
  //           value={activity.startDate?.toLocaleDateString()}
  //           onChange={(
  //             date: Date | null,
  //             event: React.SyntheticEvent<any, Event> | undefined
  //           ) =>
  //             handleStartDateChange(
  //               date,
  //               event,
  //               `start_${activity.activityId.toString()}`
  //             )
  //           }
  //           id={`start_${activity.activityId.toString()}`}
  //           minDate={new Date("02-01-2023")}
  //           maxDate={new Date("02-28-2023")}
  //         ></DatePicker>
  //       </Col>
  //       <Col lg={3}>
  //         <DatePicker
  //           name="endDate"
  //           value={activity.endDate?.toLocaleDateString()}
  //           onChange={(
  //             date: Date | null,
  //             event: React.SyntheticEvent<any, Event> | undefined
  //           ) =>
  //             handleEndDateChange(
  //               date,
  //               event,
  //               `end_${activity.activityId.toString()}`
  //             )
  //           }
  //           id={`end_${activity.activityId.toString()}`}
  //           minDate={new Date("02-01-2023")}
  //           maxDate={new Date("02-28-2023")}
  //         ></DatePicker>
  //       </Col>
  //       <Col lg={3}>
  //         <input
  //           type="text"
  //           value={activity.tags}
  //           onChange={handleTagsChange}
  //           key={activity.activityId}
  //           id={activity.activityId.toString()}
  //         />
  //       </Col>
  //     </Row>
  //   );
  // });

  // // Form RBS
  // const items = manageActivity.activities.map((activity) => {
  //   return (
  //     <Form.Group key={activity.activityId}>
  //       <Form.Control>
  //         <input
  //           type="text"
  //           placeholder="Activity name"
  //           value={activity.activityName}
  //           onChange={handleActivityNameChangeMap}
  //           id={activity.activityId.toString()}
  //         />
  //       </Form.Control>
  //       <Form.Control>
  //         <DatePicker
  //           name="startDate"
  //           selected={activity.startDate}
  //           value={activity.startDate?.toLocaleDateString()}
  //           onChange={(
  //             date: Date | null,
  //             event: React.SyntheticEvent<any, Event> | undefined
  //           ) =>
  //             handleStartDateChange(
  //               date,
  //               event,
  //               `start_${activity.activityId.toString()}`
  //             )
  //           }
  //           id={`start_${activity.activityId.toString()}`}
  //           minDate={new Date("02-01-2023")}
  //           maxDate={new Date("02-28-2023")}
  //         ></DatePicker>
  //       </Form.Control>
  //       <Form.Control>
  //         <DatePicker
  //           name="endDate"
  //           value={activity.endDate?.toLocaleDateString()}
  //           onChange={(
  //             date: Date | null,
  //             event: React.SyntheticEvent<any, Event> | undefined
  //           ) =>
  //             handleEndDateChange(
  //               date,
  //               event,
  //               `end_${activity.activityId.toString()}`
  //             )
  //           }
  //           id={`end_${activity.activityId.toString()}`}
  //           minDate={new Date("02-01-2023")}
  //           maxDate={new Date("02-28-2023")}
  //         ></DatePicker>
  //       </Form.Control>
  //       <Form.Control>
  //         <input
  //           type="text"
  //           value={activity.tags}
  //           onChange={handleTagsChange}
  //           key={activity.activityId}
  //           id={activity.activityId.toString()}
  //         />
  //       </Form.Control>
  //     </Form.Group>
  //   );
  // });

  // Form RBS
  const items = manageActivity.activities.map((activity) => {
    return (
      <Form.Group key={activity.activityId}>
        <Row className="mt-3 mb-3">
          <Col xl={3}>
            <Form.Control
              type="text"
              placeholder="Activity name"
              value={activity.activityName}
              onChange={handleActivityNameChangeMap}
              id={activity.activityId.toString()}
            />
          </Col>
          <Col xl={3}>
            <DatePicker
              // wrapperClassName="datepicker"
              name="startDate"
              selected={activity.startDate}
              value={activity.startDate?.toLocaleDateString()}
              onChange={(
                date: Date | null,
                event: React.SyntheticEvent<any, Event> | undefined
              ) =>
                handleStartDateChange(
                  date,
                  event,
                  `start_${activity.activityId.toString()}`
                )
              }
              id={`start_${activity.activityId.toString()}`}
              minDate={new Date("02-01-2023")}
              maxDate={new Date("02-28-2023")}
            ></DatePicker>
          </Col>
          <Col>
            <DatePicker
              name="endDate"
              showMonthDropdown={true}
              value={activity.endDate?.toLocaleDateString()}
              onChange={(
                date: Date | null,
                event: React.SyntheticEvent<any, Event> | undefined
              ) =>
                handleEndDateChange(
                  date,
                  event,
                  `end_${activity.activityId.toString()}`
                )
              }
              id={`end_${activity.activityId.toString()}`}
              minDate={new Date("02-01-2023")}
              maxDate={new Date("02-28-2023")}
            ></DatePicker>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={activity.tags}
              onChange={handleTagsChange}
              key={activity.activityId}
              id={activity.activityId.toString()}
              placeholder="Add tags"
            />
          </Col>
        </Row>
      </Form.Group>
    );
  });

  // return (
  //   <div style={{ margin: "20px" }}>
  //     <Container>
  //       <h2>{manageParentAccountName.parentAccountName}</h2>
  //       <Stack direction="horizontal" gap={3}>
  //         <Button variant="primary" id="back-btn">
  //           Back
  //         </Button>
  //         {/* <span className="right"> */}
  //         <Button id="new-btn" variant="primary" className="ms-auto">
  //           New Activity +
  //         </Button>
  //         <Button id="save-btn" disabled={true} variant="primary">
  //           Save
  //         </Button>
  //         {/* </span> */}
  //       </Stack>
  //       {/* <table>
  //       <thead>
  //         <tr>
  //           <th>Activity Name</th>
  //           <th>Start Date</th>
  //           <th>End Date</th>
  //           <th>Tags</th>
  //         </tr>
  //       </thead>
  //       <tbody>{items}</tbody>
  //     </table> */}
  //       {/* <Table>
  //         <thead>
  //           <tr>
  //             <th>Activity Name</th>
  //             <th>Start Date</th>
  //             <th>End Date</th>
  //             <th>Tags</th>
  //           </tr>
  //         </thead>
  //         <tbody>{items}</tbody>
  //       </Table> */}
  //       <Row>
  //         <Col lg={3}>Activity Name</Col>
  //         <Col lg={3}>Start Date</Col>
  //         <Col lg={3}>End Date</Col>
  //         <Col lg={3}>Tags</Col>
  //       </Row>
  //       {items}
  //     </Container>
  //   </div>
  // );

  return (
    <div>
      <Container>
        <h2 className="mt-3 mb-3">
          {manageParentAccountName.parentAccountName}
        </h2>
        <Stack className="mb-5" direction="horizontal" gap={3}>
          <Link to="/">
            {" "}
            <Button variant="primary" id="back-btn">
              Back
            </Button>
          </Link>

          <Button
            id="new-btn"
            variant="primary"
            className="ms-auto"
            onClick={handleAddActivity}
          >
            New Activity +
          </Button>
          <Button id="save-btn" disabled={true} variant="primary">
            Save
          </Button>
        </Stack>
        <Row className="mt-3 mb-3">
          <Col lg={3}>
            <h4>Activity Name</h4>
          </Col>
          <Col lg={3}>
            <h4>Start Date</h4>
          </Col>
          <Col lg={3}>
            <h4>End Date</h4>
          </Col>
          <Col lg={3}>
            <h4>Tags</h4>
          </Col>
        </Row>
        <Form> {items}</Form>
      </Container>
    </div>
  );
};

export default ManageActivities;
