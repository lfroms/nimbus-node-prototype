import { ApolloServer } from 'apollo-server';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import resolvers from './resolvers';
import typeDefs from './schema';
import { EnvironmentCanadaDatamart, CanadianMeteorologicalServicesDocs } from './data_sources';

interface AppDataSources {
  environmentCanadaDatamart: EnvironmentCanadaDatamart;
  canadianMeteorologicalServicesDocs: CanadianMeteorologicalServicesDocs;
}

const dataSources: DataSources<AppDataSources> = {
  environmentCanadaDatamart: new EnvironmentCanadaDatamart(),
  canadianMeteorologicalServicesDocs: new CanadianMeteorologicalServicesDocs()
};

export interface AppContext {
  dataSources: AppDataSources;
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => dataSources
});

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
