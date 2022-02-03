import * as React from "react";
import { useState } from "react";
import { Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { useEffect } from "react";
import { InputField, InputSelectApi } from "../../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import ViewType from "../../../constants/ViewType";
import { callApi, selectApi } from "../../../reducers/apiSlice";

const SurveyFilter = ({ onFilterSubmit }) => {
  const [showMoreOption, setShowMoreOption] = useState(false);
  const [status, setStatus] = useState(true);

  return (
    <Formik
      initialValues={{
        divisionName: "",
        districtName: "",
        thanaName: "",
        instituteType: "",
        instituteName: "",
        eiinNo: "",
        trackingNo: "",
        latitude: "",
        longitude: "",
        reviewStatusId: "",
        viewType: ViewType.DATA,
      }}
      onSubmit={(values, { resetForm }) => {
        onFilterSubmit(values);

        // reset form
        // resetForm();
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => {
        const dispatch = useDispatch();

        useEffect = () => {
          dispatch(
            setState( {
              UrlBuilder.commonApi(
                operationId= { `district/list?divisionId=${values.divisionId}}`
              )
              output: "surveyQueryString",
              storeName: "surveyQueryString",
              data: surveyQueryString
            } )
          );
        };

        return (
          <Form className="p-5">
            <Row>
              <Col md={12} className="mb-20">
                <InputSelectApi
                  label="Division"
                  name="divisionName"
                  operationId={UrlBuilder.commonApi("division/all")}
                  storeName="division"
                  value="id"
                  text="divisionName"
                  onChange={(e) => setFieldValue("divisionId", e.target.value)}
                />
              </Col>

              <Col md={12} className="mb-20">
                <InputSelectApi
                  label="District"
                  name="districtName"
                  operationId={
                    values.divisionId
                      ? UrlBuilder.commonApi(
                          `district/list?divisionId=${values.divisionId}`
                        )
                      : ""
                  }
                  storeName="district"
                  value="districtName"
                  text="districtName"
                  onChange={(e) =>
                    setFieldValue("districtName", e.target.value)
                  }
                />
              </Col>

              <Col md={12} className="mb-20">
                <InputSelectApi
                  label="Thana"
                  name="thanaName"
                  operationId={
                    values.districtId
                      ? UrlBuilder.commonApi(
                          `thana/list?districtName=${values.districtName}`
                        )
                      : ""
                  }
                  storeName="thana"
                  value="thanaName"
                  text="thanaName"
                  onChange={(e) => setFieldValue("thanaName", e.target.value)}
                />
              </Col>

              {/* <Col md={12} className="mb-10">
                <InputSelectApi
                  label="Division"
                  name="divisionName"
                  operationId={UrlBuilder.commonApi("division/all")}
                  //   onChange={() => {
                  //     console.log(values);
                  //   }}
                  storeName="division"
                  value="divisionName"
                  text="divisionName"
                  onChange={onChangeDivision}
                />
              </Col>

              <Col md={12} className="mb-10">
                <InputSelectApi
                  label="District"
                  name="districtName"
                  //	operationId={ UrlBuilder.commonApi( "district/all" ) }
                  operationId={UrlBuilder.commonApi(
                    `district/list?divisionId=${divisionId}&page=1&size=10`
                  )}
                  storeName="district"
                  value="districtName"
                  text="districtName"
                />
              </Col>
              <Col md={12} className="mb-10">
                <InputSelectApi
                  label="Thana"
                  name="thanaName"
                  operationId={UrlBuilder.commonApi("thana/all")}
                  storeName="thana"
                  value="thanaName"
                  text="thanaName"
                />
              </Col> */}

              <Col md={12} className="mb-10">
                <InputSelectApi
                  label="Institute Type"
                  name="instituteTypeId"
                  operationId={UrlBuilder.commonApi("institute-type/all")}
                  storeName="instituteType"
                  value="id"
                  text="instituteTypeName"
                />
              </Col>
              {showMoreOption ? (
                <>
                  <Col md={12} className="mb-10">
                    <InputField
                      label="Institute Name"
                      name="instituteName"
                      type="text"
                      placeholder="Enter Institute Name"
                    />
                  </Col>
                  <Col md={12} className="mb-10">
                    <InputField
                      label="EIIN No"
                      name="eiinNo"
                      type="text"
                      placeholder="Enter EIIN No"
                    />
                  </Col>
                  <Col md={12} className="mb-10">
                    <InputField
                      label="Tracking No"
                      name="trackingNo"
                      type="text"
                      placeholder="Enter Tracking No"
                    />
                  </Col>
                  <Col md={12} className="mb-10">
                    <InputField
                      label="Latitude"
                      name="latitude"
                      type="text"
                      placeholder="Enter Lattitude"
                    />
                  </Col>
                  <Col md={12} className="mb-10">
                    <InputField
                      label="Longitude"
                      name="longitude"
                      type="text"
                      placeholder="Enter Longitude"
                    />
                  </Col>
                  <Col md={12} className="m-0 p-5">
                    <Button
                      variant="light"
                      className="f-left ml-5 btn-xs"
                      type="button"
                      onClick={() => {
                        setShowMoreOption(false);
                      }}
                    >
                      Less Options
                    </Button>
                  </Col>
                </>
              ) : (
                <Col md={12} className="m-0 p-5">
                  <Button
                    variant="light"
                    className="f-left ml-5 btn-xs"
                    type="button"
                    onClick={() => {
                      setShowMoreOption(true);
                    }}
                  >
                    More Options
                  </Button>
                </Col>
              )}
              <Col md={12} className="mb-20">
                <InputSelectApi
                  label="Review Status"
                  name="reviewStatusId"
                  operationId={UrlBuilder.commonApi("institute-type/all")}
                  storeName="reviewStatus"
                  value="id"
                  text="reviewStatusName"
                />
              </Col>
              <Col md={12} className="mb-10">
                <Button
                  variant="success"
                  className="f-right ml-5"
                  type="button"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Find Location
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SurveyFilter;
