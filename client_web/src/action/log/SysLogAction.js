import { _get, SYS_LOG_URL } from '../../Api';

export const LIST_SYS_LOG_RESPONSE = 'LIST_SYS_LOG_RESPONSE';

export const listSysLog = (pageNum, pageSize) => (dispatch) => {
  const url = `${SYS_LOG_URL}/list/`;
  return _get(url, {
    pageNum,
    pageSize,
  }).then(result => dispatch(listSysLogResponse(result.entity)));
};

const listSysLogResponse = (page) => {
  return {
    type: LIST_SYS_LOG_RESPONSE,
    page,
  };
};
