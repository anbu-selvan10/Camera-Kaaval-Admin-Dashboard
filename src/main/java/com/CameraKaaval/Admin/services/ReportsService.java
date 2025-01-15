package com.CameraKaaval.Admin.services;

import com.CameraKaaval.Admin.models.Reports;
import com.CameraKaaval.Admin.repositories.ReportsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ReportsService {
    @Autowired
    private ReportsRepository reportsRepository;

    public String updateVerifyStatus(String id, String status) {
        Optional<Reports> reports = reportsRepository.findById(id);
        if(reports.isPresent()) {
            Reports report = reports.get();
            Instant currentInstant = Instant.now();
            String formattedDateTime = currentInstant.atOffset(ZoneOffset.UTC)
                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

            if("Pending".equals(status)) {
                report.setVerified(true);
                report.setStatus("Accepted");
                report.setUpdatedAt(Instant.parse(formattedDateTime));
                reportsRepository.save(report); 
            }
        }
        return "Updated!";
    }

    public List<Reports> findUnverifiedReports() {
        return reportsRepository.findUnverifiedReports();
    }

    public List<Reports> getReportbySearch(String keyword) {
        return reportsRepository.getReportbySearch(keyword);
    }
}
