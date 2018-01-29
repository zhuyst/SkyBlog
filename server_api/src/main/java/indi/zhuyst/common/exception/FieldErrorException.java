package indi.zhuyst.common.exception;

import indi.zhuyst.common.pojo.Error;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class FieldErrorException extends RuntimeException{

    private List<Error> errors;

    public FieldErrorException(Error... errors){
        this(Arrays.asList(errors));
    }

    public FieldErrorException(Collection<Error> errors){
        super(errors.toString());
        this.errors = new ArrayList<>(errors);
    }

    public List<Error> getErrors() {
        return errors;
    }
}
