import { Container } from "react-bootstrap";

function Footer(){
    const date = new Date ();

    return (
        <Container>
        <footer className="d-flex justify-content-between">
   <p>Copyright &copy; {date.getFullYear()} </p>
    <p>Dev & Design By Kandyce Mbua</p>

        </footer>
        </Container>
    )
}

export default Footer;