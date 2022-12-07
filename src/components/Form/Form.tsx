import { useDispatch, useSelector } from "react-redux";
import { addCandidate } from "../Store/operations";
import { CandidateData, selectCandidateData } from "../Store/dataSlice";
import { nanoid } from "@reduxjs/toolkit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

export default function CandidateForm() {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch<any>();
  const candidates = useSelector(selectCandidateData);

  function handleSubmit(e: any) {
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const feedback = form.elements.feedback.value;
    const grade = form.elements.grade.value;
    const passed = form.elements.passed.value;

    e.preventDefault();

    form.reset();

    const newCandidate: CandidateData = {
      id: nanoid(),
      name: name,
      email: email,
      feedback: feedback,
      grade: Number(grade),
      passed: passed,
      createdAt: new Date().toISOString(),
    };

    dispatch(addCandidate(newCandidate));
  }

  // Open form
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="light"
        className="formManagerBtn"
      >
        {open ? (
          <div className="formManagerBtn_content">
            <p className="formManagerBtn_content__text">Hide the form</p>
            <i className="bi bi-chevron-up"></i>
          </div>
        ) : (
          <div className="formManagerBtn_content">
            <p className="formManagerBtn_content__text">Add new candidates</p>
            <i className="bi bi-chevron-down"></i>
          </div>
        )}
      </Button>
      {!open && candidates.length === 0 && (
        <p className="info-text">
          This is a table for keeping information on the results of technical
          assessment of candidates for the trainee frontend developer
          posisition. Start editing the table by clicking on the button "Add new
          candidates".
        </p>
      )}
      <Collapse in={open}>
        <Form onSubmit={handleSubmit} className="form mt-4">
          <div className="form-group">
            <Form.Group as={Col} className="me-2 mb-3">
              <Form.Label>Candidate's name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} className="ms-2 mb-3">
              <Form.Label>Candidate's email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              ></Form.Control>
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Feedback on technical task</Form.Label>
            <Form.Control
              as="textarea"
              name="feedback"
              rows={4}
              style={{ height: "120px", resize: "none" }}
              placeholder="Provide your feedback"
              required
            ></Form.Control>
          </Form.Group>
          <div className="form-group">
            <Form.Group as={Col} className="me-2 mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                name="grade"
                type="number"
                min="0"
                max="20"
                placeholder="min 0 - max 20"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="ms-2 mb-3">
              <Form.Label>
                Is the candidate recommended for the HR Interview?
              </Form.Label>
              <Row>
                <Col xs={2}>
                  <Form.Check
                    type="radio"
                    name="passed"
                    label="Yes"
                    value="yes"
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Check
                    type="radio"
                    name="passed"
                    label="No"
                    value="no"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
          </div>
          <Button type="submit" className="w-50 submitBtn">
            Submit
          </Button>
        </Form>
      </Collapse>
    </>
  );
}
