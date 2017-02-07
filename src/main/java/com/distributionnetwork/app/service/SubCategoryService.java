package com.distributionnetwork.app.service;

import com.distributionnetwork.app.domain.SubCategory;
import com.distributionnetwork.app.repository.SubCategoryRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SubCategoryService {

    @Inject
    SubCategoryRepository subCategoryRepository;

    public List<SubCategory> findAll(){
        return subCategoryRepository.findAll();
    }

    public List<SubCategory> findAll(Specification<SubCategory> specification){
        return subCategoryRepository.findAll(specification);
    }
}
