import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNewMessageData {
  message_insert: Message_Key;
}

export interface CreateNewMessageVariables {
  portfolioId: UUIDString;
  messageContent: string;
  senderEmail: string;
  senderName: string;
  subject: string;
}

export interface GetPublicPortfoliosData {
  portfolios: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    headerImage?: string | null;
  } & Portfolio_Key)[];
}

export interface ListSkillsForUserData {
  skills: ({
    id: UUIDString;
    name: string;
    level?: string | null;
  } & Skill_Key)[];
}

export interface ListSkillsForUserVariables {
  userId: UUIDString;
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface Portfolio_Key {
  id: UUIDString;
  __typename?: 'Portfolio_Key';
}

export interface ProjectAsset_Key {
  id: UUIDString;
  __typename?: 'ProjectAsset_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface UpdateProjectDescriptionData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectDescriptionVariables {
  id: UUIDString;
  description?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewMessageVariables): MutationRef<CreateNewMessageData, CreateNewMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewMessageVariables): MutationRef<CreateNewMessageData, CreateNewMessageVariables>;
  operationName: string;
}
export const createNewMessageRef: CreateNewMessageRef;

export function createNewMessage(vars: CreateNewMessageVariables): MutationPromise<CreateNewMessageData, CreateNewMessageVariables>;
export function createNewMessage(dc: DataConnect, vars: CreateNewMessageVariables): MutationPromise<CreateNewMessageData, CreateNewMessageVariables>;

interface GetPublicPortfoliosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicPortfoliosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicPortfoliosData, undefined>;
  operationName: string;
}
export const getPublicPortfoliosRef: GetPublicPortfoliosRef;

export function getPublicPortfolios(): QueryPromise<GetPublicPortfoliosData, undefined>;
export function getPublicPortfolios(dc: DataConnect): QueryPromise<GetPublicPortfoliosData, undefined>;

interface UpdateProjectDescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectDescriptionVariables): MutationRef<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectDescriptionVariables): MutationRef<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;
  operationName: string;
}
export const updateProjectDescriptionRef: UpdateProjectDescriptionRef;

export function updateProjectDescription(vars: UpdateProjectDescriptionVariables): MutationPromise<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;
export function updateProjectDescription(dc: DataConnect, vars: UpdateProjectDescriptionVariables): MutationPromise<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;

interface ListSkillsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSkillsForUserVariables): QueryRef<ListSkillsForUserData, ListSkillsForUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListSkillsForUserVariables): QueryRef<ListSkillsForUserData, ListSkillsForUserVariables>;
  operationName: string;
}
export const listSkillsForUserRef: ListSkillsForUserRef;

export function listSkillsForUser(vars: ListSkillsForUserVariables): QueryPromise<ListSkillsForUserData, ListSkillsForUserVariables>;
export function listSkillsForUser(dc: DataConnect, vars: ListSkillsForUserVariables): QueryPromise<ListSkillsForUserData, ListSkillsForUserVariables>;

