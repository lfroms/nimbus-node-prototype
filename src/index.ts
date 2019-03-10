import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './schema';
import { EnvironmentCanadaAPI } from './data_sources';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => {
    return {
      environmentCanadaAPI: new EnvironmentCanadaAPI()
    };
  }
});

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
