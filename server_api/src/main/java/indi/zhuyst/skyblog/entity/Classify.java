package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Classify extends BaseEntity {

    private String name;
}