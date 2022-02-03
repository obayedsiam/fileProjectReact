import * as React from "react";
import { useState } from "react";
import { Button } from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import DefaultModal from "../../../components/modal/default/DefaultModal";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import SurveyEdit from "./SurveyEdit";
import ReviewForm from "../_partials/review_form/ReviewForm";
import ReviewStatus from "../../../constants/ReviewStatus";

const SurveyDetail = () =>
{

	const dispatch = useDispatch();

	const { surveyDetail = {} } = useSelector( selectApi );

	const [ showEditModal, setShowEditModal ] = useState( false );
	const [ showConfirmModal, setShowConfirmModal ] = useState( false );
	const [ reviewTypes ] = useState( [
		{
			id: 1,
			name: 'Approved',
			value: 'APPROVED',
		},
		{
			id: 2,
			name: 'Not Approved',
			value: 'NOT_APPROVED',
		}
	] );

	return (
		<>
			{/* {console.log(surveyDetail)} */ }
			{ surveyDetail != undefined ? (
				<div className="row">
					<div className="col-md-12 mb-10">
						<img className="w-100"
							src={ surveyDetail.geoEncloserUrl ? UrlBuilder.gisFtpUrl( surveyDetail.geoEncloserUrl ) : "/images/map_preview.png" } />
						<h4 className="mt-10 font-size-20">{ surveyDetail.instituteName }</h4>
						<p className="m-0 mt-5 font-size-15">Email: { surveyDetail.email }</p>
						<p className="m-0 mt-5 font-size-15">Mobile: { surveyDetail.mobile }</p>
						<p className="m-0 mt-5 font-size-15">Address: { surveyDetail.address }</p>
						<p className="m-0 mt-5 font-size-15">Latitude: { surveyDetail.latitude || 'N/A' },
							Longitude: { surveyDetail.longitude || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Division: { surveyDetail.divisionName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">District: { surveyDetail.districtName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Thana: { surveyDetail.thanaName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Union: { surveyDetail.unionName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Mouza: { surveyDetail.mouzaName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Post Office: { surveyDetail.postOfficeName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Management: { surveyDetail.managementName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Constituency: { surveyDetail.constituencyName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Education Level: { surveyDetail.educationLevelName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Region: { surveyDetail.regionName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Area Status: { surveyDetail.areaStatusName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Geographical
							Position: { surveyDetail.geographicalPositionName || 'N/A' }</p>
						<p className="m-0 mt-5 font-size-15">Review Status: { surveyDetail.geoReviewStatus || 'N/A' }</p>
					</div>
					<div className="col-md-12">
						<Button
							variant="primary"
							className="f-left"
							type="button"
							onClick={ () => setShowEditModal( true ) }
						>
							Edit
						</Button>
						{ surveyDetail.geoReviewStatus == ReviewStatus.UNDER_REVIEW && (
							<Button
								variant="success"
								className="f-left ml-10"
								type="button"
								onClick={ () =>
								{
									setShowConfirmModal( true );
								} }
							>
								Review
							</Button>
						) }
					</div>
				</div>
			) : '' }
			<DefaultModal
				show={ showEditModal }
				title="Edit Modal"
				onClose={ () => setShowEditModal( false ) }
			>
				<SurveyEdit
					latitude={ surveyDetail.latitude || 0 }
					longitude={ surveyDetail.longitude || 0 }
					onFormSubmit={ ( value ) =>
					{

						let requestBody = {
							"id": surveyDetail.geoId,
							"geoLocationLat": value.latitude,
							"geoLocationLong": value.longitude
						};

						let body = new FormData();
						body.append( "requestBody", JSON.stringify( requestBody ) );

						dispatch(
							callApi( {
								operationId: UrlBuilder.gisApi( "geo-location/update" ),
								output: "surveyEditData",
								storeName: "surveyEditData",
								parameters: {
									method: "PUT",
									body: body,
									hasFile: true,
								},
							} )
						);

						setShowEditModal( false );

					} }
				/>
			</DefaultModal>
			<DefaultModal
				show={ showConfirmModal }
				title="Review Survey"
				onClose={ () => setShowConfirmModal( false ) }
			>
				<div className="row">
					<div className="col-md-12">
						<ReviewForm
							reviewTypes={ reviewTypes }
							onReviewSubmit={ ( values ) =>
							{

								let body = {
									note: values.reviewNote,
									reasonForRejectionId: values.reasonForRejectionId
								};

								dispatch(
									callApi( {
										operationId: UrlBuilder.gisApi( `geo-location/review/${ surveyDetail.geoId }/${ values.reviewType }` ),
										output: "surveyReview",
										storeName: "surveyReview",
										parameters: {
											method: "PUT",
											body: JSON.stringify( body ),
										},
									} )
								);

								setShowConfirmModal( false );

							} }
						/>
					</div>
				</div>
			</DefaultModal>
		</>
	);

};

export default SurveyDetail;
