package indi.zhuyst.common.controller;

import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.exception.TokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class ErrorController implements org.springframework.boot.autoconfigure.web.ErrorController {

    @Autowired
    private ErrorAttributes errorAttributes;

    private static final String ERROR_PATH = "/error";

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }

    @RequestMapping(ERROR_PATH)
    public Result error(HttpServletRequest request, HttpServletResponse response){
        RequestAttributes requestAttributes = new ServletRequestAttributes(request);
        Throwable throwable = errorAttributes.getError(requestAttributes);
        if(throwable instanceof TokenException){
            TokenException tokenException = (TokenException) throwable;
            response.setStatus(HttpStatus.OK.value());
            return Result.error(CodeEnum.UNAUTHORIZED.getCode(),tokenException.getMessage());
        }
        else {
            return Result.error(CodeEnum.ERROR);
        }
    }
}
