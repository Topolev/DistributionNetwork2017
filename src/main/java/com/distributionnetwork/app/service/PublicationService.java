package com.distributionnetwork.app.service;

import com.distributionnetwork.app.domain.Publication;
import com.distributionnetwork.app.repository.PublicationRepository;
import com.distributionnetwork.app.repository.specifications.PublicationSpecifications;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.distributionnetwork.app.repository.specifications.PublicationSpecifications.searchByCategory;
import static com.distributionnetwork.app.repository.specifications.PublicationSpecifications.searchBySubCategory;

@Service
public class PublicationService {

    @Inject
    private PublicationRepository publicationRepository;

    public List<Publication> searchPublication(Map<String, String[]> paramsSearchMap){

        Set<String> searchKey = paramsSearchMap.keySet();

        if (searchKey.contains("category")){
            return publicationRepository.findAll(searchByCategory(convertSearchParamToLong("category", paramsSearchMap)));
        } else if (searchKey.contains("subcategory")){
            return publicationRepository.findAll(searchBySubCategory(convertSearchParamToLong("subcategory", paramsSearchMap)));
        }

        return publicationRepository.findAll();
    }

    private Long convertSearchParamToLong(String key, Map<String, String[]> paramsSearchMap){
        try {
            return Long.valueOf(paramsSearchMap.get(key)[0]);
        } catch(NumberFormatException e){
            return 1L;
        }
    }

}
