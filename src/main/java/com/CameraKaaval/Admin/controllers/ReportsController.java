package com.CameraKaaval.Admin.controllers;

import com.CameraKaaval.Admin.models.Reports;
import com.CameraKaaval.Admin.services.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/reports")
public class ReportsController {
    @Autowired
    private ReportsService reportsService;

    @GetMapping("/unverified")
    public List<Reports> findUnverifiedReports(){
        return reportsService.findUnverifiedReports();
    }

    @PutMapping("/update/{id}/{status}")
    public String updateVerifyStatus(@PathVariable String id, @PathVariable String status) {
        return reportsService.updateVerifyStatus(id, status);
    }

    @GetMapping("/unverified/search")
    public List<Reports> searchReports(@RequestParam String keyword) {
        return reportsService.getReportbySearch(keyword);
    }

}
