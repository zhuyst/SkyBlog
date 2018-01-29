package indi.zhuyst.common.entity;

import lombok.Data;

import javax.persistence.Id;
import java.io.Serializable;

@Data
public abstract class BaseEntity implements Serializable{

    private static final long serialVersionUID = 9155075099270404125L;

    @Id
    private Integer id;
}
