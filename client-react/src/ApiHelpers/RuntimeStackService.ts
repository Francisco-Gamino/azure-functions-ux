import { WebAppCreateStack } from '../models/available-stacks';
import { CommonConstants } from '../utils/CommonConstants';
import Url from '../utils/url';
import { sendHttpRequest } from './HttpClient';
import { HttpResponseObject } from '../ArmHelper.types';
import { AppOsType } from '../models/site/site';
import { WebAppStack } from '../models/stacks/web-app-stacks';
import { FunctionAppStack } from '../models/stacks/function-app-stacks';
import { AppStackOs } from '../models/stacks/app-stacks';

export default class RuntimeStackService {
  public static getWebAppConfigurationStacks = (stacksOs: AppStackOs) => {
    return sendHttpRequest<WebAppStack[]>({
      url: `${Url.serviceHost}stacks/webAppStacks?os=${stacksOs}&api-version=${CommonConstants.ApiVersions.stacksApiVersion20200601}`,
      method: 'GET',
    }).then(result => {
      const success = result.metadata.success && !!result.data;
      const mappedResult: HttpResponseObject<WebAppStack[]> = {
        ...result,
        metadata: {
          ...result.metadata,
          success,
        },
        data: success ? result.data : [],
      };
      return mappedResult;
    });
  };

  public static getFunctionAppConfigurationStacks = (stacksOs: AppStackOs) => {
    return sendHttpRequest<FunctionAppStack[]>({
      url: `${Url.serviceHost}stacks/functionAppStacks?os=${stacksOs}&api-version=${CommonConstants.ApiVersions.stacksApiVersion20200601}`,
      method: 'GET',
    }).then(result => {
      const success = result.metadata.success && !!result.data;
      const mappedResult: HttpResponseObject<FunctionAppStack[]> = {
        ...result,
        metadata: {
          ...result.metadata,
          success,
        },
        data: success ? result.data : [],
      };
      return mappedResult;
    });
  };

  public static getWebAppGitHubActionStacks = (stacksOs: AppOsType) => {
    return sendHttpRequest<WebAppCreateStack[]>({
      url: `${Url.serviceHost}stacks/webAppGitHubActionStacks?os=${stacksOs}&api-version=${
        CommonConstants.ApiVersions.stacksApiVersion20200501
      }`,
      method: 'POST',
    });
  };
}
