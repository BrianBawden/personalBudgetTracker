require('dotenv').config();
const isLocalHost = false;
/* eslint-disable node/no-unpublished-require */
const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line no-console
console.log(`Is localhost (swagger.js): ${isLocalHost}`);

const HOSTING = isLocalHost
  ? `localhost:${PORT}`
  : 'cs341-2024-winter-budget-app-swagger.onrender.com';
const SCHEMES = isLocalHost ? ['http', 'https'] : ['https', 'http'];

const docsDefinition = {
  info: {
    title: 'Budget API',
    version: '1.0.0',
    description: 'Budget REST API.'
  },
  contact: {
    name: 'Team',
    email: 'team@team.com'
  },
  license: {
    name: 'Your License',
    url: 'https://en.wikipedia.org/wiki/MIT_License'
  },
  host: HOSTING,
  schemes: SCHEMES,
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header'
    }
  },
  tags: [
    {
      name: 'Budget App',
      description: 'Endpoints related to managing budget app related data.'
    }
  ],
  externalDocs: {
    description: 'CSE 341 Final Team Project',
    url: 'https://cse341.netlify.app/projects/3'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  // MODEL DEFINITIOS
  // Examples, visible in the API documentation.
  definitions: {
    User: {
      _id: {
        $oid: '65ec8e6fe10537f1319886ed'
      },
      username: 'otavener0',
      passwordHash: '$2a$04$.s1zkVL1jWT0jULmr1VUVuRxHA0uLT4xSxuqNcoyiyyrIvheYYiTO',
      firstName: 'Oran',
      lastName: 'Tavener',
      gender: 'Male',
      address: '99 Autumn Leaf Alley',
      location: 'Kenya',
      email: 'otavener0@boston.com',
      phoneNumber: '+254 (950) 890-0098',
      registrationDate: {
        $date: '2010-09-12T23:15:01.000Z'
      },
      profilePicture:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKySURBVDjLjZNbSNNRHMcXuoceFHrzpQdfsjd9FOzBMimIkWUKYT5Y5gVT0ES7EIqSWq2XZROJIHTd9hBDWKhbMJssbU1D527t4q4Onbvo7pv7ds6hiemLB76c3/nx+37O75z//3AAcA5KpVKVKRSKUZlMtiSVSrckEklALBYbRSLR2PvJsfLD9fuBWq3OI2YhMScdDgf8fj92dnYQiUQQCoWg1+sw9vppalw4ODkqGMn/D/DPPG2xWJDJZBCLxUAhdrsdPp8P6XQamXQUqagRCvkHvHjWqxwZfpK/D6A7U3MymQQdqVQKdG02mxEMBhk0EfUgHtZhL/4Hs1/fYaCvfZIBiLmUtL0XDoeZYXd3l0HcbjcMBgNoPp1OIRIyIBHWsy6SRF2dLXvd99vKOMQsdDqdoDIajcxEz0xBGxsbLE7EQwSgJUYHibdJhwkolUo0NzcLOSUlJTiu6N1QcCAQgNVqRUNDw28G0Gq1MJlMmJ+fx8TEBCums8vlYvlsjl6szWbD+vo6vF4v6urqfAxAi7ImCqGiuWw+O6vWbFjUmpkMdg+uVdduHwFQZc0HAT0VZ6GoL4K8govZ2tOY4Xfj8tUbuiNHyILonD3CVF8jNJ2liElfIqObRuRTF37eK8bwpTOqY13ix/MnESVmCHhA7ylgqBBbz8shvch1sx9JIBAI5+bm4A2ST+legc6+jFXrLyybFqExqFjbGc0XHByBvgLIL+RmGIDP5+cNDg3IP0+JYN3UMwgFLJkWoDH+gKymAOG3dwBiivdw4Ceyt+RgpjLHtf+Y+vv78x487nnT2tGUksyIsbD6nUFWLGooBW1YuFsET28hNh9yYWk8gW+83PR0Zc4jzuHn2dHRfq6ptXG8/vYtbc3N6/6qap6fV3VF+6q6eFFayfXQtsnOTmqm9X8BjufboeKd+1kAAAAASUVORK5CYII='
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, docsDefinition);

// OPTIONALLY
// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });

/* READINGS */
/**
 * Swagger 2.0 - https://www.npmjs.com/package/swagger-autogen/v/2.13.1#swagger-20
 * OAuth 2.0 configuration - https://swagger.io/docs/open-source-tools/swagger-ui/usage/oauth2/
 * https://swagger.io/docs/open-source-tools/swagger-ui/usage/oauth2/
 */
