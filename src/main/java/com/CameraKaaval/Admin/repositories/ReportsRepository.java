package com.CameraKaaval.Admin.repositories;

import com.CameraKaaval.Admin.models.Reports;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportsRepository extends MongoRepository<Reports, String> {
    @Query("{ 'isVerified': false }")
    List<Reports> findUnverifiedReports();

    @Query("{ '$or': [ { 'email': { '$regex': ?0, '$options': 'i' } }, { 'location': { '$regex': ?0, '$options': 'i' } } ] }")
    List<Reports> getReportbySearch(String keyword);

}
