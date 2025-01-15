package com.CameraKaaval.Admin.services;

import com.CameraKaaval.Admin.models.Fines;
import com.CameraKaaval.Admin.repositories.FinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinesService {
    @Autowired
    private FinesRepository finesRepository;

    public String imposeFine(Fines fine) {
        finesRepository.save(fine);
        return "Saved!";
    }
}
