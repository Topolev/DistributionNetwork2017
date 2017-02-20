package com.distributionnetwork.app.service;

import com.distributionnetwork.app.domain.Label;
import com.distributionnetwork.app.repository.LabelRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

import static com.distributionnetwork.app.repository.specifications.LabelSpecifications.searchByPartialName;

@Service
public class LabelService {

    @Inject
    private LabelRepository labelRepository;

    public List<Label> getLabelByPartialName(String partialName){
        return labelRepository.findAll(searchByPartialName("%" + partialName + "%"));
    }

    public List<Label> findAll(){
        return labelRepository.findAll();
    }
}
