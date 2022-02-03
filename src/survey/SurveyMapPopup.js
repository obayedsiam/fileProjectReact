import * as React from "react";
import {UrlBuilder} from "../../../helpers/UrlBuilder";

const SurveyMapPopup = ({data}) => {
	return (
		<>
			{/*<p className="m-0 mt-5 font-size-15">Institute Name{data.instituteName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Email: {data.email || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Mobile: {data.mobile || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Address: {data.address || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Latitude: {data.geoLocationLat || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Longitude: {data.geoLocationLong || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Division: {data.divisionName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">District: {data.districtName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Thana: {data.thanaName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Union: {data.unionName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Mouza: {data.mouzaName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Post Office: {data.postOfficeName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Management: {data.managementName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Constituency: {data.constituencyName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Education Level: {data.educationLevelName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Region: {data.regionName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Area Status: {data.areaStatusName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Geographical Position: {data.geographicalPositionName || 'N/A'}</p>
			<p className="m-0 mt-5 font-size-15">Review Status: {data.geoReviewStatus || 'N/A'}</p>*/}
			<div className="row">
				<div className="col-md-12" style={{width: '500px'}}>
					<img src={data.geoEncloserUrl ? UrlBuilder.gisFtpUrl(data.geoEncloserUrl) : "/images/map_preview.png"} className="w-100"/>
				</div>
				<div className="col-md-12">
					<p className="m-0 mt-5 font-size-16"><b>{data.instituteName || 'N/A'}</b></p>
					<p className="m-0 font-size-13"><b>EIIN:</b> {data.eiinNo || 'N/A'}</p>
					<p className="m-0 font-size-13"><b>{data.geoLocationLat || 'N/A'}, {data.geoLocationLong || 'N/A'}</b></p>
					<p className="m-0 font-size-13"><b>Email:</b> {data.email || 'N/A'}, <b>Mobile:</b> {data.mobile || 'N/A'}</p>
					<p className="m-0 font-size-13"><b>Address:</b> {data.address || 'N/A'}, {data.districtName || 'N/A'}, {data.divisionName || 'N/A'}</p>
				</div>
			</div>
		</>
	);
};

export default SurveyMapPopup;
