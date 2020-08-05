// const escapeStringRegexp = require("escape-string-regexp")
const gql = require('graphql-tag');

// const pagePath = `shop`
const indexName = `Pages`;

const pageQuery = `{
  publicEndpoint {
    itemsOnline(paginate: {limit: 1000}) {
      ... on publicEndpoint_ItemOnline {
        _id
        descripcionVenta
        precioVenta
        marca
        talla
        categoria
        imagenes {
          secureUrl
        }
      }
    }
  }
}`;

function pageToAlgoliaRecord({ _id, ...rest }) {
  return {
    objectID: _id,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.publicEndpoint.itemsOnline.map(pageToAlgoliaRecord),
    indexName,
    settings: {
      searchableAttributes: [
        'categoria', 'marca', 'descripcionVenta',
      ],
      attributesForFaceting: [
        'categoria', 'searchable(marca)', 'precioVenta', 'talla',
      ],
      attributesToSnippet: ['descripcionVenta:20'],
      replicas: [
        'precioVenta_asc',
        'precioVenta_desc',
      ],
    },
  },
];

module.exports = queries;
