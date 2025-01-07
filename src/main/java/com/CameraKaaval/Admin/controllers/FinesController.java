package com.CameraKaaval.Admin.controllers;

import com.CameraKaaval.Admin.models.Fines;
import com.CameraKaaval.Admin.services.FinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/fines")
public class FinesController {
    @Autowired
    private FinesService finesService;

    @PostMapping("/impose")
    public String imposeFine(@RequestBody Fines fine){
        return finesService.imposeFine(fine);
    }
}
