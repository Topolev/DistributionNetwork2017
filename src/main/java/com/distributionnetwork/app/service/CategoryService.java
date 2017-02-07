package com.distributionnetwork.app.service;

import com.distributionnetwork.app.domain.Category;
import com.distributionnetwork.app.repository.CategoryRepository;
import org.springframework.stereotype.Service;


import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CategoryService {

    @Inject
    private CategoryRepository categoryRepository;

    public List<Category> findAll(){
        return categoryRepository.findAll();
    }
}
