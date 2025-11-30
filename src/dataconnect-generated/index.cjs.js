const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'myportfolio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewMessageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewMessage', inputVars);
}
createNewMessageRef.operationName = 'CreateNewMessage';
exports.createNewMessageRef = createNewMessageRef;

exports.createNewMessage = function createNewMessage(dcOrVars, vars) {
  return executeMutation(createNewMessageRef(dcOrVars, vars));
};

const getPublicPortfoliosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicPortfolios');
}
getPublicPortfoliosRef.operationName = 'GetPublicPortfolios';
exports.getPublicPortfoliosRef = getPublicPortfoliosRef;

exports.getPublicPortfolios = function getPublicPortfolios(dc) {
  return executeQuery(getPublicPortfoliosRef(dc));
};

const updateProjectDescriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectDescription', inputVars);
}
updateProjectDescriptionRef.operationName = 'UpdateProjectDescription';
exports.updateProjectDescriptionRef = updateProjectDescriptionRef;

exports.updateProjectDescription = function updateProjectDescription(dcOrVars, vars) {
  return executeMutation(updateProjectDescriptionRef(dcOrVars, vars));
};

const listSkillsForUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSkillsForUser', inputVars);
}
listSkillsForUserRef.operationName = 'ListSkillsForUser';
exports.listSkillsForUserRef = listSkillsForUserRef;

exports.listSkillsForUser = function listSkillsForUser(dcOrVars, vars) {
  return executeQuery(listSkillsForUserRef(dcOrVars, vars));
};
