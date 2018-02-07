package indi.zhuyst.common.exception;

import indi.zhuyst.common.pojo.Error;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * 字段错误异常
 * @author zhuyst
 */
public class FieldErrorException extends RuntimeException{

    private static final long serialVersionUID = 9206230120204238961L;

    /**
     * 字段错误列表
     */
    @Getter
    private List<Error> errors;

    /**
     * 通过Error或Error数组初始化异常
     * @param errors 字段错误数组
     */
    public FieldErrorException(Error... errors){
        this(Arrays.asList(errors));
    }

    /**
     * 通过Error集合初始化异常
     * @param errors 字段错误集合
     */
    public FieldErrorException(Collection<Error> errors){
        super(errors.toString());
        this.errors = new ArrayList<>(errors);
    }
}
