package com.CameraKaaval.Admin.repositories;

import com.CameraKaaval.Admin.models.Fines;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinesRepository extends MongoRepository<Fines, String> {

}
