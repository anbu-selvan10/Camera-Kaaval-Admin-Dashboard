package com.CameraKaaval.Admin.services;

import com.CameraKaaval.Admin.models.Users;
import com.CameraKaaval.Admin.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers(){
        return usersRepository.findAll();
    }

    public List<Users> getUnverifiedUsers() {
        return usersRepository.findUnverifiedUsers();
    }

    public String verifyUser(String email) {
        Users user = usersRepository.findByEmail(email);
        user.setVerified(true);
        usersRepository.save(user);
        return "Updated!";
    }

    public String deleteUser(String email) {
        Users user = usersRepository.findByEmail(email);
        usersRepository.delete(user);
        return "Deleted!";
    }

    public Users findUserByVehicle(String vehicleno) {
        return usersRepository.findByVehicleno(vehicleno);
    }

    public List<Users> findVerifiedUsers(){
        return usersRepository.findVerifiedUsers();
    }
}
