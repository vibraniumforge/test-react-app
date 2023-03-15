import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarRBS() {
  return (
    <>
      <Navbar
        // fixed="top"
        expand="xl"
        bg="primary"
        variant="dark"
        className="justify-content-start"
      >
        <Container>
          <Navbar.Brand href="/">ISE Time Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">TimeEntry</Nav.Link>
            <Nav.Link href="/ManageActivities">Manage Activities</Nav.Link>
            <Nav.Link href="/UserProfile">User Profile</Nav.Link>
          </Nav>
          <Navbar.Text className="me-5">ISCRMDEV</Navbar.Text>{" "}
          <Navbar.Text className="justify-content-end">
            last published: 10:00 AM 3/15/2023
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarRBS;
