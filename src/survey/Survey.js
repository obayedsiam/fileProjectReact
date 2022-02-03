import React from "react";
import SurveyMapPopup from "./SurveyMapPopup";

class SurveyModel {
	/**
	 * Model properties
	 */
	constructor() {
		this.instituteName = "";
		this.geoId = "";
		this.instituteNameBn = "";
		this.eiinNo = "";
		this.address = "";
		this.telephone = "";
		this.mobile = "";
		this.mobileAlternate = "";
		this.fax = "";
		this.email = "";
		this.webSite = "";
		this.establishmentDate = "";
		this.currentApplicationStatus = "";
		this.instituteTypeName = "";
		this.instituteTypeNameBn = "";
		this.instituteForWhom = "";
		this.instituteFormWhomBn = "";
		this.divisionName = "";
		this.divisionNameBn = "";
		this.districtName = "";
		this.districtNameBn = "";
		this.thanaName = "";
		this.thanaNameBn = "";
		this.unionName = "";
		this.unionNameBn = "";
		this.mouzaName = "";
		this.mouzaNameBn = "";
		this.postOfficeName = "";
		this.postOfficeNameBn = "";
		this.managementName = "";
		this.managementNameBn = "";
		this.constituencyName = "";
		this.constituencyNameBn = "";
		this.educationLevelName = "";
		this.educationLevelNameBn = "";
		this.regionName = "";
		this.regionNameBn = "";
		this.areaStatusName = "";
		this.areaStatusNameBn = "";
		this.geographicalPositionName = "";
		this.geographicalPositionNameBn = "";
		this.latitude = "";
		this.longitude = "";
		this.geoReviewStatus = "";
		this.recordStatus = "";
		this.isReviewOngoing = "";
		this.geoEncloserUrl = "";
		this.active = false;
	}

	/**
	 * Get model instance from json
	 */
	fromJson(data = {}) {
		let obj = new SurveyModel();
		if (data.id !== undefined && data.id) {
			obj.id = data.id;
		}
		obj.instituteName = data.instituteName;
		obj.instituteNameBn = data.instituteNameBn;
		obj.eiinNo = data.eiinNo;
		obj.address = data.address;
		obj.telephone = data.telephone;
		obj.mobile = data.mobile;
		obj.mobileAlternate = data.mobileAlternate;
		obj.fax = data.fax;
		obj.email = data.email;
		obj.webSite = data.webSite;
		obj.establishmentDate = data.establishmentDate;
		obj.currentApplicationStatus = data.currentApplicationStatus;
		obj.instituteTypeName = data.instituteTypeName;
		obj.instituteTypeNameBn = data.instituteTypeNameBn;
		obj.instituteForWhom = data.instituteForWhom;
		obj.instituteFormWhomBn = data.instituteFormWhomBn;
		obj.divisionName = data.divisionName;
		obj.divisionNameBn = data.divisionNameBn;
		obj.districtName = data.districtName;
		obj.districtNameBn = data.districtNameBn;
		obj.thanaName = data.thanaName;
		obj.thanaNameBn = data.thanaNameBn;
		obj.unionName = data.unionName;
		obj.unionNameBn = data.unionNameBn;
		obj.mouzaName = data.mouzaName;
		obj.mouzaNameBn = data.mouzaNameBn;
		obj.postOfficeName = data.postOfficeName;
		obj.postOfficeNameBn = data.postOfficeNameBn;
		obj.managementName = data.managementName;
		obj.managementNameBn = data.managementNameBn;
		obj.constituencyName = data.constituencyName;
		obj.constituencyNameBn = data.constituencyNameBn;
		obj.educationLevelName = data.educationLevelName;
		obj.educationLevelNameBn = data.educationLevelNameBn;
		obj.regionName = data.regionName;
		obj.regionNameBn = data.regionNameBn;
		obj.areaStatusName = data.areaStatusName;
		obj.areaStatusNameBn = data.areaStatusNameBn;
		obj.geographicalPositionName = data.geographicalPositionName;
		obj.geographicalPositionNameBn = data.geographicalPositionNameBn;
		obj.latitude = this.convertToGeoPoint(data.latitude);
		obj.longitude = this.convertToGeoPoint(data.longitude);
		obj.geoLocationLat = this.convertToGeoPoint(data.geoLocationLat);
		obj.geoLocationLong = this.convertToGeoPoint(data.geoLocationLong);
		obj.geoReviewStatus = data.geoReviewStatus;
		obj.recordStatus = data.recordStatus;
		obj.isReviewOngoing = data.isReviewOngoing;
		obj.geoEncloserUrl = data.geoEncloserUrl;
		obj.geoId = data.geoId;
		return obj;
	}

	/**
	 * Make collection from json response
	 */
	collection(data = {}) {
		return data.map((item) => new SurveyModel().fromJson(item));
	}

	/**
	 * Get model instance from json
	 */
	forMap(data = {}) {
		let obj = {};
		obj.latitude = this.convertToGeoPoint(data.geoLocationLat);
		obj.longitude = this.convertToGeoPoint(data.geoLocationLong);
		obj.popup = <SurveyMapPopup data={data}/>;
		return obj;
	}

	/**
	 * Make collection from json response
	 */
	collectionForMap(data = {}) {
		let item = data.map((item) => new SurveyModel().forMap(item)).filter((item) => (item.latitude && item.longitude));
		return item;
	}
	
	convertToGeoPoint(value) {
		let convertedValue = parseFloat(value);
		return isNaN(convertedValue) ? '' : convertedValue;
	}

}

export const Survey = new SurveyModel();