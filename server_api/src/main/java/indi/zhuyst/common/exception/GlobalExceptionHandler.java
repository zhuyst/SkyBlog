package indi.zhuyst.common.exception;

import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.Error;
import indi.zhuyst.common.pojo.R;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.List;

/**
 * 全局异常处理器
 * @author zhuyst
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 处理异常 - {@link MethodArgumentNotValidException}
     * @param e 字段绑定失败，通常由{@link javax.validation.Valid}触发
     * @return 错误结果对象
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public R methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e){
        List<FieldError> errors = e.getBindingResult().getFieldErrors();

        R r = R.error(CodeEnum.ERROR.getCode(),"表单验证失败");
        for(FieldError fieldError : errors){
            Error error = new Error();

            error.setField(fieldError.getField());
            error.setMessage(fieldError.getDefaultMessage());

            r.addError(error);
        }
        return r;
    }

    /**
     * 处理异常 - {@link FieldErrorException}
     * @param e 字段错误，自定义异常
     * @return 错误结果对象
     */
    @ExceptionHandler(FieldErrorException.class)
    public R fieldErrorExceptionHandler(FieldErrorException e){
        R r = R.error(CodeEnum.ERROR.getCode(),"表单验证失败");

        List<Error> list = e.getErrors();
        r.addError(list);

        return r;
    }

    /**
     * 处理异常 - {@link AccessDeniedException}
     * @param e 授权异常
     * @return 授权失败/错误结果对象
     */
    @ExceptionHandler(AccessDeniedException.class)
    public R accessDeniedExceptionHandler(AccessDeniedException e){
        return R.error(CodeEnum.FORBIDDEN.getCode(),e.getMessage());
    }

    /**
     * 处理异常 - {@link MaxUploadSizeExceededException}
     * @param e 上传文件大小过大时抛出的异常
     * @return 提醒支持文件最大大小的错误对象
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public R maxUploadSizeExceededException(MaxUploadSizeExceededException e){
        return R.error("上传文件过大，最大支持上传大小为"
                + e.getMaxUploadSize() + "的文件");
    }

    /**
     * 处理异常 - {@link CommonException}
     * @param e 自定义异常
     * @return 错误对象
     */
    @ExceptionHandler(CommonException.class)
    public R commonExceptionHandler(CommonException e){
        return R.error(e.getCode(),e.getMessage());
    }
}
