import { IPageInfo } from "@/action/common";
import { USER_PAGE_SIZE } from "@/action/pageSize";
import { LIST_USERS_RESPONSE, UserAction } from "@/action/user";
import { IUser } from "@/api/user";

export type IUserState = IPageInfo<IUser>;

const initialState: IUserState = {
  list: [],
  pageNum: 1,
  pageSize: USER_PAGE_SIZE,
  pages: 0,
  total: 0,
};

export default function userReducer(
  state: IUserState = initialState,
  action: UserAction,
): IUserState {
  switch (action.type) {
    case LIST_USERS_RESPONSE:
      return { ...state, ...action.page };

    default:
      return state;
  }
}
