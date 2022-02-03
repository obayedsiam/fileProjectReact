import * as React from "react";
import { Survey } from "./Survey";
import { useSelector } from "react-redux";
import { selectApi } from "../../../reducers/apiSlice";
import BasicMap from "../../../components/map/BasicMap";

const SurveyMap = ({ highlightPoint, showHighLight }) => {
  const { surveyList = { data: {} } } = useSelector(selectApi);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <BasicMap
            data={
              surveyList.data.length > 0
                ? Survey.collectionForMap(surveyList.data)
                : {}
            }
            highlightPoint={highlightPoint}
            showHighLight={showHighLight}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(SurveyMap);
