package com.distributionnetwork.app.repository.specifications;

import com.distributionnetwork.app.domain.Category;
import com.distributionnetwork.app.domain.Category_;
import com.distributionnetwork.app.domain.SubCategory;
import com.distributionnetwork.app.domain.SubCategory_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;


public class SubCategorySpecifications {

    public static Specification<SubCategory> subCategoriesBelongCategory(Long idCategory) {
        return (root, query,cb) -> {
            Join<SubCategory,Category> category = root.join(SubCategory_.category);
            return cb.equal(category.get(Category_.id), idCategory);
        };
    }
}
