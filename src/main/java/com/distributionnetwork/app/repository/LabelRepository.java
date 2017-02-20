package com.distributionnetwork.app.repository;

import com.distributionnetwork.app.domain.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Spring Data JPA repository for the Label entity.
 */
@SuppressWarnings("unused")
public interface LabelRepository extends JpaRepository<Label,Long>,JpaSpecificationExecutor<Label> {

}
