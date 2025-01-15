package com.CameraKaaval.Admin.repositories;

import com.CameraKaaval.Admin.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends MongoRepository<Users, String> {
    @Query("{ 'isVerified': false }")
    List<Users> findUnverifiedUsers();

    @Query("{ 'email': ?0 }")
    Users findByEmail(String email);

    @Query("{ 'vehicleno': ?0 }")
    Users findByVehicleno(String vehicleno); 
}
