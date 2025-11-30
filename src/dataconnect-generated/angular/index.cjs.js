const { createNewMessageRef, getPublicPortfoliosRef, updateProjectDescriptionRef, listSkillsForUserRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateNewMessage = function injectCreateNewMessage(args, injector) {
  return injectDataConnectMutation(createNewMessageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetPublicPortfolios = function injectGetPublicPortfolios(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getPublicPortfoliosRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateProjectDescription = function injectUpdateProjectDescription(args, injector) {
  return injectDataConnectMutation(updateProjectDescriptionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListSkillsForUser = function injectListSkillsForUser(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listSkillsForUserRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

