package com.resume.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.backend.ResumeRequest;
import com.resume.backend.service.ResumeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService; // 'final' keyword add kiya best practice ke liye

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(@RequestBody ResumeRequest resumeRequest) {
        try {
            // 1. Validation: Check karo ki user ne data bheja hai ya nahi
            if (resumeRequest == null || resumeRequest.userDescription() == null || resumeRequest.userDescription().trim().isEmpty()) {
                return new ResponseEntity<>(Map.of("message", "User description cannot be empty"), HttpStatus.BAD_REQUEST);
            }

            // 2. Service Call
            Map<String, Object> stringObjectMap = resumeService.generateResumeResponse(resumeRequest.userDescription());
            
            // 3. Success Response
            return new ResponseEntity<>(stringObjectMap, HttpStatus.OK);

        } catch (IOException e) {
            // 4. Specific Exception Handling (IO Error)
            e.printStackTrace(); // Logs me error dekhne ke liye
            return new ResponseEntity<>(Map.of("message", "Error generating resume file"), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // 5. Generic Exception Handling (Koi aur error ho toh)
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("message", "Something went wrong!"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}