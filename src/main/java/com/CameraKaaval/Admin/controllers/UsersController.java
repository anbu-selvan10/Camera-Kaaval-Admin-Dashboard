package com.CameraKaaval.Admin.controllers;

import com.CameraKaaval.Admin.models.Users;
import com.CameraKaaval.Admin.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @GetMapping("/{vehicleno}")
    public ResponseEntity<?> findUserByVehicle(@PathVariable String vehicleno) {
        try {
            Users user = usersService.findUserByVehicle(vehicleno);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new HashMap<String, String>() {{ 
                        put("message", "User not found"); 
                    }});
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new HashMap<String, String>() {{ 
                    put("message", "Error finding user"); 
                }});
        }
    }

}
