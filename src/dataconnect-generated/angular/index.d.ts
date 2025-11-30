import { CreateNewMessageData, CreateNewMessageVariables, GetPublicPortfoliosData, UpdateProjectDescriptionData, UpdateProjectDescriptionVariables, ListSkillsForUserData, ListSkillsForUserVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateNewMessageOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateNewMessageData, FirebaseError, CreateNewMessageVariables>;
export function injectCreateNewMessage(options?: CreateNewMessageOptions, injector?: Injector): CreateDataConnectMutationResult<CreateNewMessageData, CreateNewMessageVariables, CreateNewMessageVariables>;

export type GetPublicPortfoliosOptions = () => Omit<CreateDataConnectQueryOptions<GetPublicPortfoliosData, undefined>, 'queryFn'>;
export function injectGetPublicPortfolios(options?: GetPublicPortfoliosOptions, injector?: Injector): CreateDataConnectQueryResult<GetPublicPortfoliosData, undefined>;

type UpdateProjectDescriptionOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateProjectDescriptionData, FirebaseError, UpdateProjectDescriptionVariables>;
export function injectUpdateProjectDescription(options?: UpdateProjectDescriptionOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables, UpdateProjectDescriptionVariables>;

type ListSkillsForUserArgs = ListSkillsForUserVariables | (() => ListSkillsForUserVariables);
export type ListSkillsForUserOptions = () => Omit<CreateDataConnectQueryOptions<ListSkillsForUserData, ListSkillsForUserVariables>, 'queryFn'>;
export function injectListSkillsForUser(args: ListSkillsForUserArgs, options?: ListSkillsForUserOptions, injector?: Injector): CreateDataConnectQueryResult<ListSkillsForUserData, ListSkillsForUserVariables>;
