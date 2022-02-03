import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSearch} from "@fortawesome/free-solid-svg-icons";
import DefaultModal from "../../../components/modal/default/DefaultModal";
import SurveyFilter from "./SurveyFilter";
import {callApi, selectApi} from "../../../reducers/apiSlice";
import {Survey} from "./Survey";
import {UrlBuilder} from "../../../helpers/UrlBuilder";

const SurveyList = ({onClickItem, onClickBack, ...props}) => {

	const history = useHistory();

	const dispatch = useDispatch();

	const [showDefaultModal, setShowDefaultModal] = useState(false);

	const {
		loading,
		surveyList = {data: {}, meta: {}},
		surveyQueryString = ''
	} = useSelector(selectApi);

	return (
		<>
			<div className="row">
				<div className="col-md-12 mb-15">
					<Button
						variant='primary'
						className='m-0 btn-sm'
						type='reset'
						onClick={() => onClickBack()}
					>
						<FontAwesomeIcon icon={faArrowLeft} className='m-0 p-0'/>
					</Button>
					<span className="mx-2 font-weight-bold">
						{surveyList.meta.total ?? 0} results found
					</span>
					<Button
						variant='light'
						className='m-0 btn-sm f-right'
						type='reset'
						onClick={() => setShowDefaultModal(true)}
					>
						<FontAwesomeIcon icon={faSearch} className='m-0 p-0'/> Show Filter
					</Button>
				</div>
				<div className="col-md-12">
					{surveyList.data.length > 0 && Survey.collection(surveyList.data).map((survey, surveyIndex) => (
						<div key={surveyIndex} className="map-list-item1 card mb-15 " onClick={() => onClickItem(survey)}>
							<div className="card-body">
								<div className="map-list-item1-image-wrapper">
									<img src={survey.geoEncloserUrl ? UrlBuilder.gisFtpUrl(survey.geoEncloserUrl) : "/images/map_preview.png"}/>
								</div>
								<p className="map-list-item1-title m-0 p-0">{survey.instituteName}</p>
								<p className="map-list-item1-subtitle m-0 p-0 mt-3">
									<small>EIIN: {survey.eiinNo || 'N/A'}</small>
								</p>
								<p className="map-list-item1-subtitle m-0 p-0 mt-3">
									<small>Lat: {survey.geoLocationLat || 'N/A'}, Long: {survey.geoLocationLong || 'N/A'}</small>
								</p>
								<p className="map-list-item1-subtitle m-0 p-0 mt-3">
									<small>Mobile: {survey.mobile || 'N/A'}, Email: {survey.email || 'N/A'}</small>
								</p>
								<p className="map-list-item1-subtitle m-0 p-0 mt-3">
									<small>Review: {survey.reviewStatus || 'N/A'}</small>
								</p>
							</div>
						</div>
					))}
					<button type="button" className="btn btn-light btn-block btn-sm" onClick={() => {
						dispatch(
							callApi({
								operationId: UrlBuilder.gisApi(`institute/list?page=${surveyList.meta.nextPage}&${surveyQueryString}`),
								output: "surveyList",
								storeName: "surveyList",
							})
						);
					}}>
						Load More
					</button>
				</div>
			</div>
			<DefaultModal
				show={showDefaultModal}
				title="Shortest Path Filter"
				onClose={() => setShowDefaultModal(false)}
			>
				<SurveyFilter
					onFilterSubmit={(values) => {
						dispatch(
							callApi({
								operationId: UrlBuilder.gisApi(`institute/list?${new URLSearchParams(values).toString()}`),
								output: "surveyList",
								storeName: "surveyList"
							})
						);
						setShowDefaultModal(false);
					}}
				/>
			</DefaultModal>
		</>
	);

};

export default SurveyList;
