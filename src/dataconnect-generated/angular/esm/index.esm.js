import { createNewMessageRef, getPublicPortfoliosRef, updateProjectDescriptionRef, listSkillsForUserRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateNewMessage(args, injector) {
  return injectDataConnectMutation(createNewMessageRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetPublicPortfolios(options, injector) {
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

export function injectUpdateProjectDescription(args, injector) {
  return injectDataConnectMutation(updateProjectDescriptionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListSkillsForUser(args, options, injector) {
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

