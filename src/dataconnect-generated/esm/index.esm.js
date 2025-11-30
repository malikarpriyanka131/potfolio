import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'myportfolio',
  location: 'us-east4'
};

export const createNewMessageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewMessage', inputVars);
}
createNewMessageRef.operationName = 'CreateNewMessage';

export function createNewMessage(dcOrVars, vars) {
  return executeMutation(createNewMessageRef(dcOrVars, vars));
}

export const getPublicPortfoliosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicPortfolios');
}
getPublicPortfoliosRef.operationName = 'GetPublicPortfolios';

export function getPublicPortfolios(dc) {
  return executeQuery(getPublicPortfoliosRef(dc));
}

export const updateProjectDescriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectDescription', inputVars);
}
updateProjectDescriptionRef.operationName = 'UpdateProjectDescription';

export function updateProjectDescription(dcOrVars, vars) {
  return executeMutation(updateProjectDescriptionRef(dcOrVars, vars));
}

export const listSkillsForUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkillsForUser', inputVars);
}
listSkillsForUserRef.operationName = 'ListSkillsForUser';

export function listSkillsForUser(dcOrVars, vars) {
  return executeQuery(listSkillsForUserRef(dcOrVars, vars));
}

