import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IUserState as Props } from "../App";
import { ITimeZonesState as TimeZoneProps } from "../App";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface IUserProps {
  userProfile: Props["userProfile"];
  setUserProfile: React.Dispatch<React.SetStateAction<Props["userProfile"]>>;
  timeZones: TimeZoneProps["timeZones"];
}

const UserProfile: React.FC<IUserProps> = ({
  userProfile,
  setUserProfile,
  timeZones,
}) => {
  const [selectedTimeZoneId, setSelectedTimeZone] = React.useState<number>();

  const timeZonesDisplay = timeZones.map((timeZone) => {
    return (
      <option key={timeZone.Id} value={timeZone.Id}>
        {timeZone.MDMTimeZoneDisplayName}
      </option>
    );
  });

  // const timeZonesDisplay = timeZones.map((timeZone) => {
  //   return (
  //     <Dropdown.Item
  //       key={timeZone.Id.toString()}
  //       value={timeZone.Id.toString()}
  //       id={timeZone.Id.toString()}
  //     >
  //       {timeZone.MDMTimeZoneDisplayName}
  //     </Dropdown.Item>
  //   );
  // });

  useEffect(() => {
    console.log("selectedTimeZoneId=", selectedTimeZoneId);
    console.log("userProfile=", userProfile);
  }, [selectedTimeZoneId, userProfile]);

  const handleDropdownChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    setSelectedTimeZone(parseInt(event.currentTarget.value, 10));
  };

  const handleClick = (): void => {
    if (!selectedTimeZoneId) return;
    setUserProfile({
      UserAlias: userProfile.UserAlias,
      UserName: userProfile.UserName,
      TimeZone: {
        Id: selectedTimeZoneId,
        TimeZoneName: timeZones.filter(
          (timeZone) => timeZone.Id === selectedTimeZoneId
        )[0].TimeZoneName,
        MDMTimeZoneId: timeZones.filter(
          (timeZone) => timeZone.Id === selectedTimeZoneId
        )[0].MDMTimeZoneId,
        MDMTimeZoneDisplayName: timeZones.filter(
          (timeZone) => timeZone.Id === selectedTimeZoneId
        )[0].MDMTimeZoneDisplayName,
      },
    });
  };

  return (
    // <div className="userProfile">
    //   <h1>
    //     {userProfile?.UserAlias
    //       ? `Hello New User ${userProfile.UserName}`
    //       : `Welcome ${userProfile.UserName}`}{" "}
    //   </h1>
    //   <h3>IS Time Tracker requires you to set a default time zone.</h3>
    //   <label>Please enter your time zone:</label>
    //   <select
    //     name="select"
    //     defaultValue={userProfile.TimeZone.Id}
    //     onChange={handleDropdownChange}
    //   >
    //     {timeZonesDisplay}
    //   </select>
    //   {/* <DropdownButton
    //     id="dropdown-btn"
    //     title="Dropdown Button"
    //     defaultValue={userProfile.TimeZone.Id}
    //     onChange={handleDropdownChange}
    //     // children={undefined}
    //   >
    //     {timeZonesDisplay}
    //   </DropdownButton> */}
    //   <Link to="/">
    //     <button onClick={handleClick}>Submit Entry</button>
    //   </Link>
    // </div>
    <Container>
      <Row lg={6} className="justify-content-md-center mt-5">
        <Col xl={6}>
          <Form.Select
            aria-label="Time Zone Select "
            name="select"
            defaultValue={userProfile.TimeZone.Id}
            // value={userProfile.TimeZone.Id}
            onChange={handleDropdownChange}
          >
            <option>Choose a time zone:</option>
            {timeZonesDisplay}
          </Form.Select>
        </Col>
        <Col xl={4}>
          {/* <Link to="/"> */}
          <Button
            id="save-time-btn"
            variant="primary"
            className="ms-auto"
            onClick={handleClick}
          >
            Submit Entry
          </Button>
          {userProfile.TimeZone.Id}
          {/* </Link> */}
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfile;
