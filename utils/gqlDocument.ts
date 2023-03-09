import { OperationDefinitionNode } from "graphql/index.js";
import { DocumentNode } from '@apollo/client/index.js';

export interface ResolveDocumentArg<T = any> {
  documentNode: DocumentNode;
  variables?: T;
  cacheVariables?: boolean;
}

export interface ResolveDocumentResult<T = any> {
  operationName?: string;
  query: string;
  variables?: T;
  cacheVariables: boolean;
}


export const resolveDocument = (documentList: Array<ResolveDocumentArg>): Array<ResolveDocumentResult> => {
  return documentList.map(document => {
    const { documentNode, variables, cacheVariables = true } = document;
    const query = documentNode.loc?.source.body as string;
    const definitions = documentNode.definitions[0] as OperationDefinitionNode;
    const operationName = definitions.name?.value;
    return {
      query,
      variables,
      operationName,
      cacheVariables,
    }
  })
} 
