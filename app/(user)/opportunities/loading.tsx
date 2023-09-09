import { Col, Container, Row, Spinner } from "@/utils/bootstrap";

export default function Loading(): React.ReactElement {
    return (
        <Container>
            <Row>
                <Col>
                    <Spinner />
                </Col>
            </Row>
        </Container>
    )
}