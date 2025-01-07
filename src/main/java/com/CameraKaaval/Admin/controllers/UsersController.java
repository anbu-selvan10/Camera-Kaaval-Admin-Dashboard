package com.CameraKaaval.Admin.controllers;

import com.CameraKaaval.Admin.models.Users;
import com.CameraKaaval.Admin.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping("")
    public List<Users> getAllUsers(){
        return usersService.getAllUsers();
    }

    @GetMapping("/unverified")
    public List<Users> getUnverifiedUsers(){
        return usersService.getUnverifiedUsers();
    }

    @PutMapping("/verify/{email}")
    public String verifyUser(@PathVariable String email){
        return usersService.verifyUser(email);
    }

    @DeleteMapping("/delete/{email}")
    public String deleteUser(@PathVariable String email){
        return usersService.deleteUser(email);
    }
}
