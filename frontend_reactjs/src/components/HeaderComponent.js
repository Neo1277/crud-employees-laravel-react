import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

function HeaderComponent(props) {
  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">Home</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default HeaderComponent;