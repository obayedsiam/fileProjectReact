import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi, setState } from "../../../reducers/apiSlice";
import { setMapFilter } from "../../../reducers/filterSlice";
import { Button, Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "../../../components/card";
import ProgressBar from "react-topbar-progress-indicator";
import ViewType from "../../../constants/ViewType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import SurveyFilter from "./SurveyFilter";
import SurveyList from "./SurveyList";
import SideModal from "../../../components/modal/side/SideModal";
import SurveyMap from "./SurveyMap";
import SurveyDetail from "./SurveyDetail";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { Survey } from "./Survey";

const SurveyPage = ( props ) =>
{

	const dispatch = useDispatch();

	const [ viewType, setViewType ] = useState( null );

	const [ showSideModal, setShowSideModal ] = useState( false );
	const [ highlightPoint, setHightlightPoint ] = useState( false );
	const [ showHighLight, setshowHighLight ] = useState( false );
	const { loading } = useSelector( selectApi );

	const cardProps = {
		title: "Survey List",
		headerSlot: () => (
			<>
				{ viewType == ViewType.DATA ? (
					<Button
						variant='success' className='f-right btn-sm p-5 mr-10'
						onClick={ () => setViewType( null ) }
					>
						<FontAwesomeIcon icon={ faSearch } className='me-2' />
						Show Filters
					</Button>
				) : (
					<Button
						variant='success' className='f-right btn-sm p-5 mr-10'
						onClick={ () => setViewType( ViewType.DATA ) }
					>
						<FontAwesomeIcon icon={ faList } className='me-2' />
						Data View
					</Button>
				) }
			</>
		),
	};

	/*	useEffect(() => {

		}, [dispatch, viewType]);*/

	return (
		<>
			<div className="row">
				{ loading && <ProgressBar /> }
				<div className="col-md-12">
					<DefaultCard { ...cardProps }>
						<Card border='white' className='table-wrapper'>
							<Card.Body>
								<div className="row">
									<div className="col-xl-9 col-lg-7 col-md-12">
										<SurveyMap highlightPoint={ highlightPoint } showHighLight={ showHighLight } />
									</div>
									<div className="col-xl-3 col-lg-5 col-md-12 overflow_class">
										{ viewType === ViewType.DATA ? (
											<SurveyList
												onClickBack={ () => setViewType( null ) }
												onClickItem={ ( data ) =>
												{
													setShowSideModal( true );
													dispatch(
														setState( {
															output: "surveyDetail",
															storeName: "surveyDetail",
															data: data,
														} )
													);
													let mapPoint = Survey.forMap( data );
													if ( mapPoint.latitude && mapPoint.longitude )
													{
														setHightlightPoint( {
															latitude: mapPoint.latitude,
															longitude: mapPoint.longitude,
														} );
														setshowHighLight( true );
													}
												} }
											/>
										) : (
											<SurveyFilter
												onFilterSubmit={ ( values ) =>
												{
													let surveyQueryString = new URLSearchParams( values ).toString();
													dispatch( setMapFilter(
														{ ...values }
													) );
													dispatch(
														setState( {
															output: "surveyQueryString",
															storeName: "surveyQueryString",
															data: surveyQueryString
														} )
													);
													dispatch(
														callApi( {
															operationId: UrlBuilder.gisApi( `institute/list?${ surveyQueryString }` ),
															output: "surveyList",
															storeName: "surveyList",
														} )
													);
													// alert(JSON.stringify(values));
													setViewType( ViewType.DATA );
												} }
											/>
										) }
									</div>
								</div>
							</Card.Body>
						</Card>
					</DefaultCard>
				</div>
			</div>
			<SideModal
				show={ showSideModal }
				width={ showSideModal ? '25%' : '0%' }
				onClose={ () => setShowSideModal( false ) }
			>
				<SurveyDetail />
			</SideModal>
		</>
	);
};

export default SurveyPage;
