package com.distributionnetwork.app.repository.specifications;

import com.distributionnetwork.app.domain.Label;
import com.distributionnetwork.app.domain.Label_;
import org.springframework.data.jpa.domain.Specification;

/**
 * Created by Vladimir on 08.02.2017.
 */
public class LabelSpecifications {

    public static Specification<Label> searchByPartialName(String partialLabel){
        return (root, query, cb) ->{
            return cb.like(root.get(Label_.name),partialLabel);
        };
    }
}
