import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Content, { HTMLContent } from "../components/Content";

export const RecipeTemplate = ({
  title,
  description,
  ingredients,
  directions,
  dates,
  tags
}) => (
  <section className="section">
    <Helmet title={title} />
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <p>{description}</p>
          {ingredients && ingredients.length && 
            <div>
              <h2>Ingredients</h2>
              <ul>
                {ingredients.map(({ingredient, amount}) =>
                  (<li key={ingredient}>{ingredient} - {amount}</li>)
                )}
              </ul>
            </div>
          }
          <div>
            <h2>Directions</h2>
            <HTMLContent content={directions} />
          </div>
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h4>Tags</h4>
              <ul className="taglist">
                {tags.map(tag => (
                  <li key={tag}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {dates && dates.length && 
            <div>
              <h4>Weeks you've had this</h4>
              <ul>
                {dates.map(date => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  </section>
);

RecipeTemplate.propTypes = {
  directions: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
};

const Recipe = ({ data }) => {
  const { markdownRemark: recipe } = data;

  return (
    <RecipeTemplate
      title={recipe.frontmatter.title}
      description={recipe.frontmatter.description}
      ingredients={recipe.frontmatter.ingredients}
      directions={recipe.html}
      dates={recipe.frontmatter.dates}
      tags={recipe.frontmatter.tags}
    />
  );
};

Recipe.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Recipe;

export const pageQuery = graphql`
  query RecipeByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        dates(formatString: "MMMM DD, YYYY")
        title
        description
        ingredients {
            ingredient
            amount
        }
        tags
      }
    }
  }
`;
