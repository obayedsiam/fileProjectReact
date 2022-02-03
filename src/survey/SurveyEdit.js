import * as React from "react";
import {Form, Formik} from "formik/dist/index";
import {Button, Col, Row} from "@themesberg/react-bootstrap";
import {InputField} from "../../../components/form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-regular-svg-icons";
import {faUndo} from "@fortawesome/free-solid-svg-icons";

const SurveyEdit = ({latitude = 0, longitude = 0, onFormSubmit}) => {

	return (
		<Formik
			initialValues={{
				latitude: latitude,
				longitude: longitude
			}}
			onSubmit={(values, {resetForm}) => {

				onFormSubmit(values);

				// reset form
				// resetForm();
			}}
		>
			{({values, setFieldValue, handleSubmit}) => {
				return (
					<Form className="p-5">
						<Row>
							<Col md={12} className='mb-10'>
								<InputField
									label="Latitude"
									name="latitude"
									type="text"
									placeholder="Enter Latitude"
								/>
							</Col>
							<Col md={12} className='mb-10'>
								<InputField
									label="Longitude"
									name="longitude"
									type="text"
									placeholder="Enter Longitude"
								/>
							</Col>
							<Col md={12} className="mb-10 mt-10">
								<Button
									variant='success'
									className='f-right btn-sm'
									type='submit'
								>
									<FontAwesomeIcon icon={faSave} className='me-2'/> Submit
								</Button>
								<Button
									variant='danger'
									className='f-right mr-10 btn-sm'
									type='reset'
								>
									<FontAwesomeIcon icon={faUndo} className='me-2'/> Reset
								</Button>
							</Col>
						</Row>
					</Form>
				);
			}}
		</Formik>
	);

};

export default SurveyEdit;
