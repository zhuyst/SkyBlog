package indi.zhuyst.security.exception;

/**
 * Token异常
 * @see indi.zhuyst.security.service.impl.SecurityServiceImpl#getClaimByToken(String)
 * @author zhuyst
 */
public class TokenException extends RuntimeException{

    private static final long serialVersionUID = -4264030117040434285L;

    public TokenException(String message){
        super(message);
    }
}
