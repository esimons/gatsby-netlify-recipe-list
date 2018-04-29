import React from 'react'
import PropTypes from 'prop-types'
import { RecipeTemplate } from "../../templates/recipe-page";

const RecipePreview = ({ entry, widgetFor }) => (
  <RecipeTemplate
    title={entry.getIn(["data", "title"])}
    description={entry.getIn(["data", "description"])}
    ingredients={entry.getIn(["data", "ingredients"])}
    directions={entry.getIn(["data", "body"])}
    dates={entry.getIn(["data", "dates"])}
    tags={entry.getIn(["data", "tags"])}
  />
);

RecipePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
};

export default RecipePreview;
