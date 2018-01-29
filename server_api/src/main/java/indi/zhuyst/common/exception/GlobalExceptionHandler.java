package indi.zhuyst.common.exception;

import indi.zhuyst.common.pojo.R;
import indi.zhuyst.common.pojo.Error;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public R methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e){
        List<FieldError> errors = e.getBindingResult().getFieldErrors();

        R r = R.error(R.ERROR_CODE,"表单验证失败");
        for(FieldError fieldError : errors){
            Error error = new Error();

            error.setField(fieldError.getField());
            error.setMessage(fieldError.getDefaultMessage());

            r.addError(error);
        }
        return r;
    }

    @ExceptionHandler(FieldErrorException.class)
    public R fieldErrorException(FieldErrorException e){
        R r = R.error(R.ERROR_CODE,"表单验证失败");

        List<Error> list = e.getErrors();
        r.addError(list);

        return r;
    }

    @ExceptionHandler(AccessDeniedException.class)
    public R accessDeniedExceptionHandler(){
        return R.error(R.FORBIDDEN_CODE);
    }
}
