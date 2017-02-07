package com.distributionnetwork.app.repository.specifications;

import com.distributionnetwork.app.domain.*;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.SetJoin;


public class PublicationSpecifications {




    public static Specification<Publication> searchBySubCategory(Long idSubcategory){
        return (root, query, cb) ->{
            SetJoin<Publication, SubCategory> subCategories = root.join(Publication_.subCategories);
            return cb.equal(subCategories.get(SubCategory_.id), idSubcategory);
        };
    }

    public static Specification<Publication> searchByLabel(Long idLabel){
        return (root, query, cb) ->{
            SetJoin<Publication, Label> labels = root.join(Publication_.labels);
            return cb.equal(labels.get(Label_.id), idLabel);
        };
    }

    public static Specification<Publication> searchByCategory(Long idCategory){
        return (root, query, cb) ->{
            SetJoin<Publication, SubCategory> subCategories = root.join(Publication_.subCategories);
            Join<SubCategory, Category> category = subCategories.join(SubCategory_.category);
            return cb.equal(category.get(Category_.id), idCategory);
        };
    }


}
