import {IArticle} from "../article";
import {CLASSIFY_API_URL, httpDelete, httpGet, httpPost, httpPut, IApiResult, IBaseEntity} from "../index";

export interface IClassify extends IBaseEntity {
    name: string;
    articles?: IArticle[];
}

export function fetchListClassify(): Promise<IApiResult<IClassify[]>> {
    return httpGet<IClassify[]>(`${CLASSIFY_API_URL}/public/`);
}

export function fetchInsertClassify(classify: IClassify): Promise<IApiResult<IClassify[]>> {
    return httpPost<IClassify[]>(`${CLASSIFY_API_URL}/`, classify);
}

export function fetchUpdateClassify(classify: IClassify): Promise<IApiResult<IClassify[]>> {
    return httpPut<IClassify[]>(`${CLASSIFY_API_URL}/${classify.id}`, classify);
}

export function fetchDeleteClassify(id: number): Promise<IApiResult<IClassify[]>> {
    return httpDelete<IClassify[]>(`${CLASSIFY_API_URL}/${id}`);
}
